# Website deployment instructions

How to get a commit on GitHub (`main`) live on `https://maudathome.co.uk`.

## TLDR

There is no CI/CD — pushing to GitHub does **not** deploy anything by itself. After every commit
you want live, SSH into the `maud-website` EC2 box and run:

```bash
cd /opt/maud-website
git pull origin main
npm install
npm run build
sudo systemctl restart maud-website
```

Then verify at `https://maudathome.co.uk`.

---

## Why this manual step exists

This site was originally scaffolded by an AI site-creation tool assuming a Cloudflare Workers
deploy path (`vinext deploy` / `wrangler`) — that tooling is still in the repo but unused. The
**actual** live site is self-hosted on a plain EC2 instance: nginx reverse-proxies 80/443 to a
Node process on `:3000`, managed by systemd. Nothing watches the GitHub repo, so a push alone
never reaches the box — confirmed 2026-08-19, when the site sat frozen at the very first commit
for three days despite several pushes.

If a real CI/CD pipeline gets built later, replace this doc's manual steps with "push and wait" —
until then, this is the actual process.

## Where things are

| What | Where |
|---|---|
| Site files (git checkout) | `/opt/maud-website` on the EC2 box, owned by `ubuntu:ubuntu` |
| systemd service | `maud-website.service` — `ExecStart=/usr/bin/npm run start`, runs as `ubuntu` |
| Reverse proxy | nginx, config at `/etc/nginx/sites-available/maud-website` |
| TLS cert | Let's Encrypt, `/etc/letsencrypt/live/maudathome.co.uk` (auto-renewing) |
| GitHub remote | `https://github.com/daveada88/maud-website.git`, branch `main` |

## SSH access

Alias `maud-website` should already be in `~/.ssh/config`:

```
Host maud-website
    HostName 18.134.126.159
    User ubuntu
    IdentityFile ~/.ssh/maud_website.pem
    IdentitiesOnly yes
```

If the connection times out, the EC2 security group probably doesn't allow your current IP on
port 22 — add an inbound rule for `<your-ip>/32` on port 22 in the `maud-website` instance's
security group, then retry.

## 1. Push your changes to GitHub

Normal workflow — commit and push `main` as usual. This step alone does **not** update the live
site (see above).

## 2. SSH in and pull

```bash
ssh maud-website
cd /opt/maud-website
git status        # sanity check — should be clean before pulling
git pull origin main
```

If `git status` shows local changes (e.g. a drifted `package-lock.json` from a previous
`npm install`), discard them first: `git checkout -- <file>`. Don't `git pull` over uncommitted
local edits you actually want to keep — check first.

## 3. Install dependencies

```bash
npm install
```

Usually a no-op unless `package.json`/`package-lock.json` changed. Safe to run every time.

## 4. Rebuild

```bash
npm run build
```

**This step is not optional.** The systemd service runs `npm run start`, which serves the
pre-built `dist/` output — it does not rebuild from source. Skipping this step means the service
restarts fine but keeps serving the old build.

## 5. Restart the service

```bash
sudo systemctl restart maud-website
sudo systemctl status maud-website --no-pager
```

Confirm it shows `active (running)` with no immediate crash-loop.

## 6. Verify live

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://maudathome.co.uk
```

Should return `200`. For a specific change, `curl -s https://maudathome.co.uk | grep "some new text"`
to confirm it's actually serving the new build, not a cached/stale response.

## One-liner (once you trust the process)

```bash
ssh maud-website "cd /opt/maud-website && git pull origin main && npm install && npm run build && sudo systemctl restart maud-website"
```

## Rollback

No automated rollback. To revert to a previous commit:

```bash
ssh maud-website
cd /opt/maud-website
git log --oneline -10        # find the commit to roll back to
git checkout <commit-hash>   # or: git reset --hard <commit-hash>
npm install
npm run build
sudo systemctl restart maud-website
```

`git checkout <hash>` leaves you in a detached HEAD state (fine for a quick rollback); use
`git reset --hard` on `main` only if you're deliberately moving the branch pointer back.

## Troubleshooting

- **Service won't start / crash-loops:** `sudo journalctl -u maud-website --no-pager -l | tail -50`
- **502 from nginx:** the node process on `:3000` probably isn't up — check
  `sudo systemctl status maud-website` first.
- **Old content still showing after a successful restart:** check the browser isn't serving a
  cached response (hard refresh / curl directly); also confirm `npm run build` actually ran
  *after* the `git pull`, not before.
