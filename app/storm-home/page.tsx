import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Storm Damage AI — storm.unykorn.org',
  description: '24/7 AI-powered storm damage intake. Tornado, hail, wind, structural — call now, AI answers instantly and starts your claim.',
  openGraph: {
    title: 'Storm Damage AI — storm.unykorn.org',
    description: 'EF3 tornadoes. Baseball hail. Wind damage. Our AI answers every call 24/7 and starts your claim before you hang up.',
    url: 'https://storm.unykorn.org',
  },
};

const NUMBERS = [
  { vanity: '262-HAIL', full: '(262) 397-4245', href: 'tel:+12623974245', label: 'Hail Damage', hot: true },
  { vanity: '414-HAIL', full: '(414) 676-6337', href: 'tel:+14146766337', label: 'Hail Damage', hot: true },
  { vanity: '844-CLAIM', full: '(844) 725-2460', href: 'tel:+18447252460', label: 'Insurance Claims', hot: true },
  { vanity: '888-LAW-AI', full: '(888) 505-2924', href: 'tel:+18885052924', label: 'Tornado / Legal', hot: false },
  { vanity: '470-STORM', full: '(470) 787-6676', href: 'tel:+14702878676', label: 'Georgia Storm', hot: false },
  { vanity: '844-NEED-AI', full: '(844) 633-6333', href: 'tel:+18446336333', label: 'Universal', hot: false },
];

interface MktNum { num: string; tel: string; type: 'Local' | 'Toll-Free'; vertical: string; region: string; price: number; features: string[]; }
interface MktCat { id: string; icon: string; label: string; desc: string; accent: string; numbers: MktNum[]; }

