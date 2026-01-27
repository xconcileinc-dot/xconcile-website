import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { getContactPage } from "@/lib/sanity/queries";
import { ContactForm } from "@/components/contact/ContactForm";

// Enable into ISR
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const sanityData = await getContactPage().catch(() => null);

  if (sanityData?.seo) {
    return genMeta({
      title: sanityData.seo.metaTitle || "Contact Us",
      description: sanityData.seo.metaDescription,
      keywords: sanityData.seo.metaKeywords,
      ogImage: sanityData.seo.openGraphImage,
      slug: "/contact"
    });
  }

  return genMeta({
    title: "Contact Us",
    description:
      "Get in touch with our team. We're here to help you solve your business challenges.",
    keywords: ["contact", "support", "help", "message"],
    slug: "/contact"
  });
}

export default async function ContactPage() {
  const sanityData = await getContactPage().catch(() => null);
  const data = sanityData || {
    title: "Get in Touch",
    description: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
  };

  return (
    <ContactForm data={data} />
  )
}

