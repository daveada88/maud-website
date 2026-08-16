"use client";

import { useState } from "react";

const Shield = ({ small = false }: { small?: boolean }) => (
  <span className={small ? "shield shield-small" : "shield"} aria-hidden="true">
    <span>✓</span>
  </span>
);

const Icon = ({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) => (
  <span className={`icon icon-${tone}`} aria-hidden="true">{children}</span>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<"signin" | "create">("signin");
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "complete">("details");

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Maud home" onClick={closeMenu}>
            <Shield small />
            <span>Maud<small>Home protection</small></span>
          </a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span><span className="sr-only">Menu</span>
          </button>
          <nav id="main-navigation" className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
            <a href="#how" onClick={closeMenu}>How it works</a>
            <a href="#protection" onClick={closeMenu}>What it protects</a>
            <a href="#help" onClick={closeMenu}>Help</a>
            <button className="buy-link" type="button" onClick={() => { setPurchaseOpen(true); setCheckoutStep("details"); closeMenu(); }}>Buy Maud</button>
            <button className="account-link" type="button" onClick={() => { setAccountOpen(true); closeMenu(); }}>My account</button>
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
              <button className="button button-primary" type="button" onClick={() => { setPurchaseOpen(true); setCheckoutStep("details"); }}>Buy a Maud Box</button>
              <a className="text-link" href="#protection">Explore protection <span aria-hidden="true">→</span></a>
            </div>
            <p className="reassurance"><span aria-hidden="true">✓</span> No complicated setup&nbsp;&nbsp; <span aria-hidden="true">✓</span> No ongoing maintenance</p>
          </div>

          <div className="status-card" aria-label="Example Maud protection screen">
            <div className="status-top">
              <div className="mini-brand"><Shield small /><span>Maud<small>Home protection</small></span></div>
              <span className="protected-pill"><span className="status-dot" /> Protected</span>
            </div>
            <div className="status-main">
              <div className="large-shield"><Shield /></div>
              <h2>Your home is protected</h2>
              <p>Maud is working quietly in the background.</p>
            </div>
            <div className="status-stats">
              <div><strong>14</strong><span>devices protected</span></div>
              <div><strong>47</strong><span>threats stopped this week</span></div>
            </div>
            <div className="quiet-note"><span aria-hidden="true">●</span> Everything is up to date</div>
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

      <section className="section soft-section" id="protection">
        <div className="shell">
          <div className="section-heading left-heading">
            <span className="kicker">Quietly working for you</span>
            <h2>Protection without the worry</h2>
            <p>Maud checks internet traffic before it reaches the devices in your home.</p>
          </div>
          <div className="feature-grid">
            <article><Icon tone="red">×</Icon><div><h3>Stops known online threats</h3><p>Blocks recognised malicious connections and dangerous downloads before they can do harm.</p></div></article>
            <article><Icon tone="orange">!</Icon><div><h3>Warns you about scam sites</h3><p>Helps prevent visits to known phishing and fraudulent websites designed to steal information.</p></div></article>
            <article><Icon tone="blue">◎</Icon><div><h3>Blocks unwanted adverts</h3><p>Optional whole-home advert blocking can make web pages cleaner and quicker to load.</p></div></article>
            <article><Icon tone="purple">◉</Icon><div><h3>Limits hidden tracking</h3><p>Reduces connections that quietly collect information about how your devices are used.</p></div></article>
            <article><Icon tone="green">✓</Icon><div><h3>Filters content your way</h3><p>Choose simple categories to block across your home, including gambling or adult content.</p></div></article>
            <article><Icon tone="blue">↻</Icon><div><h3>Stays current automatically</h3><p>Protection updates happen quietly, with no downloads or maintenance jobs for you.</p></div></article>
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
            <div className="product-box"><Shield /><strong>Maud</strong><span className="product-light" /></div>
            <span className="product-cable" aria-hidden="true" />
          </div>
          <div className="product-copy">
            <span className="kicker">Maud Box</span>
            <h2>A small box. A big weight off your mind.</h2>
            <p>Everything you need for simple, whole-home internet protection. Maud arrives ready to connect, with automatic security updates included.</p>
            <ul className="included-list">
              <li><span>✓</span> Maud protection box and power cable</li>
              <li><span>✓</span> Simple printed connection guide</li>
              <li><span>✓</span> Automatic protection updates</li>
              <li><span>✓</span> Friendly UK-based help</li>
            </ul>
            <div className="price-row"><div><strong>£149</strong><span>plus £9 per month</span></div><button className="button button-primary" type="button" onClick={() => { setPurchaseOpen(true); setCheckoutStep("details"); }}>Buy Maud</button></div>
            <p className="price-note">Trial pricing for this preview. Cancel the monthly service at any time.</p>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="shell closing-card">
          <div><span className="kicker">A calmer way to stay safe online</span><h2>Let Maud take care of the technical bits.</h2><p>Simple, automatic protection for your whole home.</p></div>
          <button className="button button-light" type="button" onClick={() => { setPurchaseOpen(true); setCheckoutStep("details"); }}>Buy a Maud Box</button>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div><a className="brand footer-brand" href="#top"><Shield small /><span>Maud<small>Home protection</small></span></a><p>Simple online protection for everyday homes.</p></div>
          <div><strong>Maud</strong><a href="#how">How it works</a><a href="#protection">Protection</a><button type="button" onClick={() => { setPurchaseOpen(true); setCheckoutStep("details"); }}>Buy Maud</button></div>
          <div><strong>Your service</strong><button type="button" onClick={() => setAccountOpen(true)}>My account</button><a href="#help">Get help</a><a href="#help">Service status</a></div>
          <div><strong>Information</strong><a href="#privacy">Privacy</a><a href="#privacy">Terms</a><a href="#privacy">Accessibility</a></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Maud. All rights reserved.</span><span>Made to be simple.</span></div>
      </footer>

      {accountOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAccountOpen(false)}>
          <section className="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setAccountOpen(false)}>×</button>
            <Shield />
            <span className="kicker">My account</span>
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

      {purchaseOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPurchaseOpen(false)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close checkout" onClick={() => setPurchaseOpen(false)}>×</button>
            <div className="checkout-header"><Shield small /><div><span className="kicker">Secure order</span><h2 id="checkout-title">{checkoutStep === "complete" ? "Your Maud is reserved" : "Buy your Maud Box"}</h2></div></div>
            {checkoutStep === "details" && <>
              <div className="checkout-progress"><span className="active">1 <small>Your details</small></span><i /><span>2 <small>Payment</small></span></div>
              <div className="order-line"><div className="order-thumb"><Shield small /></div><div><strong>Maud Box</strong><span>Includes automatic protection updates</span></div><strong>£149</strong></div>
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
