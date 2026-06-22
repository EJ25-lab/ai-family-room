/* AI Family Room — homepage sections (EJC clean & light) */
const DS = window.EdJusticeCollectiveDesignSystem_f6e555 || {};
const { Button, Eyebrow, SectionHeading, Callout, FindingCard, Badge } = DS;
const LOGO = 'assets/logo-color.svg';

/* ---------------- data ---------------- */
const NAV_LINKS = [
  { label: 'Start Here', href: 'start.html' },
  { label: 'The Tools', href: 'tools.html' },
  { label: 'Missions', href: 'missions.html' },
];
const FOR_YOU = [
  { label: 'Parent Intel', href: 'parents.html' },
  { label: 'Mil-Spouse Intel', href: 'milspouse.html' },
  { label: 'The Next Mission', href: 'next-mission.html' },
  { label: 'See all tracks →', href: 'missions.html' },
];
const NAV_LINKS_2 = [
  { label: 'What Could Go Wrong', href: 'what-could-go-wrong.html' },
  { label: 'Stay Safe', href: 'safety.html' },
];

const TRACKS = [
  { eyebrow: 'Track · Foundations', name: 'Foundations', note: 'Start from zero. Permission to be messy — you already had the voice.', meta: '3 missions · 3 badges', href: 'missions.html#track-f' },
  { eyebrow: 'Track · Build', name: 'Build Your Superpower', note: 'From what is in your head to a real document, in minutes.', meta: '4 missions · 4 badges', href: 'missions.html#track-g' },
  { eyebrow: 'Track · Parents', name: 'Parent Intel', note: 'The school email, the IEP meeting, the conversation you have been rehearsing.', meta: '2 missions · + resources', href: 'parents.html' },
  { eyebrow: 'Track · Mil-Spouse', name: 'Mil-Spouse Intel', note: 'Grace under pressure. Built for the life you actually live.', meta: 'Built for the move', href: 'milspouse.html' },
  { eyebrow: 'Track · What is next', name: 'The Next Mission', note: 'What the next chapter looks like when the old one is over.', meta: 'Career & reinvention', href: 'next-mission.html' },
];

const ARTIFACTS = [
  { eyebrow: 'Artifact · Communication', headline: 'The email that opens the door', body: 'The teacher juggling 90 kids whose inbox got away from her. The case manager. The hiring manager three cities away. Drafted in plain, partnership language.', insight: 'You stayed in the room.' },
  { eyebrow: 'Artifact · Work', headline: 'The resume that translates the gap', body: 'Every transition is a leadership role. Every volunteer shift is a transferable skill. AI helps you say it out loud.', insight: 'The years you held everything together finally read as experience.' },
  { eyebrow: 'Artifact · Advocacy', headline: 'The map for the hard meeting', body: 'Walk in with the conversation organized — observation, concern, ask — on one page you can hold.', insight: 'You came as a partner, not an opponent.' },
];

const TOOLS = [
  { eyebrow: 'Warm-up', name: 'NeuralWriter', desc: 'Your writing warm-up. Turns rough thoughts into clear prompts. No account needed.', cta: 'Learn more →', href: 'tools.html#neuralwriter', featured: false },
  { eyebrow: 'Main tool', name: 'Claude', desc: 'The AI that thinks out loud with you. Our main tool for communication, advocacy, and problem-solving.', cta: 'Open Claude in this room →', href: 'tools.html#claude', featured: true },
  { eyebrow: 'Make it visual', name: 'Gamma', desc: 'Instant docs, decks, and pages. Give it one sentence; it builds the visual document.', cta: 'Learn more →', href: 'tools.html#gamma', featured: false },
];

const SK_CHIPS = ['6 Wednesdays · starts July 22', 'Live online · Google Meet', 'Just 15 seats', 'Build something real every week'];
const COHORTS = [
  { kicker: 'Day cohort', time: 'Wednesdays · 10–11am ET', series: 'https://buy.stripe.com/00w4gA4E70ii5DD8gJe3e0e', drop: 'https://buy.stripe.com/bJe9AU7Qj2qq0jj7cFe3e0d' },
  { kicker: 'Evening cohort', time: 'Wednesdays · 6–7pm ET', series: 'https://buy.stripe.com/8x23cw2vZ6GG6HH9kNe3e0f', drop: 'https://buy.stripe.com/4gM5kE1rV9SSea9eF7e3e0c' },
];

