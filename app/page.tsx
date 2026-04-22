'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const STATS = [
  { value: '42', label: 'Vanity Numbers', color: 'text-blue-400' },
  { value: '17', label: 'WI Counties Active', color: 'text-red-400' },
  { value: '24/7', label: 'AI Answering', color: 'text-green-400' },
  { value: '5', label: 'AI Personas Live', color: 'text-yellow-400' },
];

const ACTIVE_NUMBERS = [
  { vanity: '262-HAIL', full: '(262) 397-4245', persona: 'HAIL AI', region: 'SE Wisconsin', href: 'tel:+12623974245', hot: true },
  { vanity: '414-HAIL', full: '(414) 676-6337', persona: 'HAIL AI', region: 'Milwaukee', href: 'tel:+14146766337', hot: true },
  { vanity: '844-CLAIM', full: '(844) 725-2460', persona: 'CLAIMS AI', region: 'National', href: 'tel:+18447252460', hot: true },
  { vanity: '888-LAW-AI', full: '(888) 505-2924', persona: 'LAW AI', region: 'National', href: 'tel:+18885052924', hot: true },
  { vanity: '844-NEED-AI', full: '(844) 669-6333', persona: 'Universal', region: 'National', href: 'tel:+18446696333', hot: false },
  { vanity: '470-STORM', full: '(470) 786-7676', persona: 'STORM AI', region: 'Georgia', href: 'tel:+14702878676', hot: false },
  { vanity: '888-HVAC-NOW', full: '(888) 482-2669', persona: 'HVAC AI', region: 'National', href: 'tel:+18884822669', hot: false },
  { vanity: '888-LAW-NOW', full: '(888) 529-6669', persona: 'LAW AI', region: 'National', href: 'tel:+18885296669', hot: false },
];

const PERSONAS = [
  {
    icon: '🌩️',
    name: 'HAIL AI',
    tagline: 'Baseball hail. 17 counties. EF3 corridors.',
    description: 'Qualifies roof damage, documents hail size, books adjuster appointments. Escalates to LAW for denied claims.',
    color: 'from-slate-700 to-slate-900',
    badge: 'ACTIVE STORM',
    badgeColor: 'bg-red-500',
    cta: '/storm/wisconsin',
    ctaLabel: 'Wisconsin Campaign',
  },
  {
    icon: '⚖️',
    name: 'LAW AI',
    tagline: 'Legal screening at the speed of AI.',
    description: 'Pre-qualifies injury, accident, and property damage matters. Collects case facts, assesses merit, routes to attorney partners.',
    color: 'from-blue-800 to-blue-950',
    badge: 'ALWAYS ON',
    badgeColor: 'bg-blue-500',
    cta: '/law',
    ctaLabel: 'Legal Intake',
  },
  {
    icon: '🧾',
    name: 'CLAIMS AI',
    tagline: 'Insurance evidence capture, automated.',
    description: 'Walks callers through documentation, tracks insurer responses, and triggers follow-up sequences until claims are resolved.',
    color: 'from-purple-800 to-purple-950',
    badge: 'ALWAYS ON',
    badgeColor: 'bg-purple-500',
    cta: '/claims',
    ctaLabel: 'Claims Center',
  },
  {
    icon: '🌡️',
    name: 'HVAC AI',
    tagline: 'No heat. No AC. Dispatched in 90 seconds.',
    description: 'Triage heating and cooling emergencies, qualify service zip codes, route to available techs, confirm appointment windows.',
    color: 'from-orange-700 to-red-800',
    badge: 'ALWAYS ON',
    badgeColor: 'bg-orange-500',
    cta: '/hvac',
    ctaLabel: 'HVAC Dispatch',
  },
];

const BLOG_PREVIEW = [
  { slug: 'wi-april-2026-what-17-counties-need-to-know', title: '17-County Wisconsin Storm — What You Need to Do Now', date: 'April 21, 2026', tag: 'WI ACTIVE' },
  { slug: 'wi-insurance-claim-survival-guide-2026', title: 'Baseball Hail Claim Survival Guide — 2026', date: 'April 21, 2026', tag: 'INSURANCE' },
  { slug: 'wi-storm-chasers-what-to-watch-out-for', title: 'Storm Chasers in Wisconsin — Consumer Alert', date: 'April 21, 2026', tag: 'ALERT' },
];

