"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
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

export function ResourcesClient({ blogPosts, categories, title, description, newsletterTitle, newsletterDescription }: ResourcesClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter posts by category and search
    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = searchQuery === "" ||
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.category?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    return (
        <>
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
                            { label: "Blog" },
                        ]}
                        className="mb-6 text-primary-200"
                    />
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                            {title || "Blog & Insights"}
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {description || "Explore our collection of articles, guides, and insights to help your business succeed. Expert advice, best practices, and industry trends."}
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Search Bar */}
            <Section background="white" spacing="sm" className="pt-8">
                <Container>
                    <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                            />
                            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </Container>
            </Section>



            {/* Featured Post */}
            {featuredPost && (
                <Section background="white" spacing="md">
                    <Container>
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <Card hover className="overflow-hidden group cursor-pointer">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
  
  {/* Image */}
  <div className="relative w-full aspect-video md:h-full md:min-h-[350px] overflow-hidden rounded-2xl overflow-hidden rounded-2xl">
    <Image
      src={featuredPost.image}
      alt={featuredPost.imageAlt || featuredPost.title}
      fill
      className="object-cover object-top md:object-center group-hover:scale-105 transition-transform duration-500"
    />

    {/* Badge */}
    <div className="absolute top-4 left-4">
      <span className="px-4 py-2 bg-secondary-500 text-white rounded-full text-sm font-bold shadow-lg">
        Featured
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="p-4 md:p-6 flex flex-col justify-center">
    <div className="flex items-center gap-3 mb-3 text-sm text-neutral-500">
      <span>{featuredPost.date}</span>
      <span>•</span>
      <span>{featuredPost.readTime}</span>
    </div>

    <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
      {featuredPost.title}
    </h2>

    <p className="text-neutral-600 mb-6 line-clamp-3 md:line-clamp-4">
      {featuredPost.excerpt}
    </p>

    <div className="flex justify-end">
      <span className="text-primary-600 font-semibold inline-flex items-center gap-2">
        Read More
      </span>
    </div>
  </div>
</div>
                                </Card>
                            </Link>
                        </div>
                    </Container>
                </Section>
            )}

            {/* Blog Posts Grid */}
            <Section background="white" spacing="lg">
                <Container>
                    {remainingPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingPosts.map((post, index) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="animate-fade-in-up group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Card hover className="h-full overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                                        <div className="relative aspect-video mb-4 -m-6 overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.imageAlt || post.title}
                                                fill
                                                className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 pt-0">
                                            <div className="flex items-center gap-3 mb-3 text-sm text-neutral-500">
                                                <span>{post.date}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-neutral-600 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-end">
                                                <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read More
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-neutral-500">No articles found matching your criteria.</p>
                        </div>
                    )}
                </Container>
            </Section>

            {/* Newsletter CTA */}
            <Section
                background="primary"
                spacing="lg"
                className="bg-gradient-to-r from-primary-700 to-primary-800"
            >
                <Container>
                    <Newsletter
                        title={newsletterTitle}
                        description={newsletterDescription}
                    />
                </Container>
            </Section>
        </>
    );
}
