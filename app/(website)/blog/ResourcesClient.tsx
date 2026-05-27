"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Newsletter } from "@/components/ui/Newsletter";

interface ResourcesClientProps {
  blogPosts: BlogPost[];
  categories: string[];
  title?: string;
  description?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
}

/* ── Reusable grid card ─────────────────────────────────────── */
function ArticleCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <article className="flex flex-col h-full bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-primary-300 hover:shadow-[0_8px_32px_-8px_rgba(16,42,67,0.18)] transition-all duration-300 hover:-translate-y-1">
        {/* thumbnail */}
        <div className="relative bg-neutral-50 overflow-hidden" style={{ aspectRatio: "16/10" }}>
          {post.image ? (
            <div className="absolute inset-5">
              <div className="relative w-full h-full">
                <Image
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
          {post.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary-700 uppercase tracking-widest rounded-full border border-primary-100 shadow-sm">
              {post.category}
            </span>
          )}
        </div>

        {/* body */}
        <div className="flex flex-col flex-1 p-5 pt-4">
          <h3 className="text-[15px] font-bold text-neutral-900 leading-[1.45] line-clamp-2 group-hover:text-primary-700 transition-colors duration-200 mb-2 flex-1">
            {post.title}
          </h3>
          <p className="text-[13px] text-neutral-500 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <footer className="flex items-center justify-between pt-3.5 border-t border-neutral-100">
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
              {post.author && (
                <span className="font-semibold text-neutral-600">{post.author}</span>
              )}
              {post.author && <span>·</span>}
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

/* ── Section label with divider ─────────────────────────────── */
function SectionLabel({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-neutral-100" />
      {right && <span className="text-[11px] text-neutral-400 whitespace-nowrap">{right}</span>}
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────── */
export function ResourcesClient({
  blogPosts,
  categories,
  title,
  description,
  newsletterTitle,
  newsletterDescription,
}: ResourcesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      (post.category?.toLowerCase() || "").includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);
  const topicCount = categories.filter((c) => c !== "All").length;

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* ════ HERO ════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-800 text-white">
        <Container>
          <div className="pt-16 pb-20 md:pt-20 md:pb-28">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
              className="mb-8 text-primary-400"
            />

            <div className="max-w-2xl">
              {/* eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/12 text-[11px] font-bold text-primary-300 uppercase tracking-[0.15em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
                {blogPosts.length} Articles &nbsp;·&nbsp; {topicCount} Topics
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-4">
                {title || "Blog & Insights"}
              </h1>
              <p className="text-base md:text-lg text-primary-300 leading-relaxed max-w-xl mb-10">
                {description || "Expert articles, guides, and industry insights to help your business grow."}
              </p>

              {/* search */}
              <div className="relative max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-primary-400 pointer-events-none w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-primary-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/25 focus:bg-white/15 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ════ CATEGORY BAR ════════════════════════════════════════════ */}
      {categories.length > 1 && (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <Container>
            <div className="flex items-center gap-1.5 py-3 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    selectedCategory === cat
                      ? "bg-primary-900 text-white shadow-sm"
                      : "text-neutral-500 hover:text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="flex-shrink-0 ml-auto pl-4">
                <span className="text-[11px] text-neutral-400 font-medium">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* ════ CONTENT ═════════════════════════════════════════════════ */}
      <div className="py-12">
        <Container>

          {/* ── Empty state ─────────────────────────────────────────── */}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-3xl bg-neutral-100 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-lg font-bold text-neutral-700 mb-1.5">No articles found</p>
              <p className="text-sm text-neutral-400 mb-6">Try a different search term or browse all categories</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="px-5 py-2.5 bg-primary-900 text-white text-sm font-semibold rounded-xl hover:bg-primary-800 transition-colors"
              >
                Browse all articles
              </button>
            </div>
          )}

          {/* ── Featured / Cover Story ──────────────────────────────── */}
          {featuredPost && (
            <div className="mb-14">
              <SectionLabel>Cover Story</SectionLabel>

              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] bg-white rounded-3xl border border-neutral-200/80 overflow-hidden hover:border-primary-300 hover:shadow-[0_16px_48px_-8px_rgba(16,42,67,0.18)] transition-all duration-300 hover:-translate-y-0.5">

                  {/* image zone */}
                  <div className="relative bg-neutral-50 overflow-hidden" style={{ minHeight: 320, maxHeight: 460 }}>
                    {featuredPost.image ? (
                      <div className="absolute inset-8">
                        <div className="relative w-full h-full">
                          <Image
                            src={featuredPost.image}
                            alt={featuredPost.imageAlt || featuredPost.title}
                            fill
                            className="object-contain group-hover:scale-[1.04] transition-transform duration-500"
                            priority
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100" />
                    )}
                  </div>

                  {/* content zone */}
                  <div className="flex flex-col justify-center p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-neutral-100">
                    <div className="flex items-center gap-2 mb-4">
                      {featuredPost.category && (
                        <span className="px-2.5 py-1 text-[10px] font-black text-primary-700 uppercase tracking-widest bg-primary-50 border border-primary-100 rounded-full">
                          {featuredPost.category}
                        </span>
                      )}
                      <span className="px-2.5 py-1 text-[10px] font-black text-secondary-700 uppercase tracking-widest bg-secondary-50 border border-secondary-100 rounded-full">
                        Featured
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-neutral-950 leading-[1.2] tracking-tight line-clamp-3 group-hover:text-primary-800 transition-colors mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-[14px] text-neutral-500 leading-[1.75] line-clamp-3 mb-7">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-[12px] text-neutral-400 mb-7 flex-wrap">
                      {featuredPost.author && (
                        <>
                          <span className="font-bold text-neutral-700">{featuredPost.author}</span>
                          <span>·</span>
                        </>
                      )}
                      <span>{featuredPost.date}</span>
                      {featuredPost.readTime && <><span>·</span><span>{featuredPost.readTime}</span></>}
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 text-white text-sm font-bold rounded-2xl hover:bg-primary-800 transition-colors shadow-sm group-hover:shadow-md">
                        Read Article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ── Grid ────────────────────────────────────────────────── */}
          {gridPosts.length > 0 && (
            <div>
              <SectionLabel right={`${gridPosts.length} articles`}>
                {featuredPost ? "Latest Articles" : "All Articles"}
              </SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridPosts.map((post, i) => (
                  <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 40}ms` }}>
                    <ArticleCard post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* single featured, no grid */}
          {featuredPost && gridPosts.length === 0 && filteredPosts.length === 1 && (
            <p className="text-center text-sm text-neutral-400 mt-2">More articles coming soon.</p>
          )}

        </Container>
      </div>

      {/* ════ NEWSLETTER ══════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 py-16">
        <Container>
          <Newsletter title={newsletterTitle} description={newsletterDescription} />
        </Container>
      </div>

    </div>
  );
}
