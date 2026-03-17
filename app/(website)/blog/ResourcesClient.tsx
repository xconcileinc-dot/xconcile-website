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
      (post.category?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <Section
        background="white"
        spacing="xl"
        className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
      >
        <Container className="relative z-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            className="mb-6 text-primary-200"
          />

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {title || "Blog & Insights"}
            </h1>

            <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
              {description ||
                "Explore articles, guides, and insights to grow your business."}
            </p>
          </div>
        </Container>
      </Section>

      {/* Search */}
      <Section background="white" spacing="sm">
        <Container>
          <div className="max-w-2xl mx-auto">
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </Container>
      </Section>

      {/* Featured */}
      {featuredPost && (
        <Section background="white" spacing="md">
          <Container>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card hover className="overflow-hidden group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* FIXED IMAGE */}
                  <div className="relative h-[320px] md:h-[400px] overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-secondary-500 text-white rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <p className="text-sm text-neutral-500 mb-4">
                      {featuredPost.date} • {featuredPost.readTime}
                    </p>

                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary-600">
                      {featuredPost.title}
                    </h2>

                    <p className="text-neutral-600 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <span className="text-primary-600 font-semibold">
                      Read More →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </Container>
        </Section>
      )}

      {/* Grid */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:scale-[1.02] transition">
                  
                  {/* FIXED IMAGE */}
                  <div className="relative h-[220px] -m-6 mb-4 overflow-hidden bg-neutral-100">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 pt-0">
                    <p className="text-sm text-neutral-500 mb-2">
                      {post.date}
                    </p>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary-600">
                      {post.title}
                    </h3>

                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="text-primary-600 text-sm font-medium">
                      Read More →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section background="primary" spacing="lg">
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
