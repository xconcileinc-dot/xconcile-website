"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
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
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.category?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
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
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            className="mb-6 text-primary-200"
          />

          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 text-white leading-tight">
              {title || "Blog & Insights"}
            </h1>
            <p className="text-lg md:text-xl text-primary-200 mb-10 leading-relaxed">
              {description ||
                "Expert articles, guides, and industry insights to help your business grow."}
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all text-base"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Category Filter Pills ─────────────────────────────────────── */}
      {categories.length > 1 && (
        <div className="bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-sm">
          <Container>
            <div className="flex items-center gap-2 py-3 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
                    selectedCategory === cat
                      ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:text-primary-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="flex-shrink-0 ml-auto text-xs text-neutral-400 pl-4 whitespace-nowrap">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </Container>
        </div>
      )}

      {/* ── Featured Post ─────────────────────────────────────────────── */}
      {featuredPost && (
        <Section background="white" spacing="lg">
          <Container>
            <Link href={`/blog/${featuredPost.slug}`} className="group block animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                {/* Image */}
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary-500 text-white rounded-full text-xs font-bold shadow-md">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  {featuredPost.category && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
                      {featuredPost.category}
                    </span>
                  )}

                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight line-clamp-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-neutral-500 mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                    {featuredPost.author && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{featuredPost.author}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{featuredPost.date}</span>
                    </div>
                    {featuredPost.readTime && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{featuredPost.readTime}</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:gap-3 transition-all">
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </Section>
      )}

      {/* ── Posts Grid ────────────────────────────────────────────────── */}
      <Section background="white" spacing="lg" className="pt-0">
        <Container>
          {remainingPosts.length > 0 ? (
            <>
              {featuredPost && (
                <h2 className="text-xl font-semibold text-neutral-700 mb-6">
                  More Articles
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.imageAlt || post.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200" />
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-5 flex flex-col flex-1">
                        {post.category && (
                          <span className="text-xs font-semibold text-primary-600 mb-2">
                            {post.category}
                          </span>
                        )}

                        <h3 className="text-base font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors flex-1 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                          <div className="flex items-center gap-3">
                            <span>{post.date}</span>
                            {post.readTime && (
                              <>
                                <span>·</span>
                                <span>{post.readTime}</span>
                              </>
                            )}
                          </div>
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
            </>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-neutral-700 mb-1">No articles found</p>
              <p className="text-sm text-neutral-400">Try a different keyword or category</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <Section
        background="primary"
        spacing="lg"
        className="bg-gradient-to-r from-primary-700 to-primary-800"
      >
        <Container>
          <Newsletter title={newsletterTitle} description={newsletterDescription} />
        </Container>
      </Section>
    </>
  );
}
