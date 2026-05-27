import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { FAQ } from "@/components/ui/FAQ";
import { AISummary } from "@/components/ui/AISummary";
import { getPostBySlug, getAllPosts, getAllPostSlugs, getBlogPage } from "@/lib/sanity/queries";
import Link from "next/link";
import { PortableText } from "@/components/ui/PortableText";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Metadata } from "next";
import { Newsletter } from "@/components/ui/Newsletter";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return genMeta({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.metaKeywords,
    ogType: "article",
    ogImage: post.seo?.openGraphImage || post.image,
    author: post.author,
    slug: `/blog/${slug}`,
  });
}

/* ─── Related post card (identical to listing grid card) ───── */
function RelatedCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
      <article className="flex flex-col h-full bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-primary-300 hover:shadow-[0_8px_32px_-8px_rgba(16,42,67,0.18)] transition-all duration-300 hover:-translate-y-1">
        <div className="relative bg-neutral-50 overflow-hidden" style={{ aspectRatio: "16/10" }}>
          {post.image ? (
            <div className="absolute inset-5">
              <div className="relative w-full h-full">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-contain group-hover:scale-[1.05] transition-transform duration-500"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50" />
          )}
          {post.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary-700 uppercase tracking-widest rounded-full border border-primary-100">
              {post.category}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5 pt-4">
          <h3 className="text-[15px] font-bold text-neutral-900 leading-[1.45] line-clamp-2 group-hover:text-primary-700 transition-colors mb-2 flex-1">
            {post.title}
          </h3>
          <p className="text-[13px] text-neutral-500 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <footer className="flex items-center justify-between pt-3.5 border-t border-neutral-100">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              <span>{post.date}</span>
              {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
            </div>
            <span className="text-[11px] font-bold text-primary-600 inline-flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
              Read
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </footer>
        </div>
      </article>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const allPosts = await getAllPosts();
  const blogPage = await getBlogPage();
  const relatedPosts = allPosts.filter((p: any) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <ReadingProgress />

      {/* ════ HERO ════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="pt-16 pb-20 md:pt-20 md:pb-28 max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
              className="mb-8 text-primary-400"
            />

            {/* category */}
            {post.category && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/12 text-[10px] font-black text-primary-300 uppercase tracking-[0.18em] mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                {post.category}
              </div>
            )}

            {/* title */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              {post.title}
            </h1>

            {/* excerpt */}
            {post.excerpt && (
              <p className="text-[15px] md:text-base text-primary-300 leading-[1.75] mb-8 max-w-2xl">
                {post.excerpt}
              </p>
            )}

            {/* meta strip */}
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-primary-400">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-700 border border-primary-600 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-bold text-white">{post.author}</span>
                  {post.authorRole && <span className="text-primary-500 text-[11px]">· {post.authorRole}</span>}
                </div>
              )}
              {post.author && <span className="text-primary-700">|</span>}
              <span>{post.date}</span>
              {post.readTime && <><span className="text-primary-700">·</span><span>{post.readTime}</span></>}
            </div>
          </div>
        </Container>
      </div>

      {/* ════ FEATURED IMAGE ══════════════════════════════════════════ */}
      {post.image && (
        <div className="bg-gradient-to-b from-primary-800 to-neutral-50 py-0">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_24px_64px_-12px_rgba(16,42,67,0.22)] overflow-hidden animate-fade-in-up">
                <div className="relative bg-white" style={{ aspectRatio: "16/9", maxHeight: "480px" }}>
                  <div className="absolute inset-8">
                    <div className="relative w-full h-full">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* ════ ARTICLE + SIDEBAR ═══════════════════════════════════════ */}
      <div className={`py-14 ${!post.image ? "pt-0" : ""}`}>
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">

              {/* ── Main article ──────────────────────────────────── */}
              <main className="lg:col-span-8 min-w-0">
                <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden">

                  {/* article body */}
                  <div className="p-6 sm:p-8 md:p-10">
                    <article className="text-[16.5px] leading-[1.85] text-neutral-700">
                      <PortableText value={post.content} />
                    </article>

                    {/* ── Article footer ──────────────────────────── */}
                    <div className="mt-12 pt-8 border-t border-neutral-100 space-y-5">
                      {/* tags */}
                      {post.category && (
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-[10px] font-black text-primary-700 uppercase tracking-widest bg-primary-50 border border-primary-100 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}

                      {/* author card */}
                      {post.author && (
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                          <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-neutral-900">{post.author}</p>
                            {post.authorRole && <p className="text-xs text-neutral-500 mt-0.5">{post.authorRole}</p>}
                            <p className="text-xs text-neutral-400 mt-1.5">
                              Published {post.date}{post.readTime && ` · ${post.readTime} read`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* mobile share + AI summary inside card */}
                  <div className="lg:hidden border-t border-neutral-100 p-5 space-y-4 bg-neutral-50/50">
                    <AISummary title={post.title} url={currentUrl} />
                    <ShareButtons title={post.title} url={currentUrl} />
                  </div>
                </div>
              </main>

              {/* ── Sticky sidebar ────────────────────────────────── */}
              <aside className="hidden lg:flex lg:col-span-4 flex-col">
                <div className="sticky top-[5rem] space-y-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto hide-scrollbar pb-4">
                  <AISummary title={post.title} url={currentUrl} />
                  <div className="bg-white rounded-xl border border-neutral-200 p-5">
                    <ShareButtons title={post.title} url={currentUrl} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </div>

      {/* ════ FAQs ════════════════════════════════════════════════════ */}
      {post.faqs && post.faqs.length > 0 && (
        <div className="py-12 bg-white border-t border-neutral-200">
          <Container>
            <div className="max-w-4xl mx-auto">
              <FAQ items={post.faqs} />
            </div>
          </Container>
        </div>
      )}

      {/* ════ RELATED POSTS ═══════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <div className="py-14 border-t border-neutral-200">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">
                  Related Articles
                </span>
                <div className="flex-1 h-px bg-neutral-200" />
                <Link
                  href="/blog"
                  className="text-[11px] font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors whitespace-nowrap"
                >
                  View all
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((rp: any) => (
                  <RelatedCard key={rp.id} post={rp} />
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* ════ NEWSLETTER ══════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 py-16">
        <Container>
          <Newsletter
            title={blogPage?.newsletterTitle}
            description={blogPage?.newsletterDescription}
          />
        </Container>
      </div>
    </div>
  );
}
