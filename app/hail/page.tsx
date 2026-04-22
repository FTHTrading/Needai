import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hail Damage AI — hail.unykorn.org',
  description: 'Baseball hail. Golf ball hail. Your roof took the hit. Our AI intake handles the rest — 24/7, no hold music, qualified leads instantly.',
  openGraph: {
    title: 'Hail Damage AI — 262-HAIL | 414-HAIL | 844-CLAIM',
    description: 'AI-powered hail damage intake for Wisconsin and beyond. Call 262-HAIL or 414-HAIL — answered instantly, claim started immediately.',
    url: 'https://hail.unykorn.org',
  },
};

const WI_NUMBERS = [
  { vanity: '262-HAIL', full: '(262) 397-4245', href: 'tel:+12623974245', region: 'SE Wisconsin', primary: true },
  { vanity: '414-HAIL', full: '(414) 676-6337', href: 'tel:+14146766337', region: 'Milwaukee Metro', primary: true },
  { vanity: '844-CLAIM', full: '(844) 725-2460', href: 'tel:+18447252460', region: 'National', primary: false },
  { vanity: '888-LAW-AI', full: '(888) 505-2924', href: 'tel:+18885052924', region: 'Denied Claims / Legal', primary: false },
  { vanity: '844-NEED-AI', full: '(844) 669-6333', href: 'tel:+18446696333', region: 'Universal Routing', primary: false },
];

const HAIL_SIZES = [
  { size: 'Pea (1/4")', risk: 'Dents in gutters, siding', color: 'text-yellow-400', current: false },
  { size: 'Marble (1/2")', risk: 'Roof granule loss begins', color: 'text-orange-400', current: false },
  { size: 'Quarter (1")', risk: 'Shingle damage — claim threshold', color: 'text-orange-500', current: false },
  { size: 'Golf Ball (1.75")', risk: 'Significant roof damage, HVAC dents', color: 'text-red-400', current: false },
  { size: 'Baseball (2.75")', risk: 'Structural damage — WI April 2026 EVENT', color: 'text-red-500', current: true },
  { size: 'Softball (4.5")', risk: 'Catastrophic — call 911 + claim immediately', color: 'text-red-600', current: false },
];

const STEPS = [
  { n: '01', title: 'Call 262-HAIL or 414-HAIL', body: 'AI answers instantly. No hold music. Tell them your address and describe the damage — roof, gutters, siding, vehicles.' },
  { n: '02', title: 'AI Documents Everything', body: 'Date of loss, hail size estimate, county, property type — all captured and structured automatically during the call.' },
  { n: '03', title: 'Claim Started Immediately', body: 'You receive a claim reference, a follow-up text, and your case is routed to an adjuster partner or attorney if the claim is denied.' },
];

const CLAIM_MISTAKES = [
  'Signing an AOB with a storm chaser before calling your insurer',
  'Waiting more than 7 days to report — most policies have strict notice requirements',
  'Letting a roofer\'s "free inspection" become your only documentation',
  'Accepting the first adjuster estimate without a second opinion',
  'Not photographing every single impact point before any repairs begin',
];

