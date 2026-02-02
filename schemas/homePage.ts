import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'trust', title: 'Trust Indicators' },
        { name: 'testimonials', title: 'Testimonials' },
        { name: 'features', title: 'Features' },
        { name: 'partners', title: 'Partners' },
        { name: 'blog', title: 'Blog Section' },
        { name: 'faq', title: 'FAQ Section' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // SEO
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            group: 'seo',
        }),

        // Hero Section
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroTitleHighlight',
            title: 'Hero Title Highlight',
            type: 'string',
            description: 'The part of the title that stands out (e.g. "Done Right")',
            group: 'hero',
        }),
        defineField({
            name: 'heroBackgroundImage',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                }
            ],
            group: 'hero',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                    validation: (Rule) => Rule.required(),
                }
            ],
            group: 'hero',
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Stats',
            type: 'array',
            of: [{ type: 'stat' }],
            group: 'hero',
        }),

        // Introduction Section
        defineField({
            name: 'introductionTitle',
            title: 'Introduction Title',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'introductionBody',
            title: 'Introduction Body',
            type: 'text',
            rows: 5,
            group: 'hero',
        }),
        defineField({
            name: 'introductionImage',
            title: 'Introduction Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                    validation: (Rule) => Rule.required(),
                }
            ],
            group: 'hero',
        }),
        defineField({
            name: 'introductionCta',
            title: 'Introduction CTA',
            type: 'object',
            description: 'Call-to-action button for the introduction section',
            fields: [
                defineField({ name: 'text', type: 'string', title: 'Button Text', initialValue: 'Learn More' }),
                defineField({ name: 'link', type: 'string', title: 'Button Link', initialValue: '/contact' }),
            ],
            group: 'hero',
        }),

        // Trust Indicators
        defineField({
            name: 'trustTitle',
            title: 'Trust Section Title',
            type: 'string',
            group: 'trust',
        }),
        defineField({
            name: 'trustDescription',
            title: 'Trust Section Description',
            type: 'text',
            group: 'trust',
        }),
        defineField({
            name: 'trustStats',
            title: 'Trust Stats',
            type: 'array',
            of: [{ type: 'stat' }],
            group: 'trust',
        }),

        // Testimonials
        defineField({
            name: 'testimonialsTitle',
            title: 'Testimonials Title',
            type: 'string',
            group: 'testimonials',
        }),
        defineField({
            name: 'testimonialsDescription',
            title: 'Testimonials Description',
            type: 'text',
            group: 'testimonials',
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'testimonial' }],
            group: 'testimonials',
        }),

        // Features
        defineField({
            name: 'featuresTitle',
            title: 'Features Title',
            type: 'string',
            group: 'features',
        }),
        defineField({
            name: 'featuresDescription',
            title: 'Features Description',
            type: 'text',
            group: 'features',
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            group: 'features',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({
                            name: 'description',
                            type: 'array',
                            title: 'Description',
                            of: [{ type: 'block' }]
                        }),
                        defineField({
                            name: 'linkText',
                            type: 'string',
                            title: 'Link Text',
                            hidden: true,
                            description: 'Deprecated: Links are no longer displayed on home page features'
                        }),
                        defineField({
                            name: 'linkHref',
                            type: 'string',
                            title: 'Link URL',
                            hidden: true,
                            description: 'Deprecated: Links are no longer displayed on home page features'
                        }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative Text',
                                    description: 'Important for SEO and accessibility',
                                    validation: (Rule) => Rule.required(),
                                }
                            ]
                        }),
                    ],
                },
            ],
        }),

        // Partners
        defineField({
            name: 'partnersTitle',
            title: 'Partners Title',
            type: 'string',
            group: 'partners',
        }),
        defineField({
            name: 'partnersDescription',
            title: 'Partners Description',
            type: 'text',
            group: 'partners',
        }),
        defineField({
            name: 'partners',
            title: 'Partner Names',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string', title: 'Partner Name' }),
                        defineField({
                            name: 'logo',
                            type: 'image',
                            title: 'Logo',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative Text',
                                    description: 'Important for SEO and accessibility',
                                }
                            ]
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            media: 'logo',
                        },
                    },
                },
            ],
            group: 'partners',
        }),

        // Blog Section
        defineField({
            name: 'blogTitle',
            title: 'Blog Section Title',
            type: 'string',
            group: 'blog',
        }),
        defineField({
            name: 'blogDescription',
            title: 'Blog Section Description',
            type: 'text',
            group: 'blog',
        }),

        // FAQ Section
        defineField({
            name: 'faqTitle',
            title: 'FAQ Title',
            type: 'string',
            group: 'faq',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{ type: 'faq' }],
            group: 'faq',
        }),

        // CTA Section
        defineField({
            name: 'finalCTA',
            title: 'Final CTA Section',
            type: 'finalCtaSection',
            group: 'faq',
        }),
    ],
})
