import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FAQ } from "@/components/ui/FAQ";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { ServiceSectionsAccordion } from "@/components/ui/ServiceSectionsAccordion";
import { notFound } from "next/navigation";
import Link from "next/link";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const query = `*[_type == "service" && slug.current == $slug][0] {
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url
    },
    title,
    description
  }`;
  const service = await client.fetch(query, { slug: params.slug });

  if (service?.seo) {
    return genMeta({
      title: service.seo.metaTitle || service.title,
      description: service.seo.metaDescription || service.description,
      keywords: service.seo.metaKeywords,
      ogImage: service.seo.openGraphImage,
      slug: `/${params.slug}`
    });
  }

  if (service) {
    return genMeta({
      title: service.title,
      description: service.description,
      slug: `/${params.slug}`
    });
  }

  return genMeta({
    title: "Service Not Found",
    description: "The requested service could not be found.",
  });
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* 1. Hero Section */}
      <Section
        background="white"
        spacing="xl"
        className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src={service.heroBackgroundImage || service.heroImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop'}
            alt={service.heroBackgroundImageAlt || "Background"}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: service.title },
            ]}
            className="mb-8 text-primary-200"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight break-words">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl leading-relaxed">
                {service.longDescription}
              </p>
              <Link href={service.heroCTA?.link || "/contact"}>
                <Button
                  variant={service.heroCTA?.variant || "secondary"}
                  size="lg"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-12 py-5 text-lg font-bold shadow-xl border-2 border-transparent"
                >
                  {service.heroCTA?.text || "Schedule Free Consultation"}
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block relative h-[31.25rem] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Image
                src={service.heroImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"}
                alt={service.heroImageAlt || service.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Intro/About us Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="animate-fade-in-left order-2 lg:order-1">
              <span className="text-primary-600 font-bold uppercase tracking-[0.2em] text-sm mb-6 block">Overview</span>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight font-primary">
                {service.intro.title}
              </h2>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
                {service.intro.content}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {service.intro.stats.map((stat: { label: string; value: string }, i: number) => (
                  <div key={i} className="p-6 bg-neutral-50 rounded-2xl border-l-4 border-primary-600">
                    <div className="text-4xl font-bold text-primary-700 mb-2">{stat.value}</div>
                    <p className="text-sm text-neutral-500 uppercase font-bold tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[37.5rem] rounded-[60px] overflow-hidden shadow-large animate-fade-in-right order-1 lg:order-2">
              <Image
                src={service.image}
                alt={service.imageAlt || `${service.title} specialists`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent"></div>
            </div>
          </div>
        </Container>
      </Section>


      <Section background="gray" spacing="lg" className="py-24 md:py-32">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Comprehensive Service Delivery
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed font-medium">
              Detailed breakdown of our {service.title} expertise and deliverables.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ServiceSectionsAccordion serviceAreas={service.serviceAreas} />
          </div>
        </Container>
      </Section>

      {/* Service Areas CTA */}
      <Section background="primary" spacing="md" className="bg-gradient-to-r from-neutral-800 to-neutral-900">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.introCTA?.title || "Ready to Get Started?"}</h3>
              <p className="text-base md:text-lg text-neutral-300">{service.introCTA?.description || "Get a customized quote for your business needs"}</p>
            </div>
            <div className="flex-shrink-0">
              <Link href={service.introCTA?.cta?.link || "/contact"}>
                <Button
                  variant={service.introCTA?.cta?.variant || "secondary"}
                  size="lg"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-10 py-4 text-base md:text-lg font-bold shadow-xl whitespace-nowrap"
                >
                  {service.introCTA?.cta?.text || "Request a Quote"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Our Process Section */}
      <Section background="white" spacing="lg" id="methodology">
        <Container>
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Proven Implementation</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-medium">
              We follow a rigorous methodology to ensure your {service.title} transition is effortless and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-neutral-100 -z-10"></div>
            {service.process.map((step: { step: string; title: string; description: string }, index: number) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="w-24 h-24 bg-white border-8 border-primary-50 text-primary-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-8 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-500 shadow-xl">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Why choose us Section */}
      <Section background="primary" spacing="lg" className="bg-neutral-900 text-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative">
            <div className="animate-fade-in-left lg:col-span-7">
              <span className="text-secondary-400 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Why Partner With Us</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight text-white">The {service.title} <br />Advantage</h2>
              <div className="space-y-8">
                {service.whyChooseUs.map((item: { title: string; description: string }, index: number) => (
                  <div key={index} className="flex gap-8 group animate-fade-in-up" style={{ animationDelay: `${index * 0.15 + 0.2}s` }}>
                    <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-[20px] flex items-center justify-center text-secondary-400 border border-white/10 group-hover:bg-secondary-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                      <p className="text-base text-neutral-400 leading-relaxed max-w-xl">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center mr-[8rem]">
                <Link href={service.whyChooseCTA?.link || "/contact"} className="inline-block">
                  <Button
                    variant={service.whyChooseCTA?.variant || "secondary"}
                    size="lg"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-12 py-4 text-base font-bold shadow-xl"
                  >
                    {service.whyChooseCTA?.text || "Talk to an Expert"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[32rem] lg:h-[38rem] animate-fade-in-right lg:order-2 lg:col-span-5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
              <div className="relative h-full rounded-[60px] overflow-hidden shadow-2xl border-8 border-white/5">
                <Image
                  src={service.whyPartnerImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1200&fit=crop"}
                  alt={service.whyPartnerImageAlt || "Client success story"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-1 bg-secondary-500"></div>
                    <span className="text-secondary-400 font-bold uppercase tracking-widest text-xs">
                      {service.whyPartnerImageLabel || "Innovation Partner"}
                    </span>
                  </div>
                  <p className="text-2xl text-white font-bold leading-tight">
                    {service.whyPartnerImageTagline || "Driving performance through strategic financial leadership."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>


      {service.testimonials && service.testimonials.length > 0 && (
        <Section background="gray" spacing="lg">
          <Container>
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {service.testimonialsTitle || "Client Success Stories"}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {service.testimonialsDescription || `Hear from businesses who trust our ${service.title} expertise`}
              </p>
            </div>
            <TestimonialSlider
              testimonials={service.testimonials.map((t: any) => ({
                quote: t.quote,
                author: t.author,
                role: t.role,
                company: t.company,
              }))}
            />
          </Container>
        </Section>
      )}

      {/* 7. FAQ Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-neutral-600 font-medium">
                Detailed answers to the most common questions regarding our {service.title} services.
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <FAQ items={service.faqs} title="" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. CTA Section */}
      <Section
        background="primary"
        spacing="xl"
        className="bg-secondary-600 text-white text-center relative overflow-hidden py-20 md:py-28"
      >
        <div className="absolute inset-0 bg-primary-900/20"></div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              {service.finalCTA?.title || `Ready to Upgrade Your ${service.title}?`}
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/95 leading-relaxed font-medium">
              {service.finalCTA?.description || "Join elite businesses that trust our experts with their growth. Schedule your strategy session today."}
            </p>
            <div className="flex justify-center">
              <Link href={service.finalCTA?.cta?.link || "/contact"}>
                <Button
                  variant={service.finalCTA?.cta?.variant || "secondary"}
                  size="lg"
                  className="bg-white text-secondary-600 hover:bg-neutral-100 px-10 py-4 text-lg font-bold shadow-2xl rounded-2xl transform hover:scale-105 transition-all border-2 border-transparent"
                >
                  {service.finalCTA?.cta?.text || "Get Started Today"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
