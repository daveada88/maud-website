"use client";

import { useState } from "react";
import ThreatAnimation from "./ThreatAnimation";

// Hand-traced recreation of the new Maud mark (green double-arch "M" + terracotta dot),
// built from a pasted reference image, not the original vector file — swap the path/circle
// values here if the exact source .svg becomes available later.
const Logo = ({ small = false }: { small?: boolean }) => (
  <svg
    className={small ? "logo logo-small" : "logo"}
    viewBox="0 0 520 330"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M70,270 C70,150 100,40 165,40 C220,40 245,110 260,170 C275,110 300,40 355,40 C420,40 450,150 450,270"
      fill="none"
      stroke="#5c8467"
      strokeWidth="85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="260" cy="248" r="38" fill="#c9795c" />
  </svg>
);

const Icon = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) => (
  <span className={`icon icon-${tone}`} aria-hidden="true">{children}</span>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<"signin" | "create">("signin");

  // Register-interest flow (replaces "Buy" as the primary CTA during the trial — see B1).
  const [interestOpen, setInterestOpen] = useState(false);
  const [interestStep, setInterestStep] = useState<"details" | "complete">("details");

  // Checkout/payment flow is intentionally kept but disconnected from every CTA during the
  // trial (Part D: out of scope for functional work, not to be built/fixed — kept only so its
  // styling, which already shares this file's design tokens, doesn't regress before checkout is
  // separately commissioned). Nothing sets purchaseOpen true anymore.
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "complete">("details");

  const closeMenu = () => setMenuOpen(false);
  const openInterest = () => { setInterestOpen(true); setInterestStep("details"); };

  return (
    <main>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Maud home" onClick={closeMenu}>
            <Logo small />
            <span>Maud<small>Home protection</small></span>
          </a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span><span className="sr-only">Menu</span>
          </button>
          <nav id="main-navigation" className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
            <a href="#how" onClick={closeMenu}>How it works</a>
            <a href="#protection" onClick={closeMenu}>What it protects</a>
            <a href="#trial" onClick={closeMenu}>The trial</a>
            <a href="#help" onClick={closeMenu}>Help</a>
            <button className="register-link" type="button" onClick={() => { openInterest(); closeMenu(); }}>Register your interest</button>
            <button className="account-link" type="button" onClick={() => { setAccountOpen(true); closeMenu(); }}>Trial sign-in</button>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Protection that looks after itself</div>
            <h1>Safer internet.<br /><span>No technical know-how needed.</span></h1>
            <p className="hero-lead">Maud quietly protects every device in your home from scams, dangerous websites and unwanted tracking. Plug it in once, then get on with your life.</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={openInterest}>Register your interest</button>
              <a className="text-link" href="#protection">Explore protection <span aria-hidden="true">→</span></a>
            </div>
            <p className="cta-subline">This is an early trial, not a finished product yet. <a href="#trial">See what that means →</a></p>
            <p className="reassurance"><span aria-hidden="true">✓</span> No complicated setup&nbsp;&nbsp; <span aria-hidden="true">✓</span> No ongoing maintenance</p>
          </div>

          <div className="status-card" aria-label="Example Maud protection screen">
            <span className="example-tag">Example screen</span>
            <div className="status-top">
              <div className="mini-brand"><Logo small /><span>Maud<small>Home protection</small></span></div>
              <span className="protected-pill"><span className="status-dot" /> Protected</span>
            </div>
            <p className="status-preamble">This is what you&rsquo;ll see once Maud is set up in your home:</p>
            <div className="status-main">
              <div className="large-shield"><Logo /></div>
              <h2>Your home is protected</h2>
              <p>Maud works quietly in the background — you won&rsquo;t need to check this screen, but it&rsquo;s here if you ever want to.</p>
            </div>
            <div className="quiet-note"><span aria-hidden="true">●</span> Everything is up to date</div>
          </div>
        </div>
      </section>

      <section className="trial-section" id="trial">
        <div className="shell trial-card">
          <Icon tone="blue">i</Icon>
          <div className="trial-copy">
            <h2>Before you register: what &ldquo;trial&rdquo; actually means</h2>
            <p>We&rsquo;re honest people, so here&rsquo;s the honest version.</p>
            <p>Maud is new. A small number of homes are helping us test it properly before it&rsquo;s ready for everyone — that&rsquo;s what this trial is. Here&rsquo;s exactly what that means for you.</p>
            <p><strong>It&rsquo;s a paid trial.</strong> You&rsquo;ll pay to take part, because building and posting a real device to your home costs real money. This isn&rsquo;t a free giveaway.</p>
            <p><strong>It might not work perfectly.</strong> We&rsquo;ve tested Maud carefully, but every home&rsquo;s internet setup is a little different, and there may be things we haven&rsquo;t come across yet. If Maud doesn&rsquo;t get along with your setup, we&rsquo;ll try to fix it remotely first.</p>
            <p><strong>If we can&rsquo;t fix it, we won&rsquo;t leave you stuck.</strong> Every Maud box comes with a USB drive that puts your box back to a normal, everyday computer — so even in the worst case, you&rsquo;re not left with a useless bit of plastic.</p>
            <p><strong>You can talk to a real person.</strong> If anything feels wrong, confusing, or broken, call us. A real person will help — see <a href="#help">Help</a> below.</p>
            <p><strong>This is genuinely a &ldquo;help us build it&rdquo; invitation.</strong> By joining, you&rsquo;re helping shape what Maud becomes for everyone else. Your feedback matters more right now than it will once this is a finished product.</p>
            <p>If that all sounds fair, we&rsquo;d love to have you. <button type="button" className="text-link inline-cta" onClick={openInterest}>Register your interest →</button></p>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Key benefits">
        <div className="shell trust-grid">
          <div><Icon tone="green">✓</Icon><span><strong>Always on</strong><small>Day and night protection</small></span></div>
          <div><Icon tone="blue">↻</Icon><span><strong>Updates itself</strong><small>Nothing for you to manage</small></span></div>
          <div><Icon tone="purple">⌂</Icon><span><strong>Whole-home cover</strong><small>Every connected device</small></span></div>
        </div>
      </section>

      <section className="section shell" id="how">
        <div className="section-heading">
          <span className="kicker">Simple from the start</span>
          <h2>Plug in. Switch on. Feel safer.</h2>
          <p>No passwords to remember, security settings to learn or updates to install.</p>
        </div>
        <div className="steps">
          <article className="step-card"><span className="step-number">1</span><Icon tone="blue">↔</Icon><h3>Connect Maud</h3><p>Place the small Maud box between your internet connection and your home router.</p></article>
          <article className="step-card"><span className="step-number">2</span><Icon tone="green">●</Icon><h3>Wait for the green light</h3><p>Maud starts protecting your home automatically. There is nothing to configure.</p></article>
          <article className="step-card"><span className="step-number">3</span><Icon tone="purple">☕</Icon><h3>Carry on as normal</h3><p>We keep protection current and only let you know when something needs attention.</p></article>
        </div>
      </section>

      <section className="section soft-section" id="stops">
        <div className="shell">
          <div className="section-heading">
            <span className="kicker">What it actually stops</span>
            <h2>How an unprotected home network is exploited</h2>
            <p>What can happen when nothing is watching — and where Maud sits in that story.</p>
          </div>
          <ThreatAnimation />
        </div>
      </section>

      <section className="section soft-section" id="protection">
        <div className="shell">
          <div className="section-heading left-heading">
            <span className="kicker">Quietly working for you</span>
            <h2>Protection without the worry</h2>
            <p>Maud checks internet traffic before it reaches the devices in your home.</p>
          </div>
          <div className="feature-grid">
            <article><Icon tone="red">×</Icon><div><h3>Stops dangerous traffic before it reaches you</h3><p>Maud recognises known scams, dodgy downloads and hostile connections, and blocks them automatically — including the kind that try to trick even careful people.</p></div></article>
            <article><Icon tone="orange">!</Icon><div><h3>Spots fake and scam websites</h3><p>If a link leads somewhere designed to steal your details or your money, Maud steps in before the page loads.</p></div></article>
            <article><Icon tone="blue">◎</Icon><div><h3>Blocks unwanted adverts</h3><span className="optional-tag">Optional</span><p>Turn this on and adverts — including the dangerous kind that try to install something nasty — are filtered out. Pages load cleaner and faster too.</p></div></article>
            <article><Icon tone="purple">◉</Icon><div><h3>Stops hidden tracking</h3><span className="optional-tag">Optional</span><p>Reduces the quiet background connections that build up a profile of what you and your family do online.</p></div></article>
            <article><Icon tone="green">✓</Icon><div><h3>Filters what your family can see</h3><span className="optional-tag">Optional</span><p>Switch on simple categories — like gambling or adult content — to keep them off every device in the house, without having to set anything up on each device individually.</p></div></article>
            <article><Icon tone="blue">↻</Icon><div><h3>Keeps itself up to date, always</h3><p>No downloads, no &ldquo;update available&rdquo; pop-ups, nothing for you to click. Maud keeps its own defences current, quietly, in the background.</p></div></article>
          </div>
          <div className="privacy-note"><Icon tone="green">⌁</Icon><div><strong>Your privacy matters</strong><p>Your threat activity stays on your Maud box. This website only holds the account details needed for your subscription and service history.</p></div></div>
        </div>
      </section>

      <section className="section shell" id="help">
        <div className="help-grid">
          <div>
            <span className="kicker">Here when you need us</span>
            <h2>Clear answers, from real people.</h2>
            <p className="help-intro">Maud is designed to look after itself. If you ever need a hand, we will explain things clearly and patiently.</p>
            <div className="contact-card"><Icon tone="blue">☎</Icon><div><strong>Need some help?</strong><p>Call us on <a href="tel:08000000000">0800 000 0000</a><br /><small>Monday to Friday, 9am–5pm</small></p></div></div>
          </div>
          <div className="faq-list">
            {[
              ["Will Maud slow down my internet?", "Maud is designed to work quietly without getting in your way. Most people will not notice any difference, and advert blocking may make some pages feel faster."],
              ["Do I need to install anything?", "No. Maud connects beside your router and protects devices across your home without apps or software on each one."],
              ["What happens if Maud needs attention?", "We will send a clear message explaining what has happened and what, if anything, you need to do."],
              ["Can a family member receive alerts?", "Yes. You can nominate someone you trust to receive important service messages with you."],
              ["What if Maud doesn't work with my internet setup?", "Get in touch and we'll try to sort it remotely first. If we genuinely can't make it work for your home, we'll talk you through your options — including turning the box back into a normal computer using the USB drive we send you."],
              // Refund wording is deliberately non-committal — B3 flags this as pending
              // legal/finance sign-off. Do not firm this up without that confirmation.
              ["Is this a full refund if it doesn't work out?", "We'll always be fair about this — talk to us and we'll sort out what's right for your situation."],
              ["What happens to my data during the trial?", "Maud checks the type of internet traffic, not what's inside your messages or browsing. The full detail on this lives in our Privacy page — we've written it in plain English too."],
              // Cancellation mechanism (phone/email/self-serve) is unconfirmed — B3 flags
              // this too. Deliberately not naming a specific method until confirmed.
              ["Can I stop being part of the trial at any time?", "Yes — get in touch and we'll take care of it."],
            ].map(([question, answer], index) => (
              <div className={`faq ${faqOpen === index ? "faq-open" : ""}`} key={question}>
                <button type="button" aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? null : index)}><span>{question}</span><span aria-hidden="true">+</span></button>
                <div className="faq-answer"><p>{answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section buy-section" id="buy">
        <div className="shell buy-grid">
          <div className="product-visual" aria-label="Illustration of the Maud Box">
            <div className="product-box"><Logo /><strong>Maud</strong><span className="product-light" /></div>
            <span className="product-cable" aria-hidden="true" />
          </div>
          <div className="product-copy">
            <span className="kicker">What it costs to take part</span>
            <h2><strong>£149</strong> to join the trial, then <strong>£9 a month</strong> while the trial continues.</h2>
            <p>This covers the Maud box, delivery, and the ongoing protection service while you&rsquo;re helping us test it.</p>
            <ul className="included-list">
              <li><span>✓</span> The Maud box, ready to plug in</li>
              <li><span>✓</span> A simple printed guide</li>
              <li><span>✓</span> A USB drive to restore your box to a normal computer, just in case</li>
              <li><span>✓</span> Friendly UK-based help by phone</li>
            </ul>
            <div className="price-row"><div><strong>£149</strong><span>then £9 a month</span></div><button className="button button-primary" type="button" onClick={openInterest}>Register your interest</button></div>
            <p className="price-note">This is trial pricing — it may change once Maud is a finished product. You can stop at any time. <a href="#trial">See what &ldquo;trial&rdquo; means →</a></p>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="shell closing-card">
          <div><span className="kicker">A calmer way to stay safe online</span><h2>Let Maud take care of the technical bits.</h2><p>Simple, automatic protection for your whole home. This is an early trial, not a finished product yet.</p></div>
          <button className="button button-light" type="button" onClick={openInterest}>Register your interest</button>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#top"><Logo small /><span>Maud<small>Home protection</small></span></a>
            <p>Simple online protection for everyday homes.</p>
            <div className="footer-trust">
              <strong>Who&rsquo;s behind Maud</strong>
              <p>Maud is built by a small UK team. We&rsquo;re genuinely reachable — call <a href="tel:08000000000">0800 000 0000</a> and a real person will answer, not a call centre script.</p>
              {/* Company registration/address: open item per Part E — insert real details
                  once provided, do not fabricate. */}
              <p className="footer-note">Company registration/address — to be added</p>
            </div>
          </div>
          <div><strong>Maud</strong><a href="#how">How it works</a><a href="#protection">Protection</a><a href="#trial">The trial</a><button type="button" onClick={openInterest}>Register your interest</button></div>
          <div><strong>Your service</strong><button type="button" onClick={() => setAccountOpen(true)}>Trial sign-in</button><a href="#help">Get help</a><a href="#help">Service status</a></div>
          <div><strong>Information</strong><a href="#privacy">Privacy</a><a href="#privacy">Terms</a><a href="#privacy">Accessibility</a></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Maud. All rights reserved.</span><span>Made to be simple.</span></div>
      </footer>

      {accountOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAccountOpen(false)}>
          <section className="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setAccountOpen(false)}>×</button>
            <Logo />
            <span className="kicker">Trial sign-in</span>
            <h2 id="account-title">Your service, kept simple.</h2>
            <div className="account-tabs" role="tablist" aria-label="Account options">
              <button type="button" role="tab" aria-selected={accountMode === "signin"} onClick={() => setAccountMode("signin")}>Sign in</button>
              <button type="button" role="tab" aria-selected={accountMode === "create"} onClick={() => setAccountMode("create")}>Create account</button>
            </div>
            <p>{accountMode === "signin" ? "Sign in to view your subscription, payments and service history." : "Create an account to manage your Maud subscription and see your order history."} Threat information from your Maud box is never sent here.</p>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" autoComplete="email" placeholder="you@example.com" />
              {accountMode === "create" && <><label htmlFor="account-name">Your name</label><input id="account-name" type="text" autoComplete="name" placeholder="Your name" /><p className="form-note">We will email you a secure link to confirm your address. You will not need to create a password.</p></>}
              <button className="button button-primary full-button" type="submit">{accountMode === "signin" ? "Email me a sign-in link" : "Create my account"}</button>
            </form>
            <a className="modal-help" href="#help" onClick={() => setAccountOpen(false)}>Having trouble signing in?</a>
          </section>
        </div>
      )}

      {interestOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setInterestOpen(false)}>
          <section className="account-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setInterestOpen(false)}>×</button>
            <Logo />
            <span className="kicker">Join the trial</span>
            <h2 id="interest-title">{interestStep === "complete" ? "Thanks — we'll be in touch" : "Register your interest"}</h2>
            {interestStep === "details" && <>
              <p>Leave your details and we&rsquo;ll be in touch about joining the trial. This isn&rsquo;t a payment — see <a href="#trial" onClick={() => setInterestOpen(false)}>what the trial involves</a> first if you haven&rsquo;t already.</p>
              <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setInterestStep("complete"); }}>
                <label htmlFor="interest-name">Your name</label>
                <input id="interest-name" autoComplete="name" placeholder="Your name" required />
                <label htmlFor="interest-email">Email address</label>
                <input id="interest-email" type="email" autoComplete="email" placeholder="you@example.com" required />
                <div className="two-fields">
                  <div><label htmlFor="interest-postcode">Postcode or area</label><input id="interest-postcode" autoComplete="postal-code" placeholder="For rollout planning" required /></div>
                  <div><label htmlFor="interest-phone">Phone <span className="optional-label">(optional)</span></label><input id="interest-phone" type="tel" autoComplete="tel" placeholder="Optional" /></div>
                </div>
                <button className="button button-primary full-button" type="submit">Register my interest</button>
              </form>
            </>}
            {interestStep === "complete" && (
              <div className="complete-step">
                <div className="complete-check">✓</div>
                <p>Thank you. We&rsquo;ll be in touch by email about joining the trial — there&rsquo;s nothing else for you to do right now.</p>
                <button className="button button-primary full-button" type="button" onClick={() => setInterestOpen(false)}>Return to Maud</button>
              </div>
            )}
          </section>
        </div>
      )}

      {purchaseOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPurchaseOpen(false)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close checkout" onClick={() => setPurchaseOpen(false)}>×</button>
            <div className="checkout-header"><Logo small /><div><span className="kicker">Secure order</span><h2 id="checkout-title">{checkoutStep === "complete" ? "Your Maud is reserved" : "Buy your Maud Box"}</h2></div></div>
            {checkoutStep === "details" && <>
              <div className="checkout-progress"><span className="active">1 <small>Your details</small></span><i /><span>2 <small>Payment</small></span></div>
              <div className="order-line"><div className="order-thumb"><Logo small /></div><div><strong>Maud Box</strong><span>Includes automatic protection updates</span></div><strong>£149</strong></div>
              <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setCheckoutStep("payment"); }}>
                <div className="two-fields"><div><label htmlFor="order-first">First name</label><input id="order-first" autoComplete="given-name" required /></div><div><label htmlFor="order-last">Last name</label><input id="order-last" autoComplete="family-name" required /></div></div>
                <label htmlFor="order-email">Email address</label><input id="order-email" type="email" autoComplete="email" placeholder="you@example.com" required />
                <label htmlFor="order-address">Delivery address</label><input id="order-address" autoComplete="street-address" placeholder="House number and street" required />
                <div className="two-fields"><div><label htmlFor="order-town">Town or city</label><input id="order-town" autoComplete="address-level2" required /></div><div><label htmlFor="order-postcode">Postcode</label><input id="order-postcode" autoComplete="postal-code" required /></div></div>
                <label className="check-label"><input type="checkbox" defaultChecked /> Create my Maud account after checkout</label>
                <button className="button button-primary full-button" type="submit">Continue to secure payment</button>
              </form>
              <p className="secure-note">🔒 Your card details will be handled securely by our payment provider. Maud will never store them.</p>
            </>}
            {checkoutStep === "payment" && <div className="payment-step">
              <div className="checkout-progress"><span className="done">✓ <small>Your details</small></span><i /><span className="active">2 <small>Payment</small></span></div>
              <div className="hosted-payment"><span className="lock-mark">↗</span><h3>Continue to secure payment</h3><p>In the live shop, you will now move to Stripe’s secure checkout to enter your card details. For this preview, no payment will be taken.</p><div className="total-row"><span>Due today</span><strong>£158</strong></div><small>£149 Maud Box + first month of service at £9</small></div>
              <button className="button button-primary full-button" type="button" onClick={() => setCheckoutStep("complete")}>Simulate successful payment</button>
              <button className="back-button" type="button" onClick={() => setCheckoutStep("details")}>← Back to your details</button>
            </div>}
            {checkoutStep === "complete" && <div className="complete-step"><div className="complete-check">✓</div><p>Thank you. In the live shop, you would now receive an order confirmation and a secure link to finish setting up your account.</p><div className="confirmation-box"><span>Preview order</span><strong>MAUD-1047</strong><small>No payment has been taken</small></div><button className="button button-primary full-button" type="button" onClick={() => setPurchaseOpen(false)}>Return to Maud</button></div>}
          </section>
        </div>
      )}
    </main>
  );
}
