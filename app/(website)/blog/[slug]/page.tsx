import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { FAQ } from "@/components/ui/FAQ";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { AISummary } from "@/components/ui/AISummary";
import {
  getPostBySlug,
  getAllPosts,
  getAllPostSlugs,
  getBlogPage,
} from "@/lib/sanity/queries";
import Link from "next/link";
import { PortableText } from "@/components/ui/PortableText";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Metadata } from "next";
import { Newsletter } from "@/components/ui/Newsletter";
import { slugify } from "@/lib/utils";
import type { TOCItem } from "@/components/ui/TableOfContents";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) return { title: "Post Not Found" };

  return genMeta({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.metaKeywords,
    ogType: "article",
    ogImage: post.seo?.openGraphImage || post.image,
    author: post.author,
    slug: `/blog/${params.slug}`,
  });
}

function extractHeadings(content: any[]): TOCItem[] {
  if (!content) return [];
  return content
    .filter(
      (block: any) =>
        block._type === "block" && ["h2", "h3"].includes(block.style)
    )
    .map((block: any) => {
      const text =
        block.children?.map((c: any) => c.text ?? "").join("") ?? "";
      return {
        id: slugify(text),
        text,
        level: parseInt(block.style.replace("h", ""), 10),
      };
    });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const allPosts = await getAllPosts();
  const blogPage = await getBlogPage();
  const headings = extractHeadings(post.content);
  const relatedPosts = allPosts.filter((p: any) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <ReadingProgress />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Section
        background="white"
        spacing="xl"
        className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
      >
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-700/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-600/20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-6 text-primary-200"
          />

          <div className="max-w-4xl mx-auto animate-fade-in-up">
            {post.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-primary-200 border border-white/20 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 inline-block" />
                {post.category}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-primary-200 mb-8 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 text-primary-300 text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-white font-medium">{post.author}</span>
                    {post.authorRole && (
                      <span className="text-primary-400 ml-1 text-xs">· {post.authorRole}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post.date}</span>
              </div>

              {post.readTime && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime}</span>
                </div>
              )}

              {headings.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10M4 18h10" />
                  </svg>
                  <span>{headings.length} sections</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Featured Image ───────────────────────────────────────────── */}
      {post.image && (
        <div className="bg-gradient-to-b from-primary-900 to-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up border border-neutral-100">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* ── Content + Sidebar ────────────────────────────────────────── */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

              {/* Main Article */}
              <main className="lg:col-span-8 min-w-0">
                {/* Mobile TOC (collapsible) */}
                {headings.length > 0 && (
                  <div className="lg:hidden mb-8">
                    <TableOfContents headings={headings} />
                  </div>
                )}

                <article className="animate-fade-in-up">
                  <PortableText value={post.content} />
                </article>

                {/* Author card */}
                {post.author && (
                  <div className="mt-12 pt-8 border-t border-neutral-200">
                    {post.category && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full border border-primary-100">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{post.author}</p>
                        {post.authorRole && (
                          <p className="text-xs text-neutral-500 mt-0.5">{post.authorRole}</p>
                        )}
                        <p className="text-sm text-neutral-600 mt-1">
                          Published {post.date} · {post.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile share + AI summary */}
                <div className="lg:hidden mt-8 space-y-4">
                  <div className="p-5 bg-white rounded-xl border border-neutral-200 shadow-soft">
                    <ShareButtons title={post.title} url={currentUrl} />
                  </div>
                  <AISummary title={post.title} url={currentUrl} />
                </div>
              </main>

              {/* Sticky Sidebar */}
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-24 space-y-5 max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar pb-4">
                  {headings.length > 0 && (
                    <TableOfContents headings={headings} />
                  )}
                  <AISummary title={post.title} url={currentUrl} />
                  <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-soft">
                    <ShareButtons title={post.title} url={currentUrl} />
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      {post.faqs && post.faqs.length > 0 && (
        <Section background="gray" spacing="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <FAQ items={post.faqs} />
            </div>
          </Container>
        </Section>
      )}

      {/* ── Related Posts ─────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <Section background="white" spacing="lg">
          <Container>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  Related Articles
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: any) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {relatedPost.image && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.imageAlt || relatedPost.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        {relatedPost.category && (
                          <span className="text-xs font-medium text-primary-600 mb-2">
                            {relatedPost.category}
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span>{relatedPost.date}</span>
                          <span className="text-primary-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <Section
        background="primary"
        spacing="lg"
        className="bg-gradient-to-r from-primary-700 to-primary-800"
      >
        <Container>
          <Newsletter
            title={blogPage?.newsletterTitle}
            description={blogPage?.newsletterDescription}
          />
        </Container>
      </Section>
    </>
  );
}
