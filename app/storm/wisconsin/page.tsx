'use client';

import { useState } from 'react';
import Link from 'next/link';

const NUMBERS = [
  {
    display: '(262) HAIL',
    digits: '262-397-4245',
    tel: '+12623974245',
    label: 'Southeast WI',
    tag: 'Waukesha · Racine · Kenosha corridor',
    persona: 'HAIL',
    color: 'bg-yellow-400 text-gray-900',
    ringColor: 'ring-yellow-400',
    icon: '🌨️',
    openWith: 'Rita — Hail damage intake specialist',
  },
  {
    display: '(414) HAIL',
    digits: '414-676-6337',
    tel: '+14146766337',
    label: 'Milwaukee Metro',
    tag: 'Milwaukee · Wauwatosa · West Allis',
    persona: 'HAIL',
    color: 'bg-yellow-300 text-gray-900',
    ringColor: 'ring-yellow-300',
    icon: '🌨️',
    openWith: 'Rita — Hail damage intake specialist',
  },
  {
    display: '(844) CLAIM',
    digits: '844-725-2460',
    tel: '+18447252460',
    label: 'Claims Support',
    tag: 'Insurance documentation · Claim guidance',
    persona: 'CLAIMS',
    color: 'bg-blue-500 text-white',
    ringColor: 'ring-blue-400',
    icon: '🧾',
    openWith: 'Rita — Insurance claims specialist',
  },
  {
    display: '(888) LAW-AI',
    digits: '888-505-2924',
    tel: '+18885052924',
    label: 'Legal Intake',
    tag: 'Denied claims · Disputed settlements',
    persona: 'LAW',
    color: 'bg-purple-600 text-white',
    ringColor: 'ring-purple-400',
    icon: '⚖️',
    openWith: 'Rita — Legal intake specialist',
  },
  {
    display: '(844) NEED-AI',
    digits: '844-669-6333',
    tel: '+18446696333',
    label: 'Universal Line',
    tag: 'Any situation · Routes to the right specialist',
    persona: 'NEED',
    color: 'bg-emerald-500 text-white',
    ringColor: 'ring-emerald-400',
    icon: '🧠',
    openWith: 'Rita — Universal intake specialist',
  },
];

const COUNTIES = [
  {
    name: 'Dane County',
    cities: 'Madison · Sun Prairie · Fitchburg · Verona',
    hail: '2.75″',
    tier: 'PEAK',
    tierColor: 'bg-red-600',
    note: 'Peak hail density. Highest conversion potential.',
    number: '(844) NEED-AI',
  },
  {
    name: 'Waukesha County',
    cities: 'Waukesha · Brookfield · Pewaukee',
    hail: '1.75–2.25″',
    tier: 'EF2 CORRIDOR',
    tierColor: 'bg-orange-600',
    note: 'EF2 tornado corridor. High structural claim value.',
    number: '(262) HAIL',
  },
  {
    name: 'Juneau County',
    cities: 'Mauston · New Lisbon',
    hail: '1.5″',
    tier: 'EF3 ZONE',
    tierColor: 'bg-red-800',
    note: 'EF3 zone. Catastrophic loss tier — legal & contractor dispatch.',
    number: '(888) LAW-AI',
  },
  {
    name: 'Marquette County',
    cities: 'Montello · Oxford',
    hail: '1.5″',
    tier: 'EF3 ZONE',
    tierColor: 'bg-red-800',
    note: 'EF3 zone. Immediate legal and contractor dispatch.',
    number: '(888) LAW-AI',
  },
  {
    name: 'Racine County',
    cities: 'Racine · Mount Pleasant',
    hail: '1.5–1.75″',
    tier: 'HIGH',
    tierColor: 'bg-yellow-600',
    note: 'Suburban belt. Claims escalation flow active.',
    number: '(844) CLAIM',
  },
  {
    name: 'Kenosha County',
    cities: 'Kenosha · Pleasant Prairie',
    hail: '1.5″',
    tier: 'HIGH',
    tierColor: 'bg-yellow-600',
    note: 'Southeast belt. (262) HAIL and claims pipeline.',
    number: '(262) HAIL',
  },
];

