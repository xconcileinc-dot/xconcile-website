import { client } from './client'
import type { BlogPost } from '../blog'

// GROQ query to get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "date": publishedAt,
    author,
    authorRole,
    "image": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    readTime,
    "content": ""
  }`

  return client.fetch(query)
}

// GROQ query to get a single post by slug
export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "date": publishedAt,
    author,
    authorRole,
    "image": mainImage.asset->url + "?updated=" + mainImage.asset->_updatedAt,
    "imageAlt": mainImage.alt,
    readTime,
    faqs,
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url + "?updated=" + openGraphImage.asset->_updatedAt,
      "openGraphImageAlt": openGraphImage.alt
    }
  }`

  return client.fetch(query, { slug })
}

// Get all slugs for generateStaticParams
export async function getAllPostSlugs(): Promise<string[]> {
  const query = `*[_type == "post"].slug.current`
  return client.fetch(query)
}

// Get unique categories
export async function getAllCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "post"].category)`
  return client.fetch(query)
}

// ==================== SERVICES ====================

// GROQ query to get all services
export async function getAllServices() {
  const query = `*[_type == "service"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    features,
    serviceAreas,
    process,
    whyChooseUs,
    testimonial,
    faqs
  }`

  return client.fetch(query)
}

// GROQ query to get a single service by slug
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    features,
    serviceAreas,
    process,
    whyChooseUs,
    "whyPartnerImage": whyPartnerImage.asset->url,
    "whyPartnerImageAlt": whyPartnerImage.alt,
    whyPartnerImageLabel,
    whyPartnerImageTagline,
    testimonialsTitle,
    testimonialsDescription,
    testimonials,
    faqs,
    heroCTA,
    introCTA {
      title,
      description,
      cta
    },
    whyChooseCTA,
    finalCTA {
      title,
      description,
      cta
    },
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    }
  }`

  return client.fetch(query, { slug })
}

// Get all service slugs for generateStaticParams
export async function getAllServiceSlugs(): Promise<string[]> {
  const query = `*[_type == "service"].slug.current`
  return client.fetch(query)
}

// ==================== INDUSTRIES ====================

// GROQ query to get all industries
export async function getAllIndustries() {
  const query = `*[_type == "industry"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    subIndustries,
    industryBenefits,
    gettingStarted,
    features,
    process,
    whyChooseUs,
    testimonials,
    faqs
  }`

  return client.fetch(query)
}

// GROQ query to get a single industry by slug
export async function getIndustryBySlug(slug: string) {
  const query = `*[_type == "industry" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    subIndustries,
    industryBenefits,
    gettingStarted,
    features,
    process,
    whyChooseUs,
    "whyPartnerImage": whyPartnerImage.asset->url,
    "whyPartnerImageAlt": whyPartnerImage.alt,
    whyPartnerImageLabel,
    whyPartnerImageTagline,
    testimonialsTitle,
    testimonialsDescription,
    testimonials,
    faqs,
    heroCTA,
    introCTA {\n      title,\n      description,\n      cta\n    },
    whyChooseCTA,
    finalCTA {
      title,
      description,
      cta
    },
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    }
  }`

  return client.fetch(query, { slug })
}

// Get all industry slugs for generateStaticParams
export async function getAllIndustrySlugs(): Promise<string[]> {
  const query = `*[_type == "industry"].slug.current`
  return client.fetch(query)
}

// ==================== HIRE STAFF ====================

// GROQ query to get all hire staff positions
export async function getAllHireStaff() {
  const query = `*[_type == "hireStaff"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    experienceLevels,
    softwareCategories,
    trial,
    features,
    gettingStarted,
    whyChooseUs,
    testimonial,
    faqs,
    process
  }`

  return client.fetch(query)
}