const MARKETPLACE: MktCat[] = [
  {
    id: 'storm', icon: '🌦️', label: 'STORM Numbers', desc: 'Storm damage assessment and response hotlines', accent: 'text-orange-400',
    numbers: [
      { num: '213-423-7865', tel: '+12134237865', type: 'Local', vertical: 'Storm Damage', region: 'California', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '321-485-8333', tel: '+13214858333', type: 'Local', vertical: 'Storm Damage', region: 'Florida', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '321-559-0559', tel: '+13215590559', type: 'Local', vertical: 'Storm Damage', region: 'Florida', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '470-287-8676', tel: '+14702878676', type: 'Local', vertical: 'Storm Damage', region: 'Georgia', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '727-387-8676', tel: '+17273878676', type: 'Local', vertical: 'Storm Damage', region: 'Florida', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '786-677-8676', tel: '+17866778676', type: 'Local', vertical: 'Storm Damage', region: 'Florida', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '623-777-8676', tel: '+16237778676', type: 'Local', vertical: 'Storm Damage', region: 'Arizona', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '443-437-8657', tel: '+14434378657', type: 'Local', vertical: 'Storm Damage', region: 'Maryland', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '770-230-0635', tel: '+17702300635', type: 'Local', vertical: 'Storm Damage', region: 'Georgia', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '478-242-4246', tel: '+14782424246', type: 'Local', vertical: 'Storm Damage', region: 'Georgia', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
    ],
  },
  {
    id: 'hail', icon: '🌨️', label: 'HAIL Numbers', desc: 'Hail damage evaluation and claims assistance', accent: 'text-blue-400',
    numbers: [
      { num: '262-397-4245', tel: '+12623974245', type: 'Local', vertical: 'Hail Damage', region: 'Wisconsin', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '414-676-6337', tel: '+14146766337', type: 'Local', vertical: 'Hail Damage', region: 'Wisconsin', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '909-488-7663', tel: '+19094887663', type: 'Local', vertical: 'Hail Damage', region: 'California', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
      { num: '539-476-7663', tel: '+15394767663', type: 'Local', vertical: 'Hail Damage', region: 'Oklahoma', price: 199, features: ['Weather Activation', 'AI Intake', 'Local Routing'] },
    ],
  },
  {
    id: 'hvac', icon: '🔥', label: 'HVAC Numbers', desc: 'Emergency and scheduled HVAC service coordination', accent: 'text-red-400',
    numbers: [
      { num: '833-760-4328', tel: '+18337604328', type: 'Toll-Free', vertical: 'HVAC Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '833-602-4822', tel: '+18336024822', type: 'Toll-Free', vertical: 'HVAC Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '833-522-2653', tel: '+18335222653', type: 'Toll-Free', vertical: 'HVAC Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
    ],
  },
  {
    id: 'claims', icon: '📋', label: 'CLAIMS Numbers', desc: 'Insurance claims processing and support', accent: 'text-yellow-400',
    numbers: [
      { num: '877-570-9775', tel: '+18775709775', type: 'Toll-Free', vertical: 'Claims Processing', region: 'National', price: 349, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '844-725-2460', tel: '+18447252460', type: 'Toll-Free', vertical: 'Claims Processing', region: 'National', price: 349, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '855-706-2533', tel: '+18557062533', type: 'Toll-Free', vertical: 'Claims Processing', region: 'National', price: 349, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-712-0268', tel: '+18887120268', type: 'Toll-Free', vertical: 'Claims Processing', region: 'National', price: 349, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-681-2729', tel: '+18886812729', type: 'Toll-Free', vertical: 'Claims Processing', region: 'National', price: 349, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
    ],
  },
  {
    id: 'law', icon: '⚖️', label: 'LAW Numbers', desc: 'Legal intake and case qualification services', accent: 'text-purple-400',
    numbers: [
      { num: '888-505-2924', tel: '+18885052924', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '833-445-2924', tel: '+18334452924', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-649-0529', tel: '+18886490529', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-653-2529', tel: '+18886532529', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-763-1529', tel: '+18887631529', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-974-0529', tel: '+18889740529', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-643-0529', tel: '+18886430529', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-611-5384', tel: '+18886115384', type: 'Toll-Free', vertical: 'Legal Services', region: 'National', price: 399, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
    ],
  },
  {
    id: 'money', icon: '💰', label: 'MONEY Numbers', desc: 'Financial services and banking assistance', accent: 'text-green-400',
    numbers: [
      { num: '888-676-2825', tel: '+18886762825', type: 'Toll-Free', vertical: 'Financial Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-678-0645', tel: '+18886780645', type: 'Toll-Free', vertical: 'Financial Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '866-265-2924', tel: '+18662652924', type: 'Toll-Free', vertical: 'Financial Services', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
    ],
  },
  {
    id: 'need', icon: '🎯', label: 'NEED Numbers', desc: 'Universal intake for multi-vertical routing', accent: 'text-cyan-400',
    numbers: [
      { num: '912-910-6333', tel: '+19129106333', type: 'Local', vertical: 'Universal Intake', region: 'Georgia', price: 199, features: ['AI Intake', 'Local Routing'] },
      { num: '844-633-6333', tel: '+18446336333', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-855-0209', tel: '+18888550209', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-344-2825', tel: '+18883442825', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '888-474-8738', tel: '+18884748738', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '844-756-1580', tel: '+18447561580', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '844-967-4245', tel: '+18449674245', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '844-985-4245', tel: '+18449854245', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
      { num: '844-851-6334', tel: '+18448516334', type: 'Toll-Free', vertical: 'Universal Intake', region: 'National', price: 299, features: ['AI Intake', 'Local Routing', 'Toll-Free'] },
    ],
  },
];

const EVENT_TYPES = [
  { icon: '🌩️', type: 'Hail Damage', desc: 'Golf ball to baseball hail. AI documents size, impact areas, and starts adjuster scheduling.', cta: 'hail.unykorn.org', href: 'https://hail.unykorn.org' },
  { icon: '🌪️', type: 'Tornado / EF-Scale', desc: 'EF1–EF3 structural damage. AI captures path, structure type, and escalates to legal if denied.', cta: 'WI Campaign', href: '/storm/wisconsin' },
  { icon: '💨', type: 'Straight-Line Wind', desc: '60–100+ mph wind events. Roof blow-offs, tree impacts, siding loss — claim threshold met.', cta: '844-CLAIM', href: 'tel:+18447252460' },
  { icon: '🏠', type: 'Structural Emergency', desc: 'Compromised foundation, collapsed roof, unsafe structure. AI dispatches emergency response immediately.', cta: '844-NEED-AI', href: 'tel:+18446696333' },
];

const ACTIVE_EVENTS = [
  { state: 'WI', event: 'Wisconsin April 2026', detail: '17 counties · 2.75" hail · EF3', level: 'CRITICAL', href: '/storm/wisconsin' },
];

export default function StormHomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <a href="https://needai.unykorn.org" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">STORM<span className="text-red-400">AI</span></span>
            <span className="hidden sm:block text-xs text-white/40 border border-white/20 rounded px-2 py-0.5 uppercase tracking-widest">storm.unykorn.org</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <span className="text-red-400 font-semibold animate-pulse">WI APRIL 2026 ACTIVE</span>
            <Link href="/storm/wisconsin" className="hover:text-white transition">WI Campaign</Link>
            <a href="https://hail.unykorn.org" className="hover:text-white transition">hail.unykorn.org</a>
            <a href="https://needai.unykorn.org" className="hover:text-white transition">needai.unykorn.org</a>
          </nav>
          <a href="tel:+18446696333" className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition whitespace-nowrap">
            844-NEED-AI
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-red-900/10 blur-3xl rounded-full" />
          <div className="absolute top-20 left-0 w-[500px] h-[400px] bg-slate-700/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-16">

          {/* Active event banner */}
          {ACTIVE_EVENTS.map((ev) => (
            <Link key={ev.state} href={ev.href} className="block mb-8 bg-red-950/80 border border-red-500/50 hover:border-red-400 rounded-xl px-5 py-3 text-sm max-w-2xl transition">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-bold">{ev.level}</span>
                <span className="text-red-300 font-semibold">{ev.event} — {ev.detail}</span>
                <span className="text-red-400 font-bold ml-auto whitespace-nowrap">Open →</span>
              </div>
            </Link>
          ))}

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-4">Storm Damage AI</div>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
                Storm hit.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">We Answer.</span><br />
                24/7.
              </h1>
              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                Tornado, hail, wind, structural collapse — our AI intake picks up instantly, documents the event, starts the claim, and escalates to legal when needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/storm/wisconsin" className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2">
                  WI April 2026 Campaign
                </Link>
                <a href="tel:+18447252460" className="bg-white text-black font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition">844-CLAIM</a>
                <a href="tel:+18885052924" className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition border border-white/20">888-LAW-AI</a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/40">Storm Numbers — Live Now</span>
                <span className="text-xs text-green-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  All operational
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {NUMBERS.map((n) => (
                  <a key={n.vanity} href={n.href} className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition group">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.hot ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                      <div>
                        <div className="font-bold text-white group-hover:text-red-300 transition">{n.vanity}</div>
                        <div className="text-xs text-white/40">{n.full}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">{n.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3">Storm Event Coverage</div>
            <h2 className="text-3xl md:text-4xl font-black">Every event type. <span className="text-white/40">AI handles it.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {EVENT_TYPES.map((e) => (
              <div key={e.type} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition">
                <div className="text-4xl mb-4">{e.icon}</div>
                <h3 className="text-lg font-black mb-2">{e.type}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{e.desc}</p>
                <a href={e.href} className="text-sm text-red-400 font-bold hover:text-red-300 transition">{e.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PROCESS */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-3">AI Intake Process</div>
            <h2 className="text-3xl md:text-4xl font-black">Call. Document. Claim.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', icon: '📞', title: 'You Call', body: 'Any storm number. AI picks up in under 2 seconds — no hold music, no menu mazes.' },
              { n: '02', icon: '🤖', title: 'AI Documents', body: 'Event type, date, address, damage description, hail size, structural impact — all captured live.' },
              { n: '03', icon: '⚡', title: 'Claim Routed', body: 'Insurance claim started. Adjuster scheduled. Legal escalation if denied. Text confirmation sent.' },
            ].map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-xs text-red-400 font-bold uppercase tracking-widest mb-2">Step {s.n}</div>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE — hero */}
      <section id="marketplace" className="border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-6">
            <div className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-3">AI Phone Number Marketplace</div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              License programmable AI endpoints<br className="hidden md:block" />
              <span className="text-white/40"> that activate with weather events.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-6">Route qualified leads before your competition picks up the phone. 42 canonical numbers across 7 verticals.</p>
          </div>

          {/* Licensing plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: 'Local', price: '$199', period: '/mo', accent: 'border-white/20',
                features: ['Exclusive number usage', 'Weather-triggered activation', 'AI intake routing', 'Regional coverage'],
              },
              {
                name: 'Toll-Free', price: '$299–$399', period: '/mo', accent: 'border-orange-500/50 bg-orange-950/20',
                badge: 'Most Popular',
                features: ['National reach', 'Weather-triggered activation', 'AI intake routing', 'Overflow capacity', 'SMS follow-ups'],
              },
              {
                name: 'Enterprise', price: 'Custom', period: '', accent: 'border-white/10',
                features: ['White-label solution', 'Custom AI training', 'API integration', 'Dedicated support', 'Custom pricing'],
              },
            ].map((plan) => (
              <div key={plan.name} className={`relative bg-white/5 border rounded-2xl p-8 flex flex-col ${plan.accent}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-orange-500 text-white px-3 py-1 rounded-full font-bold whitespace-nowrap">{plan.badge}</div>
                )}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">{plan.name}</div>
                  <div className="text-3xl font-black">{plan.price}<span className="text-lg font-normal text-white/40">{plan.period}</span></div>
                </div>
                <ul className="space-y-2 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="mailto:license@needai.unykorn.org" className="block text-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition text-sm border border-white/10">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>

          {/* Category nav */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {MARKETPLACE.map((cat) => (
              <a key={cat.id} href={`#cat-${cat.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-sm font-semibold transition">
                <span>{cat.icon}</span><span className={cat.accent}>{cat.id.toUpperCase()}</span>
                <span className="text-white/30 text-xs">({cat.numbers.length})</span>
              </a>
            ))}
          </div>

          {/* Number grid by category */}
          <div className="space-y-14">
            {MARKETPLACE.map((cat) => (
              <div key={cat.id} id={`cat-${cat.id}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className={`text-xl font-black ${cat.accent}`}>{cat.label}</h3>
                    <p className="text-sm text-white/40">{cat.desc}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.numbers.map((n) => (
                    <div key={n.num} className="bg-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-5 flex flex-col transition group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-black text-lg text-white group-hover:text-white/90 tracking-wide">{n.num}</div>
                          <div className="text-xs text-white/30 mt-0.5">{n.region} Region</div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${n.type === 'Local' ? 'border-blue-500/40 text-blue-400 bg-blue-950/30' : 'border-orange-500/40 text-orange-400 bg-orange-950/30'}`}>
                          {n.type}
                        </span>
                      </div>
                      <div className="text-xs text-white/50 font-semibold mb-3">{n.vertical}</div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {n.features.map((f) => (
                          <span key={f} className="text-xs bg-white/5 border border-white/10 text-white/40 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="text-white font-black text-lg">${n.price}<span className="text-xs font-normal text-white/30">/mo</span></div>
                        <a href={`mailto:license@needai.unykorn.org?subject=License ${n.num}`}
                          className="text-xs font-bold bg-white text-black px-3 py-1.5 rounded-lg hover:bg-gray-100 transition whitespace-nowrap">
                          License Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE CTA */}
      <section className="border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to License a Number?</h2>
          <p className="text-white/50 mb-8">Turn weather events into qualified leads with AI-powered phone numbers.</p>
          <a href="mailto:license@needai.unykorn.org" className="inline-block bg-white text-black font-black px-10 py-4 rounded-xl text-lg hover:bg-gray-100 transition">
            Get Started
          </a>
        </div>
      </section>

      {/* CAMPAIGN LINKS */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/storm/wisconsin" className="group bg-gradient-to-br from-red-950 to-slate-900 border border-red-500/30 hover:border-red-500/60 rounded-2xl p-8 transition block relative overflow-hidden">
              <div className="absolute top-3 right-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE NOW</div>
              <div className="text-5xl mb-4">🌪️</div>
              <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">Wisconsin April 2026</div>
              <h3 className="text-2xl font-black mb-3">Active Storm Campaign</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">17 counties. 2.75" hail. EF3 corridors. 5 numbers routing right now.</p>
              <div className="text-orange-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Open campaign →</div>
            </Link>
            <a href="https://hail.unykorn.org" className="group bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 hover:border-blue-500/40 rounded-2xl p-8 transition block">
              <div className="text-5xl mb-4">🌩️</div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">hail.unykorn.org</div>
              <h3 className="text-2xl font-black mb-3">Hail Damage HQ</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Hail size guide, claim process, consumer alerts. 262-HAIL and 414-HAIL.</p>
              <div className="text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Visit hail site →</div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-900/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Storm happened.<br /><span className="text-red-400">Call now.</span></h2>
          <p className="text-white/50 text-lg mb-10">AI picks up instantly. Claim documented in real time. No hold music, no call centers, no waiting.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+12623974245" className="bg-white text-black font-black px-8 py-4 rounded-xl text-xl hover:bg-gray-100 transition">262-HAIL</a>
            <a href="tel:+18447252460" className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-red-500 transition">844-CLAIM</a>
            <a href="tel:+18885052924" className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-white/20 transition border border-white/20">888-LAW-AI</a>
            <a href="tel:+18446336333" className="bg-white/5 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-white/10 transition border border-white/10">844-NEED-AI</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div>
            <span className="font-black text-white/60">STORMAI</span>
            <span> · storm.unykorn.org</span>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="https://needai.unykorn.org" className="hover:text-white/60 transition">needai.unykorn.org</a>
            <a href="https://hail.unykorn.org" className="hover:text-white/60 transition">hail.unykorn.org</a>
            <Link href="/storm/wisconsin" className="hover:text-white/60 transition">WI Campaign</Link>
            <a href="#marketplace" className="hover:text-white/60 transition">Marketplace</a>
            <Link href="/blog" className="hover:text-white/60 transition">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