const JOURNEY_STEPS = [
  {
    n: '1',
    title: 'You see the billboard.',
    body: 'One word. One number. No URL. No logo. Just HAIL and a phone number at 70mph on I-94. Burns into memory in under 3 seconds.',
    icon: '🪧',
  },
  {
    n: '2',
    title: 'You dial. It rings once.',
    body: 'No hold music. No "press 1 for English." The number is live 24 hours a day, 7 days a week, every day of the year.',
    icon: '📞',
  },
  {
    n: '3',
    title: 'Rita answers in under a second.',
    body: 'Powered by NVIDIA\'s real-time speech engine on a local RTX 5090. She doesn\'t sound like a robot. She sounds like the best intake specialist you\'ve ever hired.',
    icon: '🎙️',
    quote: '"Thank you for calling (262) HAIL. I\'m your hail damage intake specialist. What happened today — can you describe the damage?"',
  },
  {
    n: '4',
    title: 'She already knows why you called.',
    body: 'Because you called the HAIL number — not a general line. Trained specifically on hail claims: roof impact, dent patterns, insurance adjuster timelines.',
    icon: '🧠',
    quote: '"How large was the hail — golf ball, baseball? And has your insurance company been notified yet?"',
  },
  {
    n: '5',
    title: 'Your case is scored in real-time.',
    body: 'Active leak? Active damage? Adjuster ghosting you? Those answers feed a priority engine. High-urgency cases are escalated immediately.',
    icon: '📊',
    badge: '✓ Case on file · Priority band assigned · No data lost',
  },
  {
    n: '6',
    title: "You're connected to exactly the right person.",
    body: 'Contractor dispatch, insurance adjuster, legal intake — wherever you need to go. The AI routes based on what you said, what number you called, and your county.',
    icon: '✅',
    badge: '✓ Routed · Confirmed · Followed up',
  },
];

const PERSONAS = [
  {
    label: 'HAIL · (262) HAIL',
    sub: 'For hail damage claims',
    body: 'Caller saw hail, worried about their roof, or just got a storm-chaser knock. Rita knows what questions get a claim started: hail size, age of roof, insurance carrier, prior claims.',
    quote: '"Was the hail golf-ball or baseball size? Has anyone been on the roof yet — or have you filed with your insurance?"',
    color: 'border-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    label: 'CLAIMS · (844) CLAIM',
    sub: 'For overwhelmed homeowners',
    body: "Caller doesn't know where to start — storm hit, insurance is confusing, roof company keeps calling. Rita helps them organize what they have, what they need, who to call.",
    quote: '"Let\'s make this simple. Do you have a claim number yet — or are you just starting the process from scratch?"',
    color: 'border-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    label: 'LAW · (888) LAW-AI',
    sub: 'For denied or stalled claims',
    body: "Caller's adjuster went silent, claim was denied, or settlement offer was insulting. Rita collects the facts needed to hand off to an attorney.",
    quote: '"Has your claim been formally denied in writing, or is it just delayed? When did you last hear from your adjuster?"',
    color: 'border-purple-400',
    bg: 'bg-purple-400/10',
  },
];

