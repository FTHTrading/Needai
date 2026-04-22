import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, getPost } from '@/data/blog-posts';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — NEED AI Storm Intelligence`,
    description: post.excerpt,
  };
}

// Minimal markdown renderer — handles headers, bold, lists, blockquotes, tables, hr
function renderMarkdown(md: string): string {
  return md
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) return `<h3 class="text-xl font-black mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2 class="text-2xl font-black mt-10 mb-4 text-yellow-400">${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return `<h1 class="text-3xl font-black mt-10 mb-4">${line.slice(2)}</h1>`;
      if (line.startsWith('---')) return `<hr class="border-white/10 my-8" />`;
      if (line.startsWith('> ')) return `<blockquote class="border-l-2 border-yellow-400 pl-4 text-yellow-200 italic my-4">${line.slice(2)}</blockquote>`;
      if (line.startsWith('- ')) return `<li class="ml-4 text-gray-300 mb-1 list-disc">${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
      if (line.startsWith('| ')) {
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) return ''; // separator row
        const tag = line.startsWith('| **') || cells[0].startsWith('**') ? 'th' : 'td';
        const cellsHtml = cells.map((c) => `<${tag} class="px-4 py-2 border border-white/10">${c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</${tag}>`).join('');
        return `<tr>${cellsHtml}</tr>`;
      }
      if (line.trim() === '') return '<br />';
      return `<p class="text-gray-300 leading-relaxed mb-4">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
    })
    .join('\n')
    .replace(/<tr>[\s\S]*?<\/tr>/g, (match) => {
      if (match.includes('<th')) return `<thead><tr>${match.replace(/<\/?tr>/g, '')}</tr></thead>`;
      return match;
    });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.state === post.state).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">NEED AI</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/storm/wisconsin" className="text-yellow-400 font-bold">WI Storm Active</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition">All Reports</Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-8">
          <Link href="/blog" className="hover:text-gray-400 transition">Storm Intelligence</Link>
          <span>/</span>
          <span>{post.tag}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded font-bold uppercase">{post.tag}</span>
            <span className="text-xs text-gray-500">{post.readTime}</span>
            <span className="text-xs text-gray-600">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{post.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="text-xs text-gray-600 pb-6 border-b border-white/10">By {post.author}</div>
        </div>

        {/* Content */}
        <div
          className="prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA Box */}
        <div className="mt-12 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-8">
          <h3 className="text-xl font-black mb-2">Rita answers now — zero hold time</h3>
          <p className="text-gray-400 text-sm mb-6">
            Call any NEED AI number for instant AI intake, priority scoring, and professional routing. 24/7.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+12623974245" className="bg-yellow-400 text-gray-900 font-black px-6 py-3 rounded-xl hover:bg-yellow-300 transition text-sm">
              📞 (262) HAIL
            </a>
            <a href="tel:+18447252460" className="bg-white/10 border border-white/20 font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition text-sm">
              (844) CLAIM
            </a>
            <a href="tel:+18885052924" className="bg-white/10 border border-white/20 font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition text-sm">
              (888) LAW-AI
            </a>
            <a href="tel:+18446696333" className="bg-white/10 border border-white/20 font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition text-sm">
              (844) NEED-AI
            </a>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-black mb-6 text-gray-400 uppercase tracking-widest text-xs">Related Reports</h3>
            <div className="space-y-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-yellow-400/40 transition block"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded font-bold">{p.tag}</span>
                      <span className="text-xs text-gray-600">{p.readTime}</span>
                    </div>
                    <div className="font-bold text-sm leading-tight">{p.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-300 transition">
            ← All Storm Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
