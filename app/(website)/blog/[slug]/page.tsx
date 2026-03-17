import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { FAQ } from "@/components/ui/FAQ";
import { getPostBySlug, getAllPosts, getAllPostSlugs, getBlogPage } from "@/lib/sanity/queries";
import Link from "next/link";
import { PortableText } from "@/components/ui/PortableText";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Metadata } from "next";
import { Newsletter } from "@/components/ui/Newsletter";

// ... existing imports

// Enable ISR
export const revalidate = 60;

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return genMeta({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.metaKeywords,
    ogType: "article",
    ogImage: post.seo?.openGraphImage || post.image,
    author: post.author,
    slug: `/blog/${params.slug}`
  });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const allPosts = await getAllPosts();
  const blogPage = await getBlogPage();

  return (
    <>
      <ReadingProgress />

      {/* Hero Section */}
      <Section
        background="white"
        spacing="xl"
        className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
      >
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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-primary-200 text-sm">
              {post.author && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Written by {post.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {post.image && (
        <Section background="white" spacing="sm">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl -mt-16 mb-6">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Content */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <article className="max-w-none animate-fade-in-up">
                <PortableText value={post.content} />
              </article>
            </div>
          </div>
        </Container>
      </Section>



      {/* Related Posts */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPosts
                .filter((p: any) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost: any) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.image && (
                        <div className="relative aspect-video w-full overflow-hidden">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.imageAlt || relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1">
                          Read Article
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs Section */}
      {post.faqs && post.faqs.length > 0 && (
        <Section background="gray" spacing="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <FAQ items={post.faqs} />
            </div>
          </Container>
        </Section>
      )}

      {/* Newsletter */}
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
