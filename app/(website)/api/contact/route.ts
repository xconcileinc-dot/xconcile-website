import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/lib/sanity/env'
import { transporter } from '@/lib/mailer'
import { buildAdminEmail } from '@/lib/emails/adminEmail'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, phone, company, service, message, pageUrl } = body

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, Email, and Message are required fields.' },
                { status: 400 }
            )
        }

        const token = process.env.SANITY_API_TOKEN
        if (!token) {
            console.error('Missing SANITY_API_TOKEN')
            return NextResponse.json(
                { error: 'Internal Server Error: Missing API configuration' },
                { status: 500 }
            )
        }

        const submittedAt = new Date().toISOString()

        // Save to Sanity
        const client = createClient({
            projectId,
            dataset,
            apiVersion,
            token,
            useCdn: false,
        })

        try {
            await client.create({
                _type: 'contactSubmission',
                name,
                email,
                phone,
                company,
                service,
                message,
                status: 'new',
                submittedAt,
            })
        } catch (sanityError) {
            console.error('Sanity save failed:', sanityError)
        }

        const adminEmail = process.env.ADMIN_EMAIL
        const smtpUser = process.env.SMTP_USER

        if (adminEmail && smtpUser) {
            const { subject: adminSubject, html: adminHtml } = buildAdminEmail({
                name, email, phone, company, service, message, submittedAt, pageUrl,
            })

            try {
    await transporter.sendMail({
        from: `"xConcile" <${smtpUser}>`,
        to: adminEmail,
        subject: adminSubject,
        html: adminHtml,
    });
} catch (emailError) {
    console.error("Email sending failed:", emailError);

    return NextResponse.json(
        {
            success: false,
            error: "Unable to send email.",
        },
        {
            status: 500,
        }
    );
}
}
