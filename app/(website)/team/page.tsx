import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { getAllTeamMembers } from "@/lib/sanity/teamQueries"
import { generateMetadata as genMeta } from "@/lib/seo"

// Enable ISR
export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    return genMeta({
        title: "Meet Our Team",
        description: "Get to know the talented professionals behind our success. Our team brings expertise, dedication, and passion to every project.",
        keywords: ["team", "professionals", "experts", "leadership", "staff"],
        slug: "/team"
    })
}

export default async function TeamPage() {
    const teamMembers = await getAllTeamMembers().catch(() => [])

    // Static fallback data if CMS is not populated yet
    const staticTeamMembers = [
        {
            _id: "1",
            name: "Pranav Jani",
            slug: { current: "pranav-jani" },
            role: "Founder & Senior Tax Consultant",
            bio: "Pranav brings more than a decade of hands-on experience in the global accounting industry. His core expertise lies in US Federal Tax Laws, multi-state compliance requirements, and building robust, scalable accounting systems.\n\nThroughout his career, Pranav has served as a trusted advisor to numerous US corporations, CPA firms, and US tax expatriates, helping them navigate complex tax and business matters. He is a qualified Indian Chartered Accountant and a CPA graduate of AICPA, reflecting his strong commitment to professional excellence and global accounting standards.",
            image: "",
            experience: "10+ years",
            certifications: ["Indian Chartered Accountant", "CPA Graduate (AICPA)"],
            expertise: ["US Federal Tax Laws", "State Compliance", "Accounting Systems"],
            order: 1,
            featured: false,
        },
        {
            _id: "2",
            name: "Ravi Thanki",
            slug: { current: "ravi-thanki" },
            role: "Senior Accounting Manager",
            bio: "With over eight years of experience in global accounting, Ravi has developed a strong specialization in US Accounting and Bookkeeping, where accuracy and process efficiency are critical. He has worked extensively with multiple US CPA firms, managing complete accounting cycles from day-to-day bookkeeping through to finalization.\n\nRavi has in-depth expertise in QuickBooks Desktop and QuickBooks Online, along with various automation tools that improve workflow efficiency. He is an Inter-Chartered Accountant certified by ICAI, underscoring his technical proficiency and dedication to high-quality accounting practices.",
            image: "",
            experience: "8+ years",
            certifications: ["Inter-Chartered Accountant (ICAI)"],
            expertise: ["US Accounting", "Bookkeeping", "QuickBooks Expert", "Process Automation"],
            order: 2,
            featured: false,
        },
        {
            _id: "3",
            name: "Dhara Thanki",
            slug: { current: "dhara-thanki" },
            role: "Accounting Specialist",
            bio: "Dhara brings more than five years of professional experience in global accounting, having played a key role in supporting and streamlining operations for several reputed CPA firms. Her skill set spans US Accounting and Bookkeeping, Sales Tax, Payroll Compliance, and Tax Preparation services.\n\nShe is highly proficient in a wide range of accounting and tax software, including QuickBooks, Lacerte, Drake, and other utility tools. Known for her strong work ethic and reliability, Dhara consistently delivers exceptional support, particularly during peak compliance and deadline-driven periods, making her a valuable asset to the firms she serves.",
            image: "",
            experience: "5+ years",
            certifications: [],
            expertise: ["US Accounting", "Bookkeeping Services", "Sales Tax", "Payroll Compliance", "Tax Preparation"],
            order: 3,
            featured: false,
        }
    ]

    const displayMembers = teamMembers.length > 0 ? teamMembers : staticTeamMembers

    return (
        <>
            {/* Hero Section */}
            <Section
                background="white"
                spacing="xl"
                className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden"
            >
                <Container className="relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                            Meet Our <span className="text-secondary-400">Team</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
                            Get to know the talented professionals behind our success. Our team brings expertise,
                            dedication, and passion to every project, ensuring exceptional results for our clients.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Team Members Alternating Layout */}
            <Section background="white" spacing="lg">
                <Container>
                    {displayMembers.length > 0 ? (
                        <div className="space-y-20 md:space-y-28">
                            {displayMembers.map((member, index) => (
                                <div
                                    key={member._id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-fade-in-up`}
                                    style={{ animationDelay: `${index * 0.15}s` }}
                                >
                                    {/* Image Side */}
                                    <div className={`relative h-[28rem] lg:h-[36rem] w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-700"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                                <div className="text-primary-400">
                                                    <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}

                                        {/* Featured Badge */}
                                        {member.featured && (
                                            <div className="absolute top-6 right-6 bg-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Side */}
                                    <div className={index % 2 === 1 ? "lg:order-first" : ""}>
                                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
                                            {member.name}
                                        </h2>
                                        <p className="text-xl text-primary-600 font-semibold mb-6">
                                            {member.role}
                                        </p>

                                        {/* Experience */}
                                        {member.experience && (
                                            <div className="flex items-center gap-2 text-base text-neutral-600 mb-6">
                                                <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="font-medium">{member.experience} experience</span>
                                            </div>
                                        )}

                                        {/* Bio */}
                                        <div className="prose prose-lg max-w-none mb-6">
                                            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                                                {member.bio}
                                            </p>
                                        </div>

                                        {/* Certifications */}
                                        {member.certifications && member.certifications.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Certifications</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {member.certifications.map((cert, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 border border-primary-200"
                                                        >
                                                            {cert}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Expertise */}
                                        {member.expertise && member.expertise.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold text-neutral-900 mb-3 uppercase tracking-wide">Areas of Expertise</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {member.expertise.map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 border border-secondary-200"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">👥</div>
                            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                                No Team Members Yet
                            </h2>
                            <p className="text-neutral-600">
                                Team members will appear here once they are added to the CMS.
                            </p>
                        </div>
                    )}
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
                            Want to Join Our Team?
                        </h2>
                        <p className="text-xl mb-8 text-primary-100 leading-relaxed">
                            We're always looking for talented professionals to join our growing team.
                            If you're passionate about what you do and want to make an impact, we'd love to hear from you.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 font-medium rounded-lg bg-white text-primary-700 hover:bg-primary-50 border-2 border-transparent transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    )
}
