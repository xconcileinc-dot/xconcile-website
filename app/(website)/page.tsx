import type { Metadata } from "next";
import Image from "next/image";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TestimonialSlider } from "@/components/ui/TestimonialSlider";
import { StatCard } from "@/components/ui/StatCard";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FAQ } from "@/components/ui/FAQ";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { getHomePage, getAllPosts } from "@/lib/sanity/queries";
import { client } from "@/lib/sanity/client";
import { BlogPost, getAllBlogPosts as getStaticPosts, blogPosts } from "@/lib/blog";

// Enable ISR
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const sanityData = await getHomePage().catch(() => null);

  if (sanityData?.seo) {
    return genMeta({
      title: sanityData.seo.metaTitle,
      description: sanityData.seo.metaDescription,
      keywords: sanityData.seo.metaKeywords,
      ogImage: sanityData.seo.openGraphImage
    });
  }

  return genMeta({
    title: "Home",
    description:
      "We help entrepreneurs master their business with professional support, comprehensive solutions, and real-time insights.",
    keywords: ["business", "consulting", "growth", "entrepreneur", "support"],
  });
}

export default async function HomePage() {
  const [sanityData, sanityPosts] = await Promise.all([
    getHomePage().catch(() => null),
    getAllPosts().catch(() => []),
  ]);

  const staticData = {
    heroTitle: "Professional Services",
    heroTitleHighlight: "Done Right",
    heroDescription:
      "Your business deserves expert attention. We provide dedicated professionals and powerful solutions that work together to help your business succeed and grow.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop",
    heroStats: [
      { label: "Active Clients", value: "10,000+" },
      { label: "In Savings Delivered", value: "$50M+" },
      { label: "Uptime Guarantee", value: "99.9%" },
    ],
    trustTitle: "Trusted by thousands of businesses",
    trustDescription: "Join companies that rely on our expertise",
    trustStats: [
      { label: "Active Clients", value: "10,000+" },
      { label: "Industry Experience", value: "15+ Years" },
      { label: "Support Available", value: "24/7" },
    ],
    testimonialsTitle: "What Our Clients Say",
    testimonialsDescription:
      "Don't just take our word for it—hear from businesses that have transformed their operations with our help.",
    testimonials: [
      {
        quote:
          "The service has transformed how we manage our business operations. The team is professional, responsive, and truly understands our needs.",
        author: "Sarah Johnson",
        role: "CEO",
        company: "Tech Innovations Inc.",
      },
      {
        quote:
          "Outstanding support and expertise. They've helped us streamline our processes and achieve significant cost savings while maintaining quality.",
        author: "Michael Chen",
        role: "Operations Director",
        company: "Global Solutions",
      },
      {
        quote:
          "Working with this team has been a game-changer. Their attention to detail and commitment to excellence is unmatched in the industry.",
        author: "Emily Rodriguez",
        role: "Founder",
        company: "Creative Ventures",
      },
    ],
    featuresTitle: "Everything You Need to Succeed",
    featuresDescription:
      "Comprehensive solutions designed to streamline your operations and drive growth.",
    features: [
      {
        title: "Expert Support",
        description:
          "Get dedicated support from experienced professionals who understand your business needs. Our team is available when you need them, providing personalized guidance and solutions tailored to your specific challenges.",
        linkText: "Learn More",
        linkHref: "/contact",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      },
      {
        title: "Comprehensive Solutions",
        description:
          "Access a full suite of tools and services designed to streamline your operations. From initial setup to ongoing management, we provide everything you need in one integrated platform.",
        linkText: "Learn More",
        linkHref: "/solutions",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      },
      {
        title: "Real-Time Insights",
        description:
          "Stay informed with up-to-date data and analytics. Make confident decisions based on accurate, real-time information that helps you understand your business performance at a glance.",
        linkText: "Learn More",
        linkHref: "/insights",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
      {
        title: "Streamlined Processes",
        description:
          "Simplify complex workflows with our intuitive platform. Reduce manual work, eliminate errors, and focus on what matters most—growing your business and serving your customers.",
        linkText: "Learn More",
        linkHref: "/processes",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      },
    ],
    partnersTitle: "Trusted Partners",
    partnersDescription: "We work with industry-leading platforms",
    partners: [
      { name: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg" },
      { name: "Square", logo: "https://cdn.worldvectorlogo.com/logos/square-1.svg" },
      { name: "QuickBooks", logo: "https://cdn.worldvectorlogo.com/logos/quickbooks.svg" },
      { name: "Salesforce", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" },
      { name: "Microsoft", logo: "https://cdn.worldvectorlogo.com/logos/microsoft.svg" },
      { name: "Google", logo: "https://cdn.worldvectorlogo.com/logos/google-1-1.svg" },
    ],
    blogTitle: "Explore Our Latest Resources",
    blogDescription: "From the Blog",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "What services do you provide?",
        answer:
          "We offer a comprehensive range of professional services tailored to your business needs. Our solutions include expert consultation, process optimization, ongoing support, and access to advanced tools and resources designed to help your business succeed.",
      },
      {
        question: "How quickly can I get started?",
        answer:
          "Getting started is quick and straightforward. After an initial consultation to understand your specific requirements, we can typically have you set up and running within a few business days. Our team will guide you through every step of the process.",
      },
      {
        question: "What kind of support can I expect?",
        answer:
          "You'll have access to our dedicated support team who are available to assist with any questions or issues. We provide multiple channels for support including email, phone, and our online platform, ensuring you can reach us when you need help.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Security is our top priority. We use industry-standard encryption and security measures to protect your data. Our systems are regularly audited and comply with the latest security standards to ensure your information remains safe and confidential.",
      },
    ],
  };

  const data = sanityData || staticData;
  const recentPosts =
    sanityPosts && sanityPosts.length > 0
      ? sanityPosts.slice(0, 3)
      : blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section - Dark Background with Image */}
      <Section
        background="white"
        spacing="xl"
        className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={data.heroBackgroundImage || data.heroImage} // Fallback to heroImage if background not set
            alt={data.heroBackgroundImageAlt || "Background"}
            fill
            className="object-cover"
            priority
          />

        </div>

        <Container className="relative z-10">
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
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white w-full sm:w-auto border-2 border-transparent"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-8 text-sm md:text-base text-primary-200">
                {data.heroStats?.map((stat: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">
                      {stat.value}
                    </span>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="hidden lg:block relative h-[31.25rem] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Image
                src={data.heroImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"} // Fallback to static if main image not set
                alt={data.heroImageAlt || "Business professionals working together"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      <Section background="white" spacing="md">
        <Container>
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
              {data.trustTitle}
            </h2>
            <p className="text-neutral-600">{data.trustDescription}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {data.trustStats?.map((stat: any, index: number) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <StatCard value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Introduction Section */}
      {data.introductionTitle && (
        <Section background="white" spacing="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image - Left Side */}
              <div className="relative h-[25rem] lg:h-[31.25rem] rounded-2xl overflow-hidden animate-fade-in-left">
                {data.introductionImage ? (
                  <Image
                    src={data.introductionImage}
                    alt={data.introductionTitle || "Introduction"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-primary-400 text-6xl">
                      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Content - Right Side */}
              <div className="animate-fade-in-right">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
                  {data.introductionTitle}
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line mb-8">
                  {data.introductionBody}
                </p>
                <Link href={data.introductionCta?.link || "/contact"}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white"
                  >
                    {data.introductionCta?.text || "Learn More"}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Features Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {data.featuresTitle}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {data.featuresDescription}
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {data.features?.map((feature: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-fade-in-up"
              >
                {/* Text Side */}
                <div className={index % 2 === 1 ? "lg:order-last" : ""}>
                  <FeatureCard title={feature.title} description={feature.description} />
                </div>

                {/* Image Side */}
                <div className={`relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:order-first" : ""}`}>
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt || feature.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="bg-secondary-500 hover:bg-secondary-600 text-white"
              >
                Get Started Today
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="gray" spacing="lg">
        <Container>
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {data.testimonialsTitle}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {data.testimonialsDescription}
            </p>
          </div>
          <TestimonialSlider testimonials={data.testimonials || []} />
        </Container>
      </Section>

      {/* Partner Logos */}
      <Section background="white" spacing="md">
        <Container>
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
              {data.partnersTitle}
            </h2>
            <p className="text-neutral-600">
              {data.partnersDescription}
            </p>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll gap-16 items-center py-4">
              {[...(data.partners || []), ...(data.partners || []), ...(data.partners || [])].map((partner: any, i: number) => (
                <div
                  key={i}
                  className="relative w-48 h-16 opacity-100 hover:scale-110 transition-all duration-300 flex-shrink-0 flex items-center justify-center"
                >
                  {partner && partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.logoAlt || partner.name || "Partner Logo"}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-neutral-500 border border-neutral-300 rounded px-3 py-2 whitespace-nowrap">
                      {partner?.name || (typeof partner === 'string' ? partner : "Partner")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Section */}
      <Section background="white" spacing="lg">
        <Container>
          <div className="flex items-center justify-between mb-12 animate-fade-in-up">
            <div>
              <p className="text-sm text-primary-600 font-semibold mb-2 uppercase tracking-wide">
                {data.blogDescription}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {data.blogTitle}
              </h2>
            </div>
            <Link
              href="/resources"
              className="hidden md:block text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post: any, index: number) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card hover className="h-full overflow-hidden">
                  <div className="relative aspect-video mb-4 -m-6">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-3 mb-3 text-sm text-neutral-500">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Learn more →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/resources"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All Resources →
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="white" spacing="lg">
        <Container>
          <FAQ items={data.faqs} title={data.faqTitle} showMoreLink={false} />
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
              {data.finalCTA?.title || "Ready to Get Started?"}
            </h2>
            <p className="text-xl mb-8 text-primary-100 leading-relaxed">
              {data.finalCTA?.description || "Join thousands of businesses that trust us with their operations. Schedule a consultation today and see how we can help your business grow."}
            </p>
            <div className="flex justify-center">
              <Link href={data.finalCTA?.cta?.link || "/contact"}>
                <Button
                  variant={data.finalCTA?.cta?.variant || "secondary"}
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 border-2 border-transparent"
                >
                  {data.finalCTA?.cta?.text || "Schedule a Call"}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