// GROQ query to get a single hire staff position by slug
export async function getHireStaffBySlug(slug: string) {
  const query = `*[_type == "hireStaff" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    description,
    longDescription,
    icon,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "intro": {
      "title": introTitle,
      "content": introContent,
      "stats": introStats
    },
    experienceLevels,
    softwareCategories[] {
      category,
      platforms[] {
        name,
        "logo": logo.asset->url,
        "logoAlt": logo.alt
      }
    },
    trial,
    features,
    gettingStarted,
    whyChooseUs,
    "whyPartnerImage": whyPartnerImage.asset->url,
    "whyPartnerImageAlt": whyPartnerImage.alt,
    whyPartnerImageLabel,
    whyPartnerImageTagline,
    testimonialsTitle,
    testimonialsDescription,
    testimonials,
    faqs,
    process,
    heroCTA,
    introCTA {\n      title,\n      description,\n      cta\n    },
    whyChooseCTA,
    finalCTA {
      title,
      description,
      cta
    },
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    }
  }`

  return client.fetch(query, { slug })
}

// Get all hire staff slugs for generateStaticParams
// Get all hire staff slugs for generateStaticParams
export async function getAllHireStaffSlugs(): Promise<string[]> {
  const query = `*[_type == "hireStaff"].slug.current`
  return client.fetch(query)
}

// ==================== HOME PAGE ====================

// GROQ query to get home page data
export async function getHomePage() {
  const query = `*[_type == "homePage"][0] {
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    },
    heroTitle,
    heroTitleHighlight,
    heroTitle,
    heroTitleHighlight,
    heroDescription,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    heroStats,
    introductionTitle,
    introductionBody,
    introductionCta {
      text,
      link
    },
    "introductionImage": introductionImage.asset->url,
    "introductionImageAlt": introductionImage.alt,
    trustTitle,
    trustDescription,
    trustStats,
    testimonialsTitle,
    testimonialsDescription,
    testimonials,
    featuresTitle,
    featuresDescription,
    features[] {
      title,
      description,
      linkText,
      linkHref,
      "image": image.asset->url,
      "imageAlt": image.alt
    },
    partnersTitle,
    partnersDescription,
    partners[] {
      name,
      "logo": logo.asset->url,
      "logoAlt": logo.alt
    },
    blogTitle,
    blogDescription,
    faqTitle,
    faqs,
    finalCTA {
      title,
      description,
      cta
    }
  }`

  return client.fetch(query)
}

// ==================== ABOUT PAGE ====================

export async function getAboutPage() {
  const query = `*[_type == "aboutPage"][0] {
    seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    },
    heroTitle,
    heroTitleHighlight,
    heroTitle,
    heroTitleHighlight,
    heroDescription,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    whyWeExistTitle,
    whyWeExistBody,
    "whyWeExistImage": whyWeExistImage.asset->url,
    "whyWeExistImageAlt": whyWeExistImage.alt,
    valuesTitle,
    values[] {
      title,
      description,
      icon
    },
    teamTitle,
    teamBody,
    finalCTA {
      title,
      description,
      cta
    }
  }`
  return client.fetch(query)
}

// ==================== CONTACT PAGE ====================

export async function getContactPage() {
  const query = `*[_type == "contactPage"][0] {
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        "openGraphImage": openGraphImage.asset->url
      },
      title,
      description,
      phone,
      email,
      address,
      businessHours
    }`
  return client.fetch(query)
}

export async function getServicesPage() {
  const query = `*[_type == "servicesPage"][0] {
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        "openGraphImage": openGraphImage.asset->url
      },
      title,
      description
    }`
  return client.fetch(query)
}

export async function getIndustriesPage() {
  const query = `*[_type == "industriesPage"][0] {
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        "openGraphImage": openGraphImage.asset->url
      },
      title,
      description
    }`
  return client.fetch(query)
}

export async function getHireStaffPage() {
  const query = `*[_type == "hireStaffPage"][0] {
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        "openGraphImage": openGraphImage.asset->url
      },
      title,
      description
    }`
  return client.fetch(query)
}

export async function getBlogPage() {
  const query = `*[_type == "blogPage"][0] {
      seo {
        metaTitle,
        metaDescription,
        metaKeywords,
        "openGraphImage": openGraphImage.asset->url
      },
      title,
      description,
      newsletterTitle,
      newsletterDescription
    }`
  return client.fetch(query)
}

// ==================== SETTINGS ====================

export async function getSettings() {
  const query = `*[_type == "settings"][0] {
    companyName,
    footerDescription,
    socialLinks[] {
      platform,
      url
    }
  }`
  return client.fetch(query)
}
