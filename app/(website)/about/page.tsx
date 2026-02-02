import type { Metadata } from "next";
import Image from "next/image";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { getAboutPage } from "@/lib/sanity/queries";
import * as LucideIcons from "lucide-react";

// Enable ISR
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const sanityData = await getAboutPage().catch(() => null);

  if (sanityData?.seo) {
    return genMeta({
      title: sanityData.seo.metaTitle || "About Us",
      description: sanityData.seo.metaDescription,
      keywords: sanityData.seo.metaKeywords,
      ogImage: sanityData.seo.openGraphImage,
      slug: "/about"
    });
  }

  return genMeta({
    title: "About Us - Your Strategic Partner for Finance and Accounting",
    description:
      "Xconcile was built to solve the #1 problem facing US accounting firms: the talent gap. We provide the infrastructure you need to say yes to more clients.",
    keywords: ["about", "company", "mission", "values", "team", "CPA services"],
    slug: "/about"
  });
}

export default async function AboutPage() {
  const sanityData = await getAboutPage().catch(() => null);

  const staticData = {
    heroTitle: "Your Strategic Partner",
    heroTitleHighlight: "for Finance and Accounting Services",
    heroDescription:
      "Xconcile was built to solve the #1 problem facing US accounting firms: the talent gap. We provide the infrastructure you need to say \"yes\" to more clients.",
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop",
    whyWeExistTitle: "Redefining Outsourcing for the Modern CPA",
    whyWeExistBody:
      "Most outsourcing firms focus on volume; we focus on velocity and veracity. We understand that for a US CPA, \"done\" isn't enough, it has to be \"review-ready.\"\n\nWe've spent years refining a model that combines top-tier global accounting talent with deep knowledge of the US tax and financial landscape.",
    whyWeExistImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    valuesTitle: "Our Core Values",
    values: [
      {
        title: "CPA-First Mentality",
        description: "We prepare every workpaper with the final reviewer in mind.",
        icon: "user-check",
      },
      {
        title: "Data Fort Knox",
        description: "We utilize enterprise-grade security and SOC-compliant protocols to keep your client data safe.",
        icon: "shield-check",
      },
      {
        title: "Radical Transparency",
        description: "No black holes. You have direct access to your team and clear visibility into every task.",
        icon: "eye",
      },
      {
        title: "Continuous Evolution",
        description: "We stay updated on IRS changes and software updates so you don't have to train us.",
        icon: "trending-up",
      },
    ],
    teamTitle: "Accountants Who Speak Your Language",
    teamBody:
      "Our team consists of seasoned professionals who specialize in US-specific niches—from complex 1065 partnerships to Virtual CFO support. We don't just process data; we understand the \"why\" behind the numbers.",
  };

  const data = sanityData || staticData;

  return (
    <>
      {/* Hero Section */}
      <Section
        background="primary"
        spacing="xl"
        className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
      >
        <div className="absolute inset-0 opacity-10">
          {/* Background Image */}
          <Image
            src={data.heroBackgroundImage || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop"}
            alt={data.heroBackgroundImageAlt || "Background"}
            fill
            className="object-cover"
          />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About Us" },
            ]}
            className="mb-8 text-primary-200"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                {data.heroTitle}
                <br />
                {data.heroTitleHighlight && (
                  <span className="text-secondary-400">
                    {data.heroTitleHighlight}
                  </span>
                )}
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
                {data.heroDescription}
              </p>
            </div>
            <div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up hidden lg:block"
              style={{ animationDelay: "0.2s" }}
            >
              <Image
                src={data.heroImage || staticData.heroImage}
                alt={data.heroImageAlt || "About Us"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Why We Exist Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image - Left Side */}
            <div className="relative h-[25rem] lg:h-[31.25rem] rounded-2xl overflow-hidden shadow-lg animate-fade-in-left">
              <Image
                src={data.whyWeExistImage || staticData.whyWeExistImage}
                alt={data.whyWeExistImageAlt || data.whyWeExistTitle || staticData.whyWeExistTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Content - Right Side */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                {data.whyWeExistTitle || staticData.whyWeExistTitle}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
                {data.whyWeExistBody || staticData.whyWeExistBody}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section background="gray" spacing="lg">
        <Container>
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {data.valuesTitle || staticData.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(data.values || staticData.values).map((value: any, index: number) => {
              const iconName = value.icon || 'check-circle';
              const Icon = (LucideIcons as any)[
                iconName.split('-').map((word: string) =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join('')
              ] || LucideIcons.CheckCircle;

              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section background="white" spacing="md">
        <Container>
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              {data.teamTitle || staticData.teamTitle}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {data.teamBody || staticData.teamBody}
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section
        background="primary"
        spacing="lg"
        className="bg-gradient-to-r from-primary-700 to-primary-800"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {data.finalCTA?.title || "Ready to Work With Us?"}
            </h2>
            <p className="text-xl mb-8 text-primary-100 leading-relaxed">
              {data.finalCTA?.description || "Get in touch today and discover how we can help your business succeed."}
            </p>
            <div className="flex justify-center">
              <Link href={data.finalCTA?.cta?.link || "/contact"}>
                <Button
                  variant={data.finalCTA?.cta?.variant || "secondary"}
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50"
                >
                  {data.finalCTA?.cta?.text || "Contact Us"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
