import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                    validation: (Rule) => Rule.required(),
                }
            ],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            hidden: true, // Hidden but keep for data migration
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'date', // using date string YYYY-MM-DD
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'authorRole',
            title: 'Author Role',
            type: 'string',
            hidden: true, // Not needed - kept for data migration
        }),
        defineField({
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g. "5 min read"',
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'question',
                        title: 'Question',
                        type: 'string',
                        validation: (Rule) => Rule.required(),
                    },
                    {
                        name: 'answer',
                        title: 'Answer',
                        type: 'text',
                        rows: 3,
                        validation: (Rule) => Rule.required(),
                    }
                ],
                preview: {
                    select: {
                        title: 'question',
                        subtitle: 'answer'
                    }
                }
            }],
        }),
    ],
})
