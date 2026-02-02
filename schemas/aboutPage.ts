import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'whyWeExist', title: 'Why We Exist' },
        { name: 'values', title: 'Core Values' },
        { name: 'team', title: 'Team' },
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
            group: 'hero',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
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

        // Why We Exist
        defineField({
            name: 'whyWeExistTitle',
            title: 'Why We Exist Title',
            type: 'string',
            group: 'whyWeExist',
        }),
        defineField({
            name: 'whyWeExistBody',
            title: 'Why We Exist Body',
            type: 'text',
            rows: 5,
            group: 'whyWeExist',
        }),
        defineField({
            name: 'whyWeExistImage',
            title: 'Why We Exist Image',
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
            group: 'whyWeExist',
        }),

        // Core Values
        defineField({
            name: 'valuesTitle',
            title: 'Values Title',
            type: 'string',
            group: 'values',
        }),
        defineField({
            name: 'values',
            title: 'Values List',
            type: 'array',
            group: 'values',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'description', type: 'text', title: 'Description' }),
                        defineField({
                            name: 'icon',
                            type: 'string',
                            title: 'Icon Name',
                            description: 'Lucide icon name (e.g., shield-check, lock, eye, trending-up)'
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'icon',
                        },
                    },
                }
            ],
        }),

        // Team Section
        defineField({
            name: 'teamTitle',
            title: 'Team Section Title',
            type: 'string',
            group: 'team',
        }),
        defineField({
            name: 'teamBody',
            title: 'Team Section Body',
            type: 'text',
            rows: 4,
            group: 'team',
        }),

        // CTA Section
        defineField({
            name: 'finalCTA',
            title: 'Final CTA Section',
            type: 'finalCtaSection',
            group: 'team',
        }),
    ],
})
