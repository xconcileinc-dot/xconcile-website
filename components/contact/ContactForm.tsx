"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";

export function ContactForm({ data }: { data: any }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "tax-preparation",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string | null;
    }>({ type: null, message: null });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: null });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit form");
            }

            setStatus({
                type: "success",
                message: "Thank you! Your message has been sent successfully.",
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service: "tax-preparation",
                message: "",
            });
        } catch (error) {
            setStatus({
                type: "error",
                message:
                    error instanceof Error ? error.message : "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Contact Form & Info */}
            <Section background="white" spacing="lg">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                                Send Us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {status.message && (
                                    <div
                                        id="contact-form-status"
                                        className={`contact-form-status p-4 rounded-lg ${status.type === "success"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-700"
                                            }`}
                                    >
                                        {status.message}
                                    </div>
                                )}

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Work Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                                        placeholder="+1 (234) 567-8900"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="company"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="service"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Service of Interest *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                                    >
                                        <option value="tax-preparation">Tax Preparation</option>
                                        <option value="sales-use-tax-compliance">Sales & Use Tax Compliance</option>
                                        <option value="bookkeeping">Bookkeeping</option>
                                        <option value="payroll">Payroll</option>
                                        <option value="full-service-accounting">Full-Service Accounting</option>
                                        <option value="cfo-support">CFO Support</option>
                                        <option value="account-cleanup">Account Cleanup</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-neutral-700 mb-2"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:opacity-50"
                                        placeholder="Tell us about your project or question..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="w-full bg-secondary-600 hover:bg-secondary-700 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                                Contact Information
                            </h2>
                            <div className="space-y-6 mb-8">
                                {data.phone && (
                                    <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                                        <Card className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        className="w-6 h-6 text-primary-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                                        Phone
                                                    </h3>
                                                    <a
                                                        href={`tel:${data.phone}`}
                                                        className="text-neutral-600 hover:text-primary-600"
                                                    >
                                                        {data.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}

                                {data.email && (
                                    <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                                        <Card className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        className="w-6 h-6 text-primary-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                                        Email
                                                    </h3>
                                                    <a
                                                        href={`mailto:${data.email}`}
                                                        className="text-neutral-600 hover:text-primary-600"
                                                    >
                                                        {data.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}

                                {data.address && (
                                    <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                                        <Card className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        className="w-6 h-6 text-primary-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                                        Address
                                                    </h3>
                                                    <p className="text-neutral-600 whitespace-pre-line">
                                                        {data.address}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </div>

                            {data.businessHours && data.businessHours.length > 0 && (
                                <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                                    <Card className="p-6 bg-primary-50">
                                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                            Business Hours
                                        </h3>
                                        <div className="space-y-2 text-neutral-600">
                                            {data.businessHours.map((hour: any, idx: number) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span>{hour.days}</span>
                                                    <span>{hour.hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </Container >
            </Section >
        </>
    );
}
