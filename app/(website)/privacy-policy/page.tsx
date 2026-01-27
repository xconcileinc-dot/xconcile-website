import type { Metadata } from "next";
import { PortableText } from '@portabletext/react'
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { client } from "@/lib/sanity/client";
import { generateMetadata as genMeta } from "@/lib/seo";

// Enable ISR with 1-hour revalidation
export const revalidate = 60;

async function getPrivacyPolicy() {
    const data = await client.fetch(`
    *[_type == "privacyPolicy"][0]{
      title,
      lastUpdated,
      content,
      seo
    }
  `);
    return data;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPrivacyPolicy();

    if (page?.seo) {
        return genMeta({
            title: page.seo.metaTitle || page.title,
            description: page.seo.metaDescription,
            keywords: page.seo.metaKeywords,
            ogImage: page.seo.openGraphImage,
            slug: "/privacy-policy"
        });
    }

    return genMeta({
        title: "Privacy Policy",
        description: "Our privacy policy outlines how we collect, use, and protect your personal information.",
        slug: "/privacy-policy"
    });
}

export default async function PrivacyPolicyPage() {
    const page = await getPrivacyPolicy();

    if (!page) {
        return (
            <Section background="white" spacing="lg">
                <Container>
                    <div className="max-w-4xl mx-auto py-24">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
                        <p className="text-neutral-600">Content not yet available. Please check back later.</p>
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <Section background="white" spacing="lg" className="pt-24 pb-12 bg-gradient-to-b from-neutral-50 to-white">
                <Container>
                    <Breadcrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Privacy Policy" },
                        ]}
                        className="mb-8 text-neutral-600"
                    />
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">{page.title}</h1>
                        {page.lastUpdated && (
                            <p className="text-lg text-neutral-600">
                                Last Updated: {new Date(page.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        )}
                    </div>
                </Container>
            </Section>

            {/* Content Section */}
            <Section background="white" spacing="lg">
                <Container>
                    <div className="max-w-4xl mx-auto prose prose-lg prose-neutral
            prose-headings:font-bold prose-headings:text-neutral-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:my-6 prose-li:my-2
            prose-strong:text-neutral-900 prose-strong:font-semibold
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
          ">
                        <PortableText value={page.content} />
                    </div>
                </Container>
            </Section>
        </>
    );
}
