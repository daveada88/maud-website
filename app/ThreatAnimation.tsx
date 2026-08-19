// Threat-explainer animation ("Signal & Static") — provided by Dave, embedded verbatim.
// Self-contained: no JS, no external requests, honours prefers-reduced-motion, fully namespaced
// (.maud-anim / .mx-* / maud-*) so it cannot collide with this site's own CSS. Rendered via
// dangerouslySetInnerHTML because it is trusted, static, author-supplied markup — not derived
// from any runtime/user input.
const THREAT_ANIMATION_HTML = `
<style>
  .maud-anim{
    --bg:#eef3f3;
    --line:rgba(23,50,56,.14);
    --ink:#173238;
    --ink-soft:#5c7278;
    --signal:#1f8f63;
    --signal-bg:#e1f3ea;
    --static:#c8503f;
    --static-bg:#fbe6e1;
    --gold:#b9812c;
    --gold-bg:#f6ecd7;
    --cycle:16s;
  }

  .maud-anim, .maud-anim *{ box-sizing:border-box !important; }

  .maud-anim{
    position:relative;
    width:100%;
    max-width:1200px;
    margin:0 auto;
    border-radius:18px;
    overflow:hidden;
    background:var(--bg);
    font-family:'Manrope','Segoe UI',system-ui,-apple-system,Arial,sans-serif;
  }
  .maud-anim::before{
    content:"" !important;
    display:block !important;
    padding-top:53.3333% !important; 
  }
  .maud-anim .mx-stage{ position:absolute !important; inset:0 !important; }
  .maud-anim svg{ display:block !important; width:100% !important; height:100% !important; max-width:none !important; max-height:none !important; overflow:visible !important; }

  .maud-anim .mx-captions{
    position:absolute !important; left:0 !important; right:0 !important; bottom:24px !important;
    text-align:center !important; padding:0 5% !important;
    z-index:4 !important; pointer-events:none;
  }
  .maud-anim .mx-cap{
    margin:0 !important;
    position:absolute !important; left:0 !important; right:0 !important; bottom:0 !important;
    font-size:clamp(15px,2.4vw,22px) !important;
    font-weight:700 !important; color:var(--ink) !important;
    letter-spacing:.01em !important;
    opacity:0; transform:translateY(6px);
  }
  .maud-anim .mx-cap b{ color:var(--static); font-weight:800; }
  .maud-anim .mx-cap-1{ animation:maud-capA var(--cycle) infinite; }
  .maud-anim .mx-cap-2{ animation:maud-capB var(--cycle) infinite; }
  .maud-anim .mx-cap-3{ animation:maud-capC var(--cycle) infinite; }
  .maud-anim .mx-cap-4{ animation:maud-capD var(--cycle) infinite; }
  @keyframes maud-capA{ 0%,14%{opacity:0;transform:translateY(6px);} 17%,36%{opacity:1;transform:translateY(0);} 38.5%,100%{opacity:0;transform:translateY(-6px);} }
  @keyframes maud-capB{ 0%,38.5%{opacity:0;transform:translateY(6px);} 41%,63%{opacity:1;transform:translateY(0);} 65%,100%{opacity:0;transform:translateY(-6px);} }
  @keyframes maud-capC{ 0%,64.5%{opacity:0;transform:translateY(6px);} 66.5%,81%{opacity:1;transform:translateY(0);} 83.5%,100%{opacity:0;transform:translateY(-6px);} }
  @keyframes maud-capD{ 0%,83.5%{opacity:0;transform:translateY(6px);} 85.5%,96%{opacity:1;transform:translateY(0);} 99%,100%{opacity:0;transform:translateY(-6px);} }

  .maud-anim .mx-node-label{ font-size:15px; font-weight:700; fill:var(--ink); }
  .maud-anim .mx-node-sub{ font-size:12px; fill:var(--ink-soft); font-weight:500; }
  .maud-anim .mx-row-label{ font-size:12.5px; font-weight:600; fill:var(--ink); }

  
  .maud-anim .mx-router-safe{ animation:maud-showSafe var(--cycle) infinite; }
  .maud-anim .mx-router-bad{ animation:maud-showBad var(--cycle) infinite; transform-box:fill-box; transform-origin:center; }
  @keyframes maud-showSafe{ 0%,16%{opacity:1;} 18%,100%{opacity:0;} }
  @keyframes maud-showBad{
    0%,16.5% { opacity:0; }
    17.5%    { opacity:1; transform:translateX(-2px) scale(1.02); }
    18.5%    { opacity:.4; transform:translateX(3px) scale(.98); }
    19.5%    { opacity:1; transform:translate(0) scale(1); }
    96%      { opacity:1; }
    100%     { opacity:0; }
  }

  
  .maud-anim .mx-wifi-a, .maud-anim .mx-wifi-b, .maud-anim .mx-wifi-c{ animation:maud-wifiSeq 2.1s ease-out infinite; }
  .maud-anim .mx-wifi-b{ animation-delay:.32s; }
  .maud-anim .mx-wifi-c{ animation-delay:.64s; }
  @keyframes maud-wifiSeq{ 0%{opacity:.28;} 12%{opacity:1;} 42%,100%{opacity:.28;} }

  
  .maud-anim .mx-glitch-burst{ animation:maud-glitch var(--cycle) infinite; }
  @keyframes maud-glitch{
    0%,16.6%{opacity:0;} 17%{opacity:1;} 17.4%{opacity:0;} 17.8%{opacity:.7;} 18.2%{opacity:0;}
    72.4%{opacity:0;} 72.8%{opacity:.85;} 73.2%{opacity:0;} 73.6%{opacity:.5;} 74%,100%{opacity:0;}
  }

  
  
  .maud-anim .mx-criminal-figure{ animation:maud-showCriminal var(--cycle) infinite; }
  @keyframes maud-showCriminal{
    0%,18%   { opacity:0; transform:translateY(8px); }
    23%,95%  { opacity:1; transform:translateY(0); }
    99%,100% { opacity:0; transform:translateY(8px); }
  }
  .maud-anim .mx-screen-shell{ animation:maud-showScreen var(--cycle) infinite; }
  @keyframes maud-showScreen{
    0%,20%   { opacity:0; transform:translateY(8px); }
    25%,95%  { opacity:1; transform:translateY(0); }
    99%,100% { opacity:0; transform:translateY(8px); }
  }

  
  .maud-anim .mx-link-line{ stroke-dasharray:5 7; animation:maud-drawLink var(--cycle) infinite; }
  @keyframes maud-drawLink{
    0%,20.5%{ stroke-dashoffset:200; opacity:0; }
    22%     { opacity:.85; }
    29%     { stroke-dashoffset:0;   opacity:.85; }
    95%     { stroke-dashoffset:0;   opacity:.85; }
    100%    { opacity:0; }
  }

  
  
  .maud-anim .mx-data-icon{ opacity:0; }
  .maud-anim .mx-data-1{ animation:maud-fade1 var(--cycle) infinite; }
  .maud-anim .mx-data-house{ animation:maud-fadeHouse var(--cycle) infinite; }
  .maud-anim .mx-data-3{ animation:maud-fade3 var(--cycle) infinite; }
  @keyframes maud-fade1{ 0%,30.5%{opacity:0;} 32%,45.3%{opacity:1;} 47.3%{opacity:0;} 100%{opacity:0;} }
  @keyframes maud-fadeHouse{ 0%,37.5%{opacity:0;} 39%,50.9%{opacity:1;} 52.9%{opacity:0;} 100%{opacity:0;} }
  @keyframes maud-fade3{ 0%,42.5%{opacity:0;} 44%,57.3%{opacity:1;} 59.3%{opacity:0;} 100%{opacity:0;} }

  
  .maud-anim .mx-row-1{ animation:maud-rowIn1 var(--cycle) infinite; }
  .maud-anim .mx-row-2{ animation:maud-rowIn2 var(--cycle) infinite; }
  .maud-anim .mx-row-3{ animation:maud-rowIn3 var(--cycle) infinite; }
  .maud-anim .mx-row-4{ animation:maud-rowIn4 var(--cycle) infinite; }
  @keyframes maud-rowIn1{ 0%,47.3%{opacity:0;} 48.9%,94%{opacity:1;} 97%,100%{opacity:0;} }
  @keyframes maud-rowIn2{ 0%,52.9%{opacity:0;} 54.5%,94%{opacity:1;} 97%,100%{opacity:0;} }
  @keyframes maud-rowIn3{ 0%,59.3%{opacity:0;} 60.9%,94%{opacity:1;} 97%,100%{opacity:0;} }
  @keyframes maud-rowIn4{ 0%,78.8%{opacity:0;} 80.2%,94%{opacity:1;} 97%,100%{opacity:0;} }

  
  .maud-anim .mx-slot-1{ animation:maud-slotOut1 var(--cycle) infinite; }
  .maud-anim .mx-slot-2{ animation:maud-slotOut2 var(--cycle) infinite; }
  .maud-anim .mx-slot-3{ animation:maud-slotOut3 var(--cycle) infinite; }
  .maud-anim .mx-slot-4{ animation:maud-slotOut4 var(--cycle) infinite; }
  @keyframes maud-slotOut1{ 0%,46.3%{opacity:1;} 47.3%,100%{opacity:0;} }
  @keyframes maud-slotOut2{ 0%,51.9%{opacity:1;} 52.9%,100%{opacity:0;} }
  @keyframes maud-slotOut3{ 0%,58.3%{opacity:1;} 59.3%,100%{opacity:0;} }
  @keyframes maud-slotOut4{ 0%,77.8%{opacity:1;} 78.8%,100%{opacity:0;} }

  
  
  .maud-anim .mx-path-outbound{ stroke-dasharray:420; animation:maud-drawOutbound var(--cycle) infinite; }
  @keyframes maud-drawOutbound{
    0%,25.5% { stroke-dashoffset:420; opacity:0; }
    27%      { opacity:.9; }
    33%      { stroke-dashoffset:0; opacity:.9; }
    81%      { stroke-dashoffset:0; opacity:.9; }
    84%,100% { opacity:0; }
  }
  .maud-anim .mx-path-intended{ stroke-dasharray:5 6; animation:maud-showIntended var(--cycle) infinite; }
  @keyframes maud-showIntended{ 0%,61.5%{opacity:0;} 64%,81%{opacity:.45;} 84%,100%{opacity:0;} }
  .maud-anim .mx-path-diverted{ stroke-dasharray:200; animation:maud-drawDiverted var(--cycle) infinite; }
  @keyframes maud-drawDiverted{
    0%,73%   { stroke-dashoffset:200; opacity:0; }
    74%      { opacity:1; }
    78.5%    { stroke-dashoffset:0; opacity:1; }
    81%      { opacity:1; }
    84%,100% { stroke-dashoffset:0; opacity:0; }
  }
  .maud-anim .mx-pay-icon{ animation:maud-showPay var(--cycle) infinite; }
  @keyframes maud-showPay{ 0%,64%{opacity:0;} 65.4%,77.8%{opacity:1;} 79.8%{opacity:0;} 100%{opacity:0;} }

  .maud-anim .mx-shopper-sub-a{ animation:maud-showSubA var(--cycle) infinite; }
  .maud-anim .mx-shopper-sub-b{ animation:maud-showSubB var(--cycle) infinite; }
  @keyframes maud-showSubA{ 0%,28%{opacity:0;} 31%,62%{opacity:1;} 63.5%,100%{opacity:0;} }
  @keyframes maud-showSubB{ 0%,64.5%{opacity:0;} 66%,82%{opacity:1;} 85%,100%{opacity:0;} }

  .maud-anim .mx-bank-dim{ animation:maud-dimBank var(--cycle) infinite; }
  @keyframes maud-dimBank{ 0%,80%{opacity:.92;} 83.5%,95%{opacity:.35;} 97%,100%{opacity:.92;} }
  .maud-anim .mx-bank-empty{ animation:maud-showEmpty var(--cycle) infinite; }
  @keyframes maud-showEmpty{ 0%,81%{opacity:0;} 84%,95%{opacity:1;} 97%,100%{opacity:0;} }

  
  @media (prefers-reduced-motion: reduce){
    .maud-anim *{ animation:none !important; }
    .maud-anim .mx-cap-1, .maud-anim .mx-cap-2, .maud-anim .mx-cap-3{ opacity:0; }
    .maud-anim .mx-shopper-sub-a{ opacity:0; }
    .maud-anim .mx-cap-4{ opacity:1; transform:none; }
    .maud-anim .mx-router-safe, .maud-anim .mx-glitch-burst, .maud-anim .mx-data-icon, .maud-anim .mx-pay-icon{ opacity:0; }
    .maud-anim .mx-wifi-a, .maud-anim .mx-wifi-b, .maud-anim .mx-wifi-c{ opacity:.5; }
    .maud-anim .mx-router-bad, .maud-anim .mx-criminal-figure, .maud-anim .mx-screen-shell, .maud-anim .mx-bank-empty, .maud-anim .mx-shopper-sub-b, .maud-anim .mx-row-1, .maud-anim .mx-row-2, .maud-anim .mx-row-3, .maud-anim .mx-row-4{ opacity:1; transform:none; }
    .maud-anim .mx-slot-1, .maud-anim .mx-slot-2, .maud-anim .mx-slot-3, .maud-anim .mx-slot-4{ opacity:0; }
    .maud-anim .mx-link-line{ opacity:.85; stroke-dashoffset:0; }
    .maud-anim .mx-path-outbound{ opacity:.9; stroke-dashoffset:0; }
    .maud-anim .mx-path-diverted{ opacity:1; stroke-dashoffset:0; }
    .maud-anim .mx-path-intended{ opacity:.45; }
    .maud-anim .mx-bank-dim{ opacity:.35; }
  }
</style>

<div class="maud-anim" role="img"
     aria-label="Animated diagram. A home and a person connect through one internet router to a bank. A cyber criminal, drawn as a plain human figure with a code-symbol badge above the home, quietly takes over the router, and a hidden channel opens from it up to a screen beside them. You, a figure below the home holding a phone and wearing a tick badge, send passwords and then bank and card details from the phone, while the house sends personal details of its own accord; each one is diverted at the router and stacks up on the criminal's screen. Finally you send a payment along the very same route. At the router it bends away down the hidden channel and lands on the screen. Nothing arrives at the bank.">

<div class="mx-stage">
<svg viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="maud-dotgrid" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(23,50,56,0.05)"/>
    </pattern>

    <!-- reusable neutral figure: same shape/colour for every person on
         screen — only the chest badge differs. -->
    <g id="maud-figure-template">
      <path d="M -22,0 L -20,-28 Q -23,-52 0,-52 Q 23,-52 20,-28 L 22,0 Z"/>
      <circle cx="0" cy="-66" r="15"/>
    </g>

    <!-- nested broadcast arcs, reused by both router states -->
    <g id="maud-wifi-arcs">
      <path class="mx-wifi-a" d="M-6.9,-5.8  A9,9   0 0 1 6.9,-5.8"  opacity=".45"/>
      <path class="mx-wifi-b" d="M-11.5,-9.6 A15,15 0 0 1 11.5,-9.6" opacity=".45"/>
      <path class="mx-wifi-c" d="M-16.1,-13.5 A21,21 0 0 1 16.1,-13.5" opacity=".45"/>
    </g>

    <!-- travelling item icons -->
    <g id="maud-icon-key">
      <circle cx="-6" cy="0" r="6" fill="none" stroke="var(--gold)" stroke-width="3"/>
      <rect x="-1" y="-2" width="15" height="4" fill="var(--gold)"/>
      <rect x="9" y="-2" width="3" height="8" fill="var(--gold)"/>
    </g>
    <g id="maud-icon-person">
      <circle cx="0" cy="-5.5" r="4.5" fill="var(--gold)"/>
      <path d="M-7,7 Q0,-4 7,7 Z" fill="var(--gold)"/>
    </g>
    <!-- credit card: bank / card details -->
    <g id="maud-icon-card">
      <rect x="-13" y="-8.5" width="26" height="17" rx="2.5" fill="var(--gold)"/>
      <rect x="-13" y="-4.5" width="26" height="4" fill="#fff" opacity=".9"/>
      <rect x="-9.5" y="2" width="7" height="3.5" rx="1" fill="#fff" opacity=".9"/>
    </g>
    <!-- banknote: the payment. No specific amount, so the animation isn't
         tied to one figure. -->
    <g id="maud-icon-cash">
      <rect x="-16" y="-8.5" width="32" height="17" rx="3" fill="var(--gold)"/>
      <rect x="-13.5" y="-6" width="27" height="12" rx="1.5" fill="none"
            stroke="#fff" stroke-width="1" opacity=".55"/>
      <text x="0" y="4" text-anchor="middle" font-size="10.5" font-weight="800"
            letter-spacing="-.5" fill="#fff">£££</text>
    </g>
  </defs>

  <rect width="1200" height="640" fill="var(--bg)"/>
  <rect width="1200" height="640" fill="url(#maud-dotgrid)"/>

  <!-- ====== base connection line: stops at each node's edge, never runs
             through it (v4 port rule) ====== -->
  <line x1="245" y1="340" x2="524" y2="340" stroke="var(--line)" stroke-width="2"/>
  <line x1="596" y1="340" x2="903" y2="340" stroke="var(--line)" stroke-width="2"/>

  <!-- ================== THE BACKDOOR CHANNEL (one arc, reused) ============= -->
  <!-- leaves the router at its right edge, so it crosses neither the
       antennae nor the wifi arcs; clears the roofline entirely -->
  <path class="mx-link-line" d="M590,330 C620,290 600,220 527,190"
        fill="none" stroke="var(--static)" stroke-width="2" stroke-linecap="round"/>

  <!-- ===================== CYBER CRIMINAL — above the home ================= -->
  <!-- static position on this OUTER group only -->
  <g transform="translate(190,150)">
    <g class="mx-criminal-figure">
      <!-- faint tether so the screen reads as theirs -->
      <path d="M26,-14 L136,2" fill="none" stroke="var(--static)"
            stroke-width="2" opacity=".2" stroke-linecap="round"/>
      <g fill="var(--ink-soft)">
        <use href="#maud-figure-template"/>
      </g>
      <g transform="translate(-15,-45)">
        <rect width="30" height="30" rx="8" fill="var(--static-bg)"/>
        <text x="15" y="21" text-anchor="middle" font-family="monospace"
              font-weight="700" font-size="13" fill="var(--static)">&lt;/&gt;</text>
      </g>
      <text y="20" text-anchor="middle" class="mx-node-label">Cyber criminal</text>
      <text y="38" text-anchor="middle" class="mx-node-sub">connected without you knowing</text>
    </g>
  </g>

  <!-- ===================== THE SCREEN — where stolen items land =========== -->
  <g transform="translate(330,95)">
    <g class="mx-screen-shell">
      <rect x="0" y="0" width="195" height="160" rx="10"
            fill="#ffffff" stroke="rgba(23,50,56,.30)" stroke-width="2"/>
      <path d="M0,10 A10,10 0 0 1 10,0 L185,0 A10,10 0 0 1 195,10 L195,28 L0,28 Z"
            fill="var(--static-bg)"/>
      <circle cx="14" cy="14" r="3" fill="var(--static)" opacity=".55"/>
      <circle cx="26" cy="14" r="3" fill="var(--static)" opacity=".55"/>
      <circle cx="38" cy="14" r="3" fill="var(--static)" opacity=".55"/>
      <line x1="0" y1="28" x2="195" y2="28" stroke="rgba(23,50,56,.18)" stroke-width="1.5"/>

      <g fill="rgba(23,50,56,.08)">
        <rect class="mx-slot-1" x="18" y="43"  width="159" height="10" rx="5"/>
        <rect class="mx-slot-2" x="18" y="73"  width="159" height="10" rx="5"/>
        <rect class="mx-slot-3" x="18" y="103" width="159" height="10" rx="5"/>
        <rect class="mx-slot-4" x="18" y="133" width="159" height="10" rx="5"/>
      </g>

      <g class="mx-row-1" opacity="0">
        <g transform="translate(27,48)"><use href="#maud-icon-key"/></g>
        <text x="48" y="52" class="mx-row-label">Passwords</text>
      </g>
      <g class="mx-row-2" opacity="0">
        <g transform="translate(27,78)"><use href="#maud-icon-person"/></g>
        <text x="48" y="82" class="mx-row-label">Personal details</text>
      </g>
      <g class="mx-row-3" opacity="0">
        <g transform="translate(27,108)"><use href="#maud-icon-card"/></g>
        <text x="48" y="112" class="mx-row-label">Bank / card details</text>
      </g>
      <g class="mx-row-4" opacity="0">
        <g transform="translate(27,138)"><use href="#maud-icon-cash"/></g>
        <text x="48" y="142" class="mx-row-label" fill="var(--gold)">Payments</text>
      </g>

      <!-- stand -->
      <line x1="97" y1="160" x2="97" y2="172" stroke="rgba(23,50,56,.30)" stroke-width="3"/>
      <rect x="67" y="172" width="60" height="6" rx="3" fill="rgba(23,50,56,.30)"/>
    </g>
  </g>

  <!-- ========================= HOME NODE — the middle ===================== -->
  <g transform="translate(135,270)">
    <polygon points="55,0 110,42 0,42" fill="var(--ink)" opacity=".92"/>
    <rect x="14" y="42" width="82" height="58" rx="4" fill="var(--ink)" opacity=".92"/>
    <rect x="46" y="66" width="20" height="34" fill="var(--bg)"/>
    <text x="55" y="128" text-anchor="middle" class="mx-node-label">Your home</text>
    <text x="55" y="146" text-anchor="middle" class="mx-node-sub">14 connected devices</text>
  </g>

  <!-- ========================= YOU — below the home ======================= -->
  <!-- holding a phone: everything she sends leaves from it, and it still
       has to cross the router. -->
  <g transform="translate(190,520)">
    <g>
      <g fill="var(--ink-soft)">
        <use href="#maud-figure-template"/>
      </g>
      <g transform="translate(-15,-45)">
        <rect width="30" height="30" rx="8" fill="var(--signal-bg)"/>
        <path d="M7,15 L13,21 L23,9" stroke="var(--signal)" stroke-width="3"
              fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- the phone -->
      <g transform="translate(22,-36)">
        <rect x="0" y="0" width="19" height="29" rx="3.5" fill="var(--ink)"/>
        <rect x="2.5" y="4" width="14" height="19" rx="1.5" fill="var(--bg)"/>
        <rect x="6.5" y="1.4" width="6" height="1.6" rx=".8" fill="var(--bg)" opacity=".7"/>
      </g>
      <text y="20" text-anchor="middle" class="mx-node-label">You</text>
      <text y="38" text-anchor="middle" class="mx-node-sub mx-shopper-sub-a" opacity="0">on your phone, signing in</text>
      <text y="38" text-anchor="middle" class="mx-node-sub mx-shopper-sub-b" opacity="0">sending a payment</text>
    </g>
  </g>

  <!-- ============================= ROUTER NODE ============================ -->
  <g transform="translate(520,310)">
    <g class="mx-router-safe">
      <!-- antennae -->
      <path d="M18,17 L14,-2" stroke="var(--signal)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M62,17 L66,-2" stroke="var(--signal)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="14" cy="-3" r="2.6" fill="var(--signal)"/>
      <circle cx="66" cy="-3" r="2.6" fill="var(--signal)"/>
      <!-- broadcasting, rising past the antennae -->
      <g transform="translate(40,8)" fill="none" stroke="var(--signal)"
         stroke-width="2.4" stroke-linecap="round">
        <use href="#maud-wifi-arcs"/>
      </g>
      <rect x="6" y="16" width="68" height="28" rx="8" fill="#fff" stroke="var(--signal)" stroke-width="2"/>
      <circle cx="40" cy="30" r="4" fill="var(--signal)"/>
    </g>
    <g class="mx-router-bad">
      <path d="M18,17 L14,-2" stroke="var(--static)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M62,17 L66,-2" stroke="var(--static)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="14" cy="-3" r="2.6" fill="var(--static)"/>
      <circle cx="66" cy="-3" r="2.6" fill="var(--static)"/>
      <g transform="translate(40,8)" fill="none" stroke="var(--static)"
         stroke-width="2.4" stroke-linecap="round">
        <use href="#maud-wifi-arcs"/>
      </g>
      <rect x="6" y="16" width="68" height="28" rx="8" fill="#fff" stroke="var(--static)" stroke-width="2"/>
      <circle cx="40" cy="30" r="4" fill="var(--static)"/>
    </g>
    <text x="40" y="82" text-anchor="middle" class="mx-node-label">Internet router</text>
    <text x="40" y="100" text-anchor="middle" class="mx-node-sub">everything goes through here</text>
    <g class="mx-glitch-burst">
      <rect x="-8" y="4" width="96" height="52" fill="var(--static)" opacity=".16"/>
    </g>
  </g>

  <!-- ============================== BANK NODE ============================= -->
  <!-- pediment + columns + steps, so it can't be mistaken for a second house -->
  <g transform="translate(915,288)">
    <g class="mx-bank-dim" fill="var(--ink)">
      <polygon points="45,0 100,26 -10,26"/>
      <rect x="-6" y="26" width="102" height="8"/>
      <rect x="5"  y="34" width="12" height="36"/>
      <rect x="27" y="34" width="12" height="36"/>
      <rect x="49" y="34" width="12" height="36"/>
      <rect x="71" y="34" width="12" height="36"/>
      <rect x="-8" y="70" width="106" height="10" rx="2"/>
    </g>
    <text x="45" y="112" text-anchor="middle" class="mx-node-label">Bank</text>
    <text x="45" y="130" text-anchor="middle" class="mx-node-sub">where the payment should go</text>

    <g class="mx-bank-empty" opacity="0">
      <rect x="-14" y="-46" width="118" height="26" rx="13" fill="var(--static-bg)"/>
      <text x="45" y="-28" text-anchor="middle" font-size="13" font-weight="700" fill="var(--static)">Nothing arrives</text>
    </g>
  </g>

  <!-- ============ the payment: one route, splitting at the router ========= -->
  <!-- where it should have carried on (router edge -> bank edge) -->
  <line class="mx-path-intended" x1="596" y1="340" x2="903" y2="340"
        stroke="var(--signal)" stroke-width="2.5"/>
  <!-- the leg she actually uses (phone -> router edge) -->
  <path class="mx-path-outbound" d="M234,488 C345,492 428,436 524,346"
        fill="none" stroke="var(--signal)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- where it actually ends up: the same backdoor arc, now solid -->
  <path class="mx-path-diverted" d="M590,330 C620,290 600,220 527,190"
        fill="none" stroke="var(--static)" stroke-width="3.5" stroke-linecap="round"/>

  <!-- ==== lane 1: what she sends from the phone (577px route) ============ -->
  <g class="mx-data-icon mx-data-1">
    <g>
      <animateMotion dur="16s" repeatCount="indefinite"
        keyPoints="0;0;1;1" keyTimes="0;0.31;0.463;1" calcMode="linear"
        path="M234,488 C345,492 428,436 528,344 L590,330 C620,290 600,220 527,190"/>
      <use href="#maud-icon-key"/>
    </g>
  </g>

  <!-- ==== lane 2: the house's own traffic (523px route) =================== -->
  <!-- leaves unprompted, while she is busy on the phone: not all of what
       crosses the router is hers to control -->
  <g class="mx-data-icon mx-data-house">
    <g>
      <animateMotion dur="16s" repeatCount="indefinite"
        keyPoints="0;0;1;1" keyTimes="0;0.38;0.519;1" calcMode="linear"
        path="M245,340 L560,340 L590,330 C620,290 600,220 527,190"/>
      <use href="#maud-icon-person"/>
    </g>
  </g>

  <g class="mx-data-icon mx-data-3">
    <g>
      <animateMotion dur="16s" repeatCount="indefinite"
        keyPoints="0;0;1;1" keyTimes="0;0.43;0.583;1" calcMode="linear"
        path="M234,488 C345,492 428,436 528,344 L590,330 C620,290 600,220 527,190"/>
      <use href="#maud-icon-card"/>
    </g>
  </g>

  <!-- ============ the payment itself: same route, same speed ============== -->
  <g class="mx-pay-icon" opacity="0">
    <g>
      <animateMotion dur="16s" repeatCount="indefinite"
        keyPoints="0;0;1;1" keyTimes="0;0.63;0.783;1" calcMode="linear"
        path="M234,488 C345,492 428,436 528,344 L590,330 C620,290 600,220 527,190"/>
      <g transform="scale(1.35)"><use href="#maud-icon-cash"/></g>
    </g>
  </g>

</svg>

<div class="mx-captions">
  <p class="mx-cap mx-cap-1">A hacked router. Quiet, and <b>no one notices</b>.</p>
  <p class="mx-cap mx-cap-2">Every password. Every card number. <b>Watched</b> — personal details stolen for fraud.</p>
  <p class="mx-cap mx-cap-3">Even a payment can be <b>redirected</b> — before it ever arrives.</p>
  <p class="mx-cap mx-cap-4">This is what <b>can happen</b> on an unprotected network.</p>
</div>

</div>
</div>
`;

export default function ThreatAnimation() {
  return <div dangerouslySetInnerHTML={{ __html: THREAT_ANIMATION_HTML }} />;
}