const FAQ = [
  { q: 'Do I need an account?', a: <>No. You can complete every mission without signing up for anything on this site. Joining the community is optional — it just gets you one welcome email and one tip per month.</> },
  { q: 'Will you sell my data?', a: <>No. We never sell, rent, or trade your information. If you join the community we collect only what you choose to share, and we delete it on request — email <a href="mailto:chief@theedjusticecollective.com">chief@theedjusticecollective.com</a>.</> },
  { q: 'Does this cost anything?', a: <>No. Everything on this site is free. The AI tools we recommend (Claude, NeuralWriter, Gamma) have free tiers that cover what the missions need. We will always tell you when a tool is asking for money.</> },
  { q: 'Who built this and why?', a: <>Built by the Chief Possibility Pilot and EdJustice Collective as a community offering, not a product. Independent. No paywall. <a href="about.html">Read the full story →</a></> },
  { q: 'Can I bring this to my community?', a: <>Yes — no permission needed. <a href="share-kit.html">Grab the share kit</a> with copy-paste templates for school newsletters, group emails, and community posts.</> },
];

const SECTION_LABELS = {
  parents: 'Parent Intel', milspouse: 'Mil-Spouse Intel', 'next-mission': 'The Next Mission',
};

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <nav className="afr-nav" aria-label="Main navigation">
        <div className="afr-wrap afr-nav-inner">
          <a href="index.html" className="afr-logo" aria-label="AI Family Room home">
            <span className="afr-mark">AI</span>
            <span>
              <span className="afr-logo-name">AI Family Room</span>
              <span className="afr-logo-sub">by EdJustice Collective</span>
            </span>
          </a>
          <ul className="afr-nav-links">
            {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            <li className="afr-dd">
              <a href="missions.html" aria-haspopup="true">For You <span className="afr-caret">▾</span></a>
              <ul className="afr-dd-menu">
                {FOR_YOU.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </li>
            {NAV_LINKS_2.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <a href="join.html" className="afr-nav-cta">Join the community →</a>
          <button className={'afr-burger' + (open ? ' open' : '')} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={'afr-drawer' + (open ? ' open' : '')}>
        {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <span className="afr-drawer-label">For You</span>
        {FOR_YOU.slice(0, 3).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        {NAV_LINKS_2.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        <a href="progress.html">My Progress</a>
        <a href="join.html" className="afr-nav-cta">Join the community →</a>
      </div>
    </React.Fragment>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ layout, pills }) {
  const split = layout === 'split';
  return (
    <header className="afr-sect afr-hero" role="banner">
      <div className="afr-wrap">
        <div className={'afr-hero-grid' + (split ? ' split' : '')}>
          <div className="afr-hero-text">
            <div className="afr-brandbar fade-up d1">
              <img src={LOGO} alt="EdJustice Collective" />
              <span className="rule"></span>
              <span className="meta">EdJustice Collective<small>Build Systems · Promote Justice</small></span>
            </div>
            <p className="afr-eyebrow fade-up d1">AI literacy for families</p>
            <h1 className="fade-up d2">You already have the voice.<br /><span className="accent">AI just turns up the volume.</span></h1>
            <p className="afr-hero-sub fade-up d3">A free access point for people who have been told AI is important — <strong>but never given a real door in.</strong></p>
            <div className="afr-btn-row fade-up d4">
              <Button variant="primary" size="lg" href="start.html">Start in 60 seconds →</Button>
              <Button variant="secondary" size="lg" href="missions.html">Explore the missions →</Button>
            </div>
            <div className="afr-status fade-up d5"><span className="dot"></span>Free · No login · No data sold</div>
            {pills && (
              <div className="afr-pills fade-up d5">
                <a className="afr-pill-link" href="#explore">Explore the room</a>
                <a className="afr-pill-link" href="#golive">Go live</a>
                <a className="afr-pill-link" href="#faq">Questions</a>
              </div>
            )}
          </div>
          {split && (
            <div className="afr-hero-panel fade-up d3">
              <div className="panel-mark"><img src={LOGO} alt="" /></div>
              <p className="panel-q">Walk in. Learn the skill. Walk out with what you built.</p>
              <ul className="panel-list">
                <li>No account, no paywall, no expiration</li>
                <li>Start in your language, with your real problem</li>
                <li>Every mission ends in something you keep</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------------- CHIEF NOTE ---------------- */
function ChiefNote({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-label="A note from the Chief">
      <div className="afr-wrap">
        <div className="afr-chief">
          <p className="afr-eyebrow">A note from the Chief</p>
          <h2 className="afr-h2">The room is the <span className="accent">offering.</span></h2>
          <Callout style={{ margin: 'var(--space-6) 0 var(--space-7)', maxWidth: 640 }}>
            A free room — no login, no paywall, no expiration. Walk in, learn the skill, walk out with what you built.
          </Callout>
          <div className="afr-chief-body">
            <p>EdJustice Collective is about education — that has always been the work. In the information age, knowledge belongs to everyone, <strong>including families who have not been given a real door in.</strong></p>
            <p>AI literacy is essential literacy now. So this is what we are offering: a place where you start in your own language, with your own real problem, and leave with something you actually use.</p>
          </div>
          <div className="afr-sign">
            <div className="afr-sign-name">— The Chief Possibility Pilot</div>
            <div className="afr-sign-role">EdJustice Collective</div>
          </div>
          <a className="afr-textlink" href="about.html">Why this room exists →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRACKS ---------------- */
function Tracks({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="tracks-h">
      <div className="afr-wrap">
        <div className="afr-sect-head">
          <p className="afr-eyebrow">The tracks</p>
          <h2 className="afr-h2" id="tracks-h">Twelve missions across five tracks. <span className="accent">Pick your starting point.</span></h2>
        </div>
        <div className="afr-track-grid">
          {TRACKS.map((t) => (
            <a className="afr-track" href={t.href} key={t.name}>
              <span className="afr-track-marker"></span>
              <span className="afr-track-eyebrow">{t.eyebrow}</span>
              <span className="afr-track-name">{t.name}</span>
              <p className="afr-track-note">{t.note}</p>
              <span className="afr-track-meta">{t.meta}</span>
            </a>
          ))}
        </div>
        <div className="afr-track-foot">
          <Button variant="primary" href="missions.html">See all 12 missions →</Button>
          <Button variant="secondary" href="progress.html">View my badges →</Button>
          <span className="small">Track progress, earn badges — <a href="progress.html">no account required</a>.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ARTIFACTS ---------------- */
function Artifacts({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="art-h">
      <div className="afr-wrap">
        <div className="afr-sect-head">
          <p className="afr-eyebrow">What you walk away with</p>
          <h2 className="afr-h2" id="art-h">Real artifacts. Not theory.</h2>
          <p className="afr-sub">Every mission ends in something you can keep and use that week.</p>
        </div>
        <div className="afr-grid-3">
          {ARTIFACTS.map((a) => (
            <FindingCard key={a.headline} eyebrow={a.eyebrow} headline={a.headline} insight={a.insight} style={{ marginBottom: 0, boxShadow: 'var(--shadow-card)' }}>
              {a.body}
            </FindingCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TOOLS ---------------- */
function Tools({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="tools-h">
      <div className="afr-wrap">
        <div className="afr-sect-head">
          <p className="afr-eyebrow">Your toolkit</p>
          <h2 className="afr-h2" id="tools-h">Three tools. Zero overwhelm.</h2>
          <p className="afr-sub">Free to start. No downloads. We will always tell you when a tool is asking for money.</p>
        </div>
        <div className="afr-grid-3">
          {TOOLS.map((t) => (
            <a className={'afr-tool' + (t.featured ? ' featured' : '')} href={t.href} key={t.name}>
              <span className="afr-tool-eyebrow">{t.eyebrow}{t.featured ? ' · start here' : ''}</span>
              <span className="afr-tool-name">{t.name}</span>
              <p className="afr-tool-desc">{t.desc}</p>
              <span className="afr-tool-cta">{t.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SIDE-KICK (live class) ---------------- */
function SideKick({ tone }) {
  return (
    <section id="golive" className={'afr-sect afr-sk ' + tone} aria-labelledby="sk-h">
      <div className="afr-wrap">
        <div className="afr-sk-head">
          <p className="afr-eyebrow">Want to learn live?</p>
          <h2 className="afr-h2" id="sk-h">The room is free, always. When you are ready to go live, meet your <span className="accent">AI Daily Side-Kick.</span></h2>
          <p className="afr-sub">The same practice you do in here — just live and guided. A small-group, 6-week class held online over Google Meet. Walk in with your questions; leave each week having built one real thing.</p>
        </div>
        <div className="afr-sk-chips">
          {SK_CHIPS.map((c) => <span className="afr-chip" key={c}>{c}</span>)}
        </div>
        <div className="afr-cohorts">
          {COHORTS.map((c) => (
            <div className="afr-cohort" key={c.kicker}>
              <div className="afr-cohort-kicker">{c.kicker}</div>
              <div className="afr-cohort-time">{c.time}</div>
              <a className="afr-cohort-btn afr-cohort-series" href={c.series} target="_blank" rel="noopener">Reserve the series · $100 →</a>
              <a className="afr-cohort-btn afr-cohort-drop" href={c.drop} target="_blank" rel="noopener">Drop in one week · $25</a>
            </div>
          ))}
        </div>
        <p className="afr-sk-note">
          Choose the full series and <strong>2 classes are on us</strong> — $150 of weekly drop-ins for $100. New here? Try one week for $25 and join the series anytime. Reschedule anytime if life moves — no refunds, full rescheduling to a future cohort.
          <br /><br />Questions first? <a href="mailto:chief@theedjusticecollective.com?subject=AI%20Daily%20Side-Kick%20%E2%80%94%20a%20few%20questions">Email the Chief</a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- LEADERS ---------------- */
function Leaders({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="offer-h">
      <div className="afr-wrap">
        <div className="afr-leaders-grid">
          <div>
            <p className="afr-eyebrow">For community leaders</p>
            <h2 className="afr-h2" id="offer-h">Teacher, counselor, family liaison, caregiver, or community leader?</h2>
            <p className="afr-sub">This resource is yours to share. No permission needed. Forward it. Print it. Post it. Build a session around it.</p>
            <div className="afr-leaders-actions">
              <Button variant="primary" href="share-kit.html">Get the share kit →</Button>
              <Button variant="secondary" href="mailto:chief@theedjusticecollective.com?subject=Bringing%20AI%20Family%20Room%20to%20my%20community">Email the Chief</Button>
            </div>
          </div>
          <aside className="afr-leaders-aside">
            <p className="q">Built for the people who hold communities together.</p>
            <p className="a">Copy-paste templates for school newsletters, group emails, and community posts — ready to send.</p>
            <p className="q">No cost. No catch.</p>
            <p className="a">Independent, free, and built to stay open. Bring it to a parent night, a unit meeting, a library hour.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function Faq({ bg }) {
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="faq-h">
      <div className="afr-wrap">
        <div className="afr-faq">
          <div className="afr-sect-head" style={{ marginBottom: 24 }}>
            <p className="afr-eyebrow">Frequent questions</p>
            <h2 className="afr-h2" id="faq-h">Quick answers.</h2>
          </div>
          {FAQ.map((f, i) => (
            <details key={i}>
              <summary>{f.q}<span className="pm">+</span></summary>
              <div className="afr-faq-body">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PASS ALONG ---------------- */
function PassAlong({ bg }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    const msg = 'Found a free site that actually teaches AI through real problems — school emails, moves, the hard conversations. No login, no data sold. → aifamilyroom.com';
    try {
      navigator.clipboard.writeText(msg).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2600); });
    } catch (e) { setCopied(true); setTimeout(() => setCopied(false), 2600); }
  };
  return (
    <section className={'afr-sect' + (bg ? ' off' : '')} aria-label="Share this room">
      <div className="afr-wrap">
        <div className="afr-pass-grid">
          <div className="afr-pass-card">
            <span className="ey">AI Family Room</span>
            <div className="hl">I am in the room.</div>
            <div className="url">aifamilyroom.com</div>
            <p className="tag">A free community resource. No login. No data sold. Built for families and folks who hold communities together.</p>
          </div>
          <div className="afr-pass-actions">
            <p className="afr-eyebrow">Pass it along</p>
            <h2 className="afr-h2" style={{ fontSize: 'calc(1.7rem * var(--afr-scale))' }}>Know someone who needs a door in?</h2>
            <p className="afr-sub" style={{ marginTop: 10 }}>Forward it to one person who has been meaning to figure this out.</p>
            <button className="afr-copybtn" onClick={copy}>{copied ? '✓ Copied — paste anywhere' : 'Copy a share message'}</button>
            <a className="afr-textlink" href="share-kit.html" style={{ marginTop: 4 }}>Get the share kit →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENTO HUB ---------------- */
function Bento({ bg }) {
  return (
    <section id="explore" className={'afr-sect' + (bg ? ' off' : '')} aria-labelledby="explore-h">
      <div className="afr-wrap">
        <div className="afr-sect-head">
          <p className="afr-eyebrow">The room at a glance</p>
          <h2 className="afr-h2" id="explore-h">Everything in one place. <span className="accent">Pick a door.</span></h2>
        </div>
        <div className="afr-bento">
          <div className="afr-bento-card bento-a">
            <p className="be">The offering</p>
            <h3 className="bt">A free room. No login, no paywall, no expiration.</h3>
            <p className="bd">Walk in, learn the skill, walk out with what you built. Start in your own language, with your own real problem — and leave with something you actually use.</p>
            <div className="bento-a-actions">
              <Button variant="primary" size="lg" href="start.html">Start in 60 seconds →</Button>
              <a className="afr-textlink" href="about.html">Why this room exists →</a>
            </div>
          </div>
          <a className="afr-bento-card bento-b" href="missions.html">
            <p className="be">Five tracks · 12 missions</p>
            <h3 className="bt">Pick your starting point</h3>
            <ul className="blist"><li>Foundations</li><li>Build</li><li>Parent Intel</li><li>Mil-Spouse</li><li>Next Mission</li></ul>
            <span className="bcta">See all 12 missions →</span>
          </a>
          <a className="afr-bento-card bento-c" href="tools.html">
            <p className="be">Your toolkit</p>
            <h3 className="bt">Three tools. Zero overwhelm.</h3>
            <p className="bd">Claude, NeuralWriter, and Gamma — free to start, no downloads.</p>
            <span className="bcta">Open the tools →</span>
          </a>
          <a className="afr-bento-card bento-d" href="missions.html">
            <p className="be">What you keep</p>
            <h3 className="bt">Real artifacts. Not theory.</h3>
            <p className="bd">The email that opens the door. The resume that translates the gap. The map for the hard meeting.</p>
            <span className="bcta">See what you build →</span>
          </a>
          <a className="afr-bento-card bento-e" href="safety.html">
            <p className="be">Stay safe</p>
            <h3 className="bt">Know what could go wrong.</h3>
            <p className="bd">Spot confident-but-wrong answers, protect your privacy, keep your family safe.</p>
            <span className="bcta">Read the safety guide →</span>
          </a>
          <a className="afr-bento-card bento-f" href="join.html">
            <p className="be">Stay in the loop</p>
            <h3 className="bt">Join the community</h3>
            <p className="bd">One welcome email, one tip a month. Optional — and we never sell your data.</p>
            <span className="bcta">Join the community →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CLOSING (faq + share + leaders) ---------------- */
function Closing({ bg }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    const msg = 'Found a free site that actually teaches AI through real problems — school emails, moves, the hard conversations. No login, no data sold. → aifamilyroom.com';
    try { navigator.clipboard.writeText(msg).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2600); }); }
    catch (e) { setCopied(true); setTimeout(() => setCopied(false), 2600); }
  };
  return (
    <section id="faq" className={'afr-sect' + (bg ? ' off' : '')} aria-label="Questions and sharing">
      <div className="afr-wrap">
        <div className="afr-closing-grid">
          <div className="afr-faq">
            <div className="afr-sect-head" style={{ marginBottom: 18 }}>
              <p className="afr-eyebrow">Frequent questions</p>
              <h2 className="afr-h2" id="faq-h">Quick answers.</h2>
            </div>
            {FAQ.map((f, i) => (
              <details key={i}><summary>{f.q}<span className="pm">+</span></summary><div className="afr-faq-body">{f.a}</div></details>
            ))}
          </div>
          <div className="afr-closing-right">
            <div className="afr-pass-card">
              <span className="ey">AI Family Room</span>
              <div className="hl">I am in the room.</div>
              <div className="url">aifamilyroom.com</div>
              <p className="tag">A free community resource. No login. No data sold.</p>
            </div>
            <button className="afr-copybtn" onClick={copy}>{copied ? '✓ Copied — paste anywhere' : 'Copy a share message'}</button>
            <div className="afr-leaders-mini">
              <p className="q">Teacher, counselor, caregiver, or community leader?</p>
              <p className="a">This resource is yours to share — no permission needed. Grab copy-paste templates for newsletters, group emails, and community posts.</p>
              <div className="afr-leaders-mini-actions">
                <Button variant="primary" href="share-kit.html">Get the share kit →</Button>
                <Button variant="secondary" href="mailto:chief@theedjusticecollective.com?subject=Bringing%20AI%20Family%20Room%20to%20my%20community">Email the Chief</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function SiteFooter() {
  const { DocFooter } = DS;
  return (
    <React.Fragment>
      <footer className="afr-footer" role="contentinfo">
        <div className="afr-wrap">
          <div className="afr-footer-grid">
            <div>
              <span className="afr-footer-logo">AI Family Room</span>
              <span className="afr-footer-tag">by EdJustice Collective</span>
              <p className="afr-footer-about">A free, self-guided AI literacy environment for families and the folks who hold communities together. Built on the belief that technology should amplify every voice — not just the ones with resources.</p>
            </div>
            <div>
              <span className="afr-footer-col-title">Learn</span>
              <ul className="afr-footer-links">
                <li><a href="start.html">Start Here</a></li>
                <li><a href="tools.html">The Tools</a></li>
                <li><a href="missions.html">All Missions</a></li>
                <li><a href="what-could-go-wrong.html">What Could Go Wrong</a></li>
                <li><a href="safety.html">Help &amp; safety</a></li>
                <li><a href="about.html">Why This Exists</a></li>
              </ul>
            </div>
            <div>
              <span className="afr-footer-col-title">Connect</span>
              <ul className="afr-footer-links">
                <li><a href="parents.html">Parent Intel</a></li>
                <li><a href="milspouse.html">Mil-Spouse Intel</a></li>
                <li><a href="progress.html">My Progress</a></li>
                <li><a href="join.html">Join the Community</a></li>
                <li><a href="share-kit.html">Share kit (for leaders)</a></li>
                <li><a href="https://theedjusticecollective.com" target="_blank" rel="noopener">EdJustice Collective ↗</a></li>
              </ul>
            </div>
          </div>
          <p className="afr-footer-privacy">We collect only what you choose to share. We never sell your data. Email <a href="mailto:chief@theedjusticecollective.com">chief@theedjusticecollective.com</a> to delete your info at any time.</p>
        </div>
      </footer>
      <DocFooter org="© 2026 EdJustice Collective" tagline="Build Systems. Promote Justice." contact="aifamilyroom.com" page={null} style={{ fontSize: 10, padding: 11 }} />
    </React.Fragment>
  );
}

Object.assign(window, { Nav, Hero, ChiefNote, Tracks, Artifacts, Tools, SideKick, Leaders, Faq, PassAlong, Bento, Closing, SiteFooter });