export default function HailPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <a href="https://needai.unykorn.org" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">HAIL<span className="text-blue-400">AI</span></span>
            <span className="hidden sm:block text-xs text-white/40 border border-white/20 rounded px-2 py-0.5 uppercase tracking-widest">hail.unykorn.org</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <span className="text-red-400 font-semibold animate-pulse">WI APRIL 2026 ACTIVE</span>
            <Link href="/storm/wisconsin" className="hover:text-white transition">WI Campaign</Link>
            <Link href="/blog" className="hover:text-white transition">Storm Intel</Link>
            <a href="https://storm.unykorn.org" className="hover:text-white transition">storm.unykorn.org</a>
            <a href="https://needai.unykorn.org" className="hover:text-white transition">needai.unykorn.org</a>
          </nav>
          <a href="tel:+12623974245" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition whitespace-nowrap">
            Call 262-HAIL
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-700/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-16">
          <div className="mb-8 flex items-center gap-3 bg-red-950/80 border border-red-500/50 rounded-xl px-5 py-3 text-sm max-w-2xl">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-red-300 font-semibold">ACTIVE: Wisconsin April 2026 — 17 counties, 2.75" baseball hail, EF3 confirmed.</span>
            <Link href="/storm/wisconsin" className="text-red-400 underline font-bold whitespace-nowrap">Details</Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">Hail Damage AI Intake</div>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
                Baseball Hail.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Your Roof.</span><br />
                We Handle It.
              </h1>
              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                AI picks up your call 24/7. Documents the damage. Starts the claim. Routes denied cases to legal. No hold music. Just results.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:+12623974245" className="bg-white text-black font-black px-8 py-4 rounded-xl text-xl hover:bg-gray-100 transition">262-HAIL</a>
                <a href="tel:+14146766337" className="bg-white/10 text-white font-bold px-7 py-4 rounded-xl text-xl hover:bg-white/20 transition border border-white/20">414-HAIL</a>
                <a href="tel:+18447252460" className="bg-blue-600 text-white font-bold px-7 py-4 rounded-xl text-xl hover:bg-blue-500 transition">844-CLAIM</a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="border-b border-white/10 px-5 py-3">
                <div className="text-xs uppercase tracking-widest text-white/40">Wisconsin Hail Numbers — All Live</div>
              </div>
              <div className="divide-y divide-white/5">
                {WI_NUMBERS.map((n) => (
                  <a key={n.vanity} href={n.href} className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition group">
                    <div className="flex items-center gap-4">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${n.primary ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                      <div>
                        <div className="text-xl font-black text-white group-hover:text-blue-300 transition">{n.vanity}</div>
                        <div className="text-sm text-white/40">{n.full}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/50 font-medium">{n.region}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-3">Hail Size Reference</div>
            <h2 className="text-3xl md:text-4xl font-black">Know your hail. <span className="text-white/40">Know your claim.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HAIL_SIZES.map((h) => (
              <div key={h.size} className={`bg-white/5 border border-white/10 rounded-xl p-5 ${h.current ? 'border-red-500/40 bg-red-950/20' : ''}`}>
                <div className={`text-2xl font-black mb-2 ${h.color}`}>{h.size}</div>
                <div className="text-sm text-white/60 leading-relaxed">{h.risk}</div>
                {h.current && (
                  <div className="mt-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold inline-block">CURRENT WI EVENT</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-3">AI Intake Process</div>
            <h2 className="text-3xl md:text-4xl font-black">Three steps. <span className="text-white/40">Claim started.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-4">Step {s.n}</div>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-red-950/10">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3">Consumer Alert</div>
            <h2 className="text-3xl md:text-4xl font-black">5 mistakes that kill your claim.</h2>
          </div>
          <div className="space-y-4">
            {CLAIM_MISTAKES.map((m, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <span className="text-red-400 font-black text-lg flex-shrink-0">{i + 1}.</span>
                <p className="text-white/70 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="tel:+12623974245" className="bg-white text-black font-black px-8 py-4 rounded-xl text-xl hover:bg-gray-100 transition inline-block">Call 262-HAIL Now</a>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/storm/wisconsin" className="group bg-gradient-to-br from-red-950 to-slate-900 border border-red-500/30 hover:border-red-500/60 rounded-2xl p-8 transition block relative overflow-hidden">
              <div className="absolute top-3 right-3 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE NOW</div>
              <div className="text-5xl mb-4">🌪️</div>
              <div className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">Wisconsin April 2026</div>
              <h3 className="text-2xl font-black mb-3">Full Storm Campaign</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">17 counties. Baseball hail. EF3 corridors. All 5 Wisconsin numbers active right now.</p>
              <div className="text-orange-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Go to campaign →</div>
            </Link>
            <a href="https://storm.unykorn.org" className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-white/30 rounded-2xl p-8 transition block">
              <div className="text-5xl mb-4">⛈️</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">storm.unykorn.org</div>
              <h3 className="text-2xl font-black mb-3">Storm Command</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">All storm types — tornado, wind, structural. AI dispatch and legal escalation for every event.</p>
              <div className="text-white/60 text-sm font-bold group-hover:translate-x-1 transition-transform">Visit storm site →</div>
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-600/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Hail hit.<br /><span className="text-blue-400">AI answers.</span></h2>
          <p className="text-white/50 text-lg mb-10">Call now. AI documents the damage, starts the claim, and routes your case to the right expert.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+12623974245" className="bg-white text-black font-black px-8 py-4 rounded-xl text-xl hover:bg-gray-100 transition">262-HAIL</a>
            <a href="tel:+14146766337" className="bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-white/20 transition border border-white/20">414-HAIL</a>
            <a href="tel:+18447252460" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-500 transition">844-CLAIM</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div>
            <span className="font-black text-white/60">HAILAI</span>
            <span> · hail.unykorn.org</span>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a href="https://needai.unykorn.org" className="hover:text-white/60 transition">needai.unykorn.org</a>
            <a href="https://storm.unykorn.org" className="hover:text-white/60 transition">storm.unykorn.org</a>
            <Link href="/storm/wisconsin" className="hover:text-white/60 transition">WI Campaign</Link>
            <Link href="/blog" className="hover:text-white/60 transition">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