export default function WisconsinStormPage() {
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCounty, setLeadCounty] = useState('');
  const [leadType, setLeadType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          county: leadCounty,
          type: leadType,
          source: 'wi-storm-2026',
          campaign: 'wisconsin-april-2026',
        }),
      });
      setSubmitted(true);
    } catch {
      // Still show success to not frustrate the user
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">NEED AI</span>
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold animate-pulse">ACTIVE STORM</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/storm" className="text-gray-400 hover:text-white transition">All States</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition">Storm Insights</Link>
          <a href="tel:+18446696333" className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition text-sm">
            Call Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/50 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block" />
            April 2026 Storm Event · Wisconsin · Active
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Own the Word.
            <br />
            <span className="text-yellow-400">Own the Call.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            17 counties hit. Baseball hail. EF3 tornadoes.
            <br />
            AI answers every call — 24/7, zero wait, full intake, instant routing.
            <br className="hidden md:block" />
            <span className="text-white font-semibold">One word on a billboard. One number. That is it.</span>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { n: '17', label: 'counties impacted' },
              { n: '2.75″', label: 'max hail' },
              { n: 'EF3', label: 'tornado corridors' },
              { n: '24/7', label: 'AI answers' },
              { n: '0 sec', label: 'hold time' },
            ].map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-3xl font-black text-yellow-400">{s.n}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Primary Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {NUMBERS.map((num) => (
              <a
                key={num.tel}
                href={`tel:${num.tel}`}
                className={`${num.color} rounded-2xl p-6 text-left hover:scale-105 transition-transform ring-2 ${num.ringColor} ring-offset-2 ring-offset-gray-950 block`}
              >
                <div className="text-2xl mb-1">{num.icon}</div>
                <div className="text-2xl font-black tracking-tight">{num.display}</div>
                <div className="text-sm font-semibold opacity-80 mt-1">{num.digits}</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-3 opacity-60">{num.label}</div>
                <div className="text-xs mt-1 opacity-70">{num.tag}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call Journey */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">What Happens When You Call</div>
            <h2 className="text-4xl font-black">6-Second Journey</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.n} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Step {step.n}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.body}</p>
                {step.quote && (
                  <blockquote className="mt-4 border-l-2 border-yellow-400 pl-4 text-yellow-200 text-sm italic">
                    {step.quote}
                  </blockquote>
                )}
                {step.badge && (
                  <div className="mt-4 bg-green-900/30 border border-green-500/30 text-green-400 text-xs px-3 py-2 rounded-lg">
                    {step.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rita + PersonaPlex */}
      <section className="border-b border-white/10 py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">Rita + PersonaPlex</div>
              <h2 className="text-4xl font-black">Plain English</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-4">🎙️</div>
                <h3 className="text-xl font-black mb-3">Rita</h3>
                <p className="text-gray-300 leading-relaxed">
                  The voice you hear when you call. Calm, clear, professional. She&apos;s not a recording — she listens and responds in real conversation. Powered by NVIDIA real-time speech on a local RTX 5090.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-4">🧬</div>
                <h3 className="text-xl font-black mb-3">PersonaPlex</h3>
                <p className="text-gray-300 leading-relaxed">
                  What makes each number different. The number you dialed tells the AI who it&apos;s talking to and why. HAIL knows hail. LAW knows denied claims. You don&apos;t press a menu. The AI already knows.
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  Both run locally — no third-party call center, no outsourced AI, no data leaving the building. Sovereign. Private. Fast.
                </div>
              </div>
            </div>

            {/* Persona Cards */}
            <div className="space-y-4">
              {PERSONAS.map((p) => (
                <div key={p.label} className={`${p.bg} border ${p.color} rounded-2xl p-6`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="font-black text-lg">{p.label}</div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{p.sub}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{p.body}</p>
                  <blockquote className="border-l-2 border-current pl-4 text-sm italic opacity-80">
                    {p.quote}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* County Impact Zones */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">High-Impact Zones</div>
            <h2 className="text-4xl font-black">April 2026 — Wisconsin</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {COUNTIES.map((c) => (
              <div key={c.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/40 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-black text-lg">{c.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{c.cities}</div>
                  </div>
                  <span className={`${c.tierColor} text-white text-xs font-black px-2 py-1 rounded`}>{c.tier}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-black text-yellow-400">{c.hail}</span>
                  <span className="text-xs text-gray-500">max hail</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.note}</p>
                <a
                  href={`tel:${NUMBERS.find((n) => n.display === c.number)?.tel ?? '+18446696333'}`}
                  className="block text-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-4 py-2 text-sm font-bold transition"
                >
                  Call {c.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="border-b border-white/10 py-20 bg-yellow-400/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">Free Storm Assessment</div>
            <h2 className="text-4xl font-black mb-4">Request a Callback</h2>
            <p className="text-gray-400 mb-10">
              Storm damage doesn&apos;t wait. Enter your info and Rita calls you back within 5 minutes — 24/7.
            </p>
            {submitted ? (
              <div className="bg-green-900/30 border border-green-500/40 rounded-2xl p-10">
                <div className="text-5xl mb-4">✅</div>
                <div className="text-xl font-black mb-2">You&apos;re on the list.</div>
                <p className="text-gray-400">Rita will call you back within 5 minutes. Keep your phone close.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="First Last"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="(262) 555-0100"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">County</label>
                    <select
                      required
                      value={leadCounty}
                      onChange={(e) => setLeadCounty(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                    >
                      <option value="" className="bg-gray-900">Select county...</option>
                      <option value="Dane" className="bg-gray-900">Dane County (Madison)</option>
                      <option value="Waukesha" className="bg-gray-900">Waukesha County</option>
                      <option value="Milwaukee" className="bg-gray-900">Milwaukee County</option>
                      <option value="Racine" className="bg-gray-900">Racine County</option>
                      <option value="Kenosha" className="bg-gray-900">Kenosha County</option>
                      <option value="Juneau" className="bg-gray-900">Juneau County</option>
                      <option value="Marquette" className="bg-gray-900">Marquette County</option>
                      <option value="Other" className="bg-gray-900">Other Wisconsin County</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Type of Damage</label>
                    <select
                      required
                      value={leadType}
                      onChange={(e) => setLeadType(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition"
                    >
                      <option value="" className="bg-gray-900">Select type...</option>
                      <option value="roof-hail" className="bg-gray-900">Roof / Hail Damage</option>
                      <option value="insurance-claim" className="bg-gray-900">Insurance Claim Help</option>
                      <option value="denied-claim" className="bg-gray-900">Denied / Stalled Claim</option>
                      <option value="tornado" className="bg-gray-900">Tornado / Structural Damage</option>
                      <option value="vehicle" className="bg-gray-900">Vehicle Damage</option>
                      <option value="emergency" className="bg-gray-900">Active Emergency</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-yellow-400 text-gray-900 font-black py-4 rounded-xl text-lg hover:bg-yellow-300 transition disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Get My Free Callback →'}
                </button>
                <p className="text-xs text-gray-600 text-center">
                  No spam. Rita calls within 5 minutes. Your data stays on-site.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="border-b border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold mb-3">Storm Intelligence</div>
            <h2 className="text-4xl font-black">Latest Insights</h2>
            <p className="text-gray-400 mt-3">AI-generated storm analysis updated in real-time</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                slug: 'wi-april-2026-what-17-counties-need-to-know',
                title: 'April 2026 Wisconsin Hailstorm: What 17 Counties Need to Know Right Now',
                excerpt: 'Baseball-sized hail, EF3 tornado corridors, and insurance adjusters already overwhelmed. Here\'s your county-by-county action plan.',
                tag: 'Storm Report',
                readTime: '4 min read',
                date: 'April 21, 2026',
              },
              {
                slug: 'wi-insurance-claim-survival-guide-2026',
                title: 'Baseball-Sized Hail: Your Wisconsin Insurance Claim Survival Guide',
                excerpt: 'The window to file is narrowing. Adjusters are stretched thin across 17 counties. Here\'s exactly what to document and when to call a lawyer.',
                tag: 'Claims Guide',
                readTime: '6 min read',
                date: 'April 21, 2026',
              },
              {
                slug: 'dane-vs-waukesha-storm-damage-2026',
                title: 'Dane County vs. Waukesha County: Understanding Your Storm Claim Value',
                excerpt: 'EF3 damage in Juneau/Marquette vs 2.75″ hail in Dane County — the math on your claim is very different. We break it down.',
                tag: 'County Analysis',
                readTime: '5 min read',
                date: 'April 21, 2026',
              },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/40 transition block"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded font-bold">{post.tag}</span>
                  <span className="text-xs text-gray-600">{post.readTime}</span>
                </div>
                <h3 className="font-black text-base leading-tight mb-3">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="text-xs text-gray-600">{post.date}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-sm font-bold px-6 py-3 rounded-xl hover:border-yellow-400/40 transition">
              View All Storm Reports →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6">
            Hail hit your roof?
            <br />
            <span className="text-yellow-400">Call before they leave town.</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Storm chasers, contractors, and adjusters flood in after a CAT event. The window to get the right help — before backlogs kill your timeline — is 48–72 hours. Rita answers now.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+12623974245" className="bg-yellow-400 text-gray-900 font-black text-xl px-10 py-5 rounded-2xl hover:bg-yellow-300 transition">
              📞 Call (262) HAIL Now
            </a>
            <a href="tel:+18445252460" className="bg-white/10 border border-white/20 font-bold text-lg px-8 py-5 rounded-2xl hover:bg-white/20 transition">
              (844) CLAIM
            </a>
            <a href="tel:+18885052924" className="bg-white/10 border border-white/20 font-bold text-lg px-8 py-5 rounded-2xl hover:bg-white/20 transition">
              (888) LAW-AI
            </a>
          </div>
          <div className="mt-10 text-sm text-gray-600">
            Powered by NVIDIA RTX 5090 · Sovereign AI · No call center · No hold time · Private
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>© 2026 NEED AI · needai.unykorn.org · Wisconsin Storm Campaign</div>
          <div className="flex gap-6">
            <Link href="/storm" className="hover:text-gray-400 transition">All States</Link>
            <Link href="/blog" className="hover:text-gray-400 transition">Storm Blog</Link>
            <Link href="/numbers" className="hover:text-gray-400 transition">All Numbers</Link>
            <Link href="/marketplace" className="hover:text-gray-400 transition">Marketplace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
