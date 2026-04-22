import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Storm Insights & AI Reports — NEED AI',
  description:
    'Real-time AI-generated storm analysis, insurance claim guides, and county-level damage reports. Updated after every major storm event.',
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">NEED AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/storm/wisconsin" className="text-yellow-400 font-bold">WI Storm Active</Link>
          <Link href="/numbers" className="text-gray-400 hover:text-white transition">Numbers</Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-red-900/40 border border-red-500/50 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block" />
            Wisconsin Storm Active · April 2026
          </div>
          <h1 className="text-5xl font-black mb-4">Storm Intelligence</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            AI-generated storm analysis, insurance claim strategy, and county-level damage reports. Real data. No fluff.
          </p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${featured.slug}`} className="block mb-12">
          <div className="bg-white/5 border border-yellow-400/30 rounded-2xl p-8 md:p-10 hover:border-yellow-400/60 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1 rounded uppercase">Featured</span>
              <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded font-bold">{featured.tag}</span>
              <span className="text-xs text-gray-500">{featured.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{featured.title}</h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">{featured.date} · {featured.author}</div>
              <span className="text-yellow-400 font-bold text-sm">Read Report →</span>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
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
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">{post.date}</div>
                <span className="text-yellow-400 text-xs font-bold">Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black mb-3">Wisconsin storm hit your area?</h3>
          <p className="text-gray-400 mb-6">Rita answers 24/7 — zero hold time, full intake, instant routing.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:+12623974245" className="bg-yellow-400 text-gray-900 font-black px-8 py-4 rounded-xl hover:bg-yellow-300 transition">
              📞 (262) HAIL
            </a>
            <a href="tel:+18447252460" className="bg-white/10 border border-white/20 font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition">
              (844) CLAIM
            </a>
            <a href="tel:+18885052924" className="bg-white/10 border border-white/20 font-bold px-6 py-4 rounded-xl hover:bg-white/20 transition">
              (888) LAW-AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