export default function Home() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">NEED<span className="text-blue-400">AI</span></span>
            <span className="hidden sm:block text-xs text-white/40 border border-white/20 rounded px-2 py-0.5 uppercase tracking-widest">unykorn.org</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/storm/wisconsin" className="text-red-400 font-semibold animate-pulse">⚡ WI STORM LIVE</Link>
            <Link href="/numbers" className="hover:text-white transition">Numbers</Link>
            <Link href="/blog" className="hover:text-white transition">Storm Intel</Link>
            <a href="https://hail.unykorn.org" className="hover:text-white transition">Hail</a>
            <a href="https://storm.unykorn.org" className="hover:text-white transition">Storm</a>
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
          </nav>
          <a
            href="tel:+18446696333"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            📞 844-NEED-AI
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-3xl rounded-full" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-red-600/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16">
          <div className="mb-8 inline-flex items-center gap-3 bg-red-950/80 border border-red-500/50 rounded-full px-5 py-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 relative" />
            <span className="text-red-300 font-semibold">ACTIVE EVENT — Wisconsin April 2026 Storm · 17 Counties · EF3 Confirmed</span>
            <Link href="/storm/wisconsin" className="text-red-400 underline hover:text-red-300 font-bold">View Campaign →</Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
                AI Phones That<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Close While</span><br />
                You Sleep.
              </h1>
              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                42 premium vanity numbers. 5 purpose-built AI personas. Storm damage, legal intake, insurance claims, HVAC dispatch — answered, qualified, and routed 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/storm/wisconsin" className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2">
                  ⚡ Wisconsin Storm Campaign
                </Link>
                <Link href="/numbers" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition border border-white/20">
                  See All 42 Numbers
                </Link>
                <Link href="/blog" className="bg-white/5 hover:bg-white/10 text-white/70 font-semibold px-6 py-3 rounded-xl transition border border-white/10">
                  Storm Intel →
                </Link>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/40">Live Active Numbers</span>
                <span className="text-xs text-green-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  All systems operational
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {ACTIVE_NUMBERS.map((n) => (
                  <a key={n.vanity} href={n.href} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition group">
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.hot ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                      <div>
                        <div className="font-bold text-white group-hover:text-blue-300 transition">{n.vanity}</div>
                        <div className="text-xs text-white/40">{n.full}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60 font-medium">{n.persona}</div>
                      <div className="text-xs text-white/30">{n.region}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="border-t border-white/10 px-5 py-3">
                <Link href="/numbers" className="text-xs text-blue-400 hover:text-blue-300 transition">View all 42 numbers →</Link>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-center">
                <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE STORM SPOTLIGHT */}
      <section className="border-b border-white/10 bg-gradient-to-r from-red-950/40 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 relative" />
            <span className="text-xs uppercase tracking-widest text-red-400 font-semibold">Active Storm Event</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                Wisconsin<br />
                <span className="text-red-400">April 2026</span><br />
                Storm Event
              </h2>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                17 counties. Baseball-size hail (2.75&quot;). EF3 tornado corridors in Juneau and Marquette. All 5 Wisconsin numbers active, routing to HAIL, CLAIMS, and LAW personas.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: '17 Counties', color: 'text-red-400 border-red-500/30 bg-red-950/40' },
                  { label: '2.75" Hail', color: 'text-orange-400 border-orange-500/30 bg-orange-950/40' },
                  { label: 'EF3 Confirmed', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-950/40' },
                  { label: '5 Numbers Active', color: 'text-green-400 border-green-500/30 bg-green-950/40' },
                ].map((b) => (
                  <span key={b.label} className={`text-sm font-semibold border rounded-full px-3 py-1 ${b.color}`}>{b.label}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+12623974245" className="bg-white text-black font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition text-lg">📞 262-HAIL</a>
                <a href="tel:+14146766337" className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition border border-white/20">414-HAIL</a>
                <Link href="/storm/wisconsin" className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-500 transition">Full Campaign →</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { county: 'Waukesha', damage: 'EF2 + Baseball Hail', level: 'CRITICAL' },
                { county: 'Dane', damage: 'Baseball Hail · 2.75"', level: 'SEVERE' },
                { county: 'Juneau', damage: 'EF3 Path', level: 'CRITICAL' },
                { county: 'Marquette', damage: 'EF3 Corridor', level: 'CRITICAL' },
                { county: 'Racine', damage: 'Golf Ball Hail', level: 'HIGH' },
                { county: 'Kenosha', damage: 'Roof Damage', level: 'HIGH' },
              ].map((c) => (
                <div key={c.county} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="font-bold text-white text-sm">{c.county} Co.</div>
                  <div className="text-xs text-white/50 mt-0.5">{c.damage}</div>
                  <div className={`text-xs font-bold mt-1.5 ${c.level === 'CRITICAL' ? 'text-red-400' : c.level === 'SEVERE' ? 'text-orange-400' : 'text-yellow-400'}`}>{c.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI PERSONAS */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">AI Personas</div>
            <h2 className="text-4xl md:text-5xl font-black">Built for the call. <span className="text-white/40">Not the demo.</span></h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Each persona has a specific intake mission — no generic bots, no wasted calls.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PERSONAS.map((p) => (
              <div key={p.name} className={`relative bg-gradient-to-br ${p.color} rounded-2xl p-6 border border-white/10 flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{p.icon}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.badgeColor} text-white`}>{p.badge}</span>
                </div>
                <h3 className="text-xl font-black mb-1">{p.name}</h3>
                <p className="text-sm text-white/60 font-medium mb-3">{p.tagline}</p>
                <p className="text-sm text-white/50 leading-relaxed flex-1">{p.description}</p>
                <Link href={p.cta} className="mt-5 text-sm font-bold text-white/80 hover:text-white transition flex items-center gap-1">
                  {p.ctaLabel} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-3">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-black">Call comes in. <span className="text-white/40">Lead comes out.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📞', title: 'Vanity Number Rings', desc: 'Caller dials 262-HAIL, 888-LAW-AI, or any of 42 numbers' },
              { step: '02', icon: '🤖', title: 'AI Persona Answers', desc: 'Matched persona picks up instantly — no hold music, no humans needed' },
              { step: '03', icon: '🎯', title: 'Qualified Lead Created', desc: 'Name, callback, damage type, timeline — structured and stored in your dashboard' },
            ].map((item) => (
              <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-2">Step {item.step}</div>
                <div className="font-bold text-white text-lg mb-3">{item.title}</div>
                <div className="text-sm text-white/50 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBDOMAINS */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-3">Campaign Sites</div>
            <h2 className="text-4xl md:text-5xl font-black">Dedicated domains for <span className="text-purple-400">every vertical.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://hail.unykorn.org" className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 transition block">
              <div className="text-5xl mb-4">🌩️</div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">hail.unykorn.org</div>
              <h3 className="text-2xl font-black mb-3">Hail Damage HQ</h3>
              <p className="text-white/50 text-sm leading-relaxed">Real-time hail event tracking, AI intake, and insurance claim resources for property owners across active zones.</p>
              <div className="mt-5 text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Visit site →</div>
            </a>
            <a href="https://storm.unykorn.org" className="group bg-gradient-to-br from-red-950 to-slate-900 border border-white/10 hover:border-red-500/50 rounded-2xl p-8 transition block">
              <div className="text-5xl mb-4">⛈️</div>
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2">storm.unykorn.org</div>
              <h3 className="text-2xl font-black mb-3">Storm Command</h3>
              <p className="text-white/50 text-sm leading-relaxed">24/7 storm damage response — EF-scale tornadoes, wind damage, structural emergencies. AI dispatch + legal escalation.</p>
              <div className="mt-5 text-red-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Visit site →</div>
            </a>
            <Link href="/storm/wisconsin" className="group bg-gradient-to-br from-orange-950 to-slate-900 border border-red-500/30 hover:border-red-500/60 rounded-2xl p-8 transition relative overflow-hidden block">
              <div className="absolute top-3 right-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE NOW</div>
              <div className="text-5xl mb-4">🌪️</div>
              <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">needai.unykorn.org/storm/wisconsin</div>
              <h3 className="text-2xl font-black mb-3">WI April 2026</h3>
              <p className="text-white/50 text-sm leading-relaxed">Active campaign. 17 counties. Baseball hail. EF3 paths. All 5 Wisconsin numbers live now.</p>
              <div className="mt-5 text-orange-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Open campaign →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-semibold mb-2">Storm Intelligence</div>
              <h2 className="text-3xl font-black">What property owners need to know.</h2>
            </div>
            <Link href="/blog" className="text-sm text-white/50 hover:text-white transition hidden md:block">All articles →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_PREVIEW.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-6 transition block">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-red-950 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">{post.tag}</span>
                  <span className="text-xs text-white/30">{post.date}</span>
                </div>
                <h3 className="font-bold text-white group-hover:text-blue-300 transition leading-snug">{post.title}</h3>
                <div className="mt-4 text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">Read article →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Storm happened.<br /><span className="text-blue-400">Call us now.</span></h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">AI picks up instantly. Your information is collected and routed to the right specialist before the call ends.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+12623974245" className="bg-white text-black font-black px-8 py-4 rounded-xl text-xl hover:bg-gray-100 transition">📞 262-HAIL</a>
            <a href="tel:+14146766337" className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-white/20 transition border border-white/20">414-HAIL</a>
            <a href="tel:+18447252460" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-500 transition">844-CLAIM</a>
            <a href="tel:+18885052924" className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-white/20 transition border border-white/20">888-LAW-AI</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <span className="font-black text-white/60">NEEDAI</span>
            <span>· needai.unykorn.org</span>
          </div>
          <div className="flex gap-6">
            <Link href="/storm/wisconsin" className="hover:text-white/60 transition">Wisconsin Storm</Link>
            <a href="https://hail.unykorn.org" className="hover:text-white/60 transition">hail.unykorn.org</a>
            <a href="https://storm.unykorn.org" className="hover:text-white/60 transition">storm.unykorn.org</a>
            <Link href="/blog" className="hover:text-white/60 transition">Blog</Link>
            <Link href="/numbers" className="hover:text-white/60 transition">Numbers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
