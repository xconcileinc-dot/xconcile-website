import type { Metadata } from "next";
import { getAllPosts, getAllCategories, getBlogPage } from "@/lib/sanity/queries";
import { ResourcesClient } from "./ResourcesClient";
import { generateMetadata as genMeta } from "@/lib/seo";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();

  if (page?.seo) {
    return genMeta({
      title: page.seo.metaTitle,
      description: page.seo.metaDescription,
      keywords: page.seo.metaKeywords,
      ogImage: page.seo.openGraphImage,
      slug: "/blog"
    });
  }

  return {
    title: "Resources & Insights | Business Growth Strategies",
    description: "Discover expert insights and actionable strategies for business growth, operations optimization, and financial management.",
  };
}

export default async function ResourcesPage() {
  // Fetch data from Sanity
  const blogPosts = await getAllPosts();
  const categories = await getAllCategories();
  const page = await getBlogPage();

  // Add "All" to the beginning
  const allCategories = ["All", ...categories];

  return (
    <ResourcesClient
      blogPosts={blogPosts}
      categories={allCategories}
      title={page?.title}
      description={page?.description}
      newsletterTitle={page?.newsletterTitle}
      newsletterDescription={page?.newsletterDescription}
    />
  );
}
