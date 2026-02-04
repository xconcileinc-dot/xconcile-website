import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'hireStaff',
    title: 'Hire Staff Position',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'intro', title: 'Intro Section' },
        { name: 'details', title: 'Details' },
        { name: 'content', title: 'Main Content' },
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

        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'hero',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            group: 'hero',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            group: 'hero',
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'text',
            rows: 4,
            group: 'hero',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
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
            name: 'image',
            title: 'Intro Image',
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
            group: 'intro',
        }),
        defineField({
            name: 'introTitle',
            title: 'Intro Title',
            type: 'string',
            group: 'intro',
        }),
        defineField({
            name: 'introContent',
            title: 'Intro Content',
            type: 'text',
            group: 'intro',
        }),
        defineField({
            name: 'introStats',
            title: 'Intro Stats',
            type: 'array',
            of: [{ type: 'stat' }],
            group: 'intro',
        }),
        // Role Specific Fields
        defineField({
            name: 'experienceLevels',
            title: 'Experience Levels',
            type: 'array',
            group: 'details',
            of: [
                {
                    type: 'object',
                    name: 'experienceLevel',
                    fields: [
                        defineField({ name: 'level', type: 'string', title: 'Level', options: { list: ['Junior', 'Mid', 'Senior'] } }),
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'experience', type: 'string', title: 'Experience' }),
                        defineField({ name: 'responsibilities', type: 'array', title: 'Responsibilities', of: [{ type: 'string' }] }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'softwareCategories',
            title: 'Software Integration',
            type: 'array',
            group: 'details',
            of: [
                {
                    type: 'object',
                    name: 'softwareCategory',
                    title: 'Software Category',
                    fields: [
                        { name: 'category', type: 'string', title: 'Category' },
                        {
                            name: 'platforms',
                            type: 'array',
                            title: 'Platforms',
                            of: [{
                                type: 'object',
                                name: 'platform',
                                title: 'Platform',
                                fields: [
                                    { name: 'name', type: 'string', title: 'Software Name' },
                                    {
                                        name: 'logo',
                                        type: 'image',
                                        title: 'Logo (Optional)',
                                        options: { hotspot: true },
                                        fields: [
                                            {
                                                name: 'alt',
                                                type: 'string',
                                                title: 'Alternative Text',
                                                description: 'Important for SEO and accessibility',
                                            }
                                        ]
                                    },
                                ],
                                preview: {
                                    select: {
                                        name: 'name',
                                        logo: 'logo'
                                    },
                                    prepare({ name, logo }) {
                                        return {
                                            title: name || 'Unnamed Platform',
                                            media: logo
                                        }
                                    }
                                }
                            }]
                        },
                    ],
                    preview: {
                        select: {
                            category: 'category',
                            platforms: 'platforms'
                        },
                        prepare({ category, platforms }) {
                            const count = platforms && Array.isArray(platforms) ? platforms.length : 0
                            return {
                                title: category || 'Unnamed Category',
                                subtitle: count > 0 ? `${count} platform(s)` : 'No platforms'
                            }
                        }
                    }
                },
            ],
        }),
        defineField({
            name: 'trial',
            title: 'Risk-Free Trial',
            type: 'object',
            group: 'details',
            hidden: true, // Hidden - trial section removed from page
            fields: [
                defineField({ name: 'duration', type: 'string' }),
                defineField({ name: 'description', type: 'text' }),
            ],
        }),
        // // Standard Sections
        // defineField({
        //     name: 'features',
        //     title: 'Features',
        //     type: 'array',
        //     of: [{ type: 'feature' }],
        //     group: 'content',
        // }),
        defineField({
            name: 'gettingStarted',
            title: 'Getting Started Steps',
            type: 'array',
            of: [{ type: 'processStep' }],
            group: 'content',
        }),
        defineField({
            name: 'whyChooseUs',
            title: 'Why Choose Us',
            type: 'array',
            of: [{ type: 'feature' }],
            group: 'content',
        }),
        defineField({
            name: 'whyPartnerImage',
            title: 'Why Partner With Us Image',
            type: 'image',
            description: 'Image displayed in the "Why Partner With Us" section',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                }
            ],
            group: 'content',
        }),
        defineField({
            name: 'whyPartnerImageLabel',
            title: 'Why Partner Image - Label',
            type: 'string',
            description: 'Small label text displayed on the image (e.g., "Innovation Partner")',
            group: 'content',
        }),
        defineField({
            name: 'whyPartnerImageTagline',
            title: 'Why Partner Image - Tagline',
            type: 'text',
            rows: 2,
            description: 'Tagline text displayed on the image',
            group: 'content',
        }),
        defineField({
            name: 'testimonialsTitle',
            title: 'Testimonials Section Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'testimonialsDescription',
            title: 'Testimonials Section Description',
            type: 'text',
            rows: 2,
            group: 'content',
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'testimonial' }],
            group: 'content',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{ type: 'faq' }],
            group: 'content',
        }),
        // CTAs
        defineField({
            name: 'heroCTA',
            title: 'Hero CTA',
            type: 'cta',
            group: 'hero',
        }),
        defineField({
            name: 'introCTA',
            title: 'After Intro CTA Section',
            type: 'finalCtaSection',
            group: 'intro',
        }),
        defineField({
            name: 'whyChooseCTA',
            title: 'Why Choose Us CTA',
            type: 'cta',
            group: 'content',
        }),
        defineField({
            name: 'finalCTA',
            title: 'Final CTA Section',
            type: 'finalCtaSection',
            group: 'content',
        }),
        // Fallback
        defineField({
            name: 'process',
            title: 'Process (Fallback)',
            type: 'array',
            of: [{ type: 'processStep' }],
            group: 'content',
            hidden: true,
        }),
    ],
})
