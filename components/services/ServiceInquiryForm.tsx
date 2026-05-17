"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

const SERVICE_OPTIONS = [
    { value: "tax-preparation", label: "Tax Preparation" },
    { value: "sales-use-tax-compliance", label: "Sales & Use Tax Compliance" },
    { value: "bookkeeping", label: "Bookkeeping" },
    { value: "payroll", label: "Payroll" },
    { value: "full-service-accounting", label: "Full-Service Accounting" },
    { value: "cfo-support", label: "CFO Support" },
    { value: "account-cleanup", label: "Account Cleanup" },
    { value: "other", label: "Other" },
];

const TRUST_SIGNALS = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        label: "Fast Response",
        desc: "We reply within 1 business day",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        label: "100% Confidential",
        desc: "Your information stays private",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        label: "Tailored Solutions",
        desc: "Custom plans for your business",
    },
];

const inputClass =
    "w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 bg-neutral-50 focus:bg-white transition-colors outline-none";

interface ServiceInquiryFormProps {
    serviceSlug: string;
    serviceTitle: string;
}

export function ServiceInquiryForm({ serviceSlug, serviceTitle }: ServiceInquiryFormProps) {
    const validSlug = SERVICE_OPTIONS.some((o) => o.value === serviceSlug)
        ? serviceSlug
        : "other";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: validSlug,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string | null;
    }>({ type: null, message: null });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: null });

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, pageUrl: window.location.href }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to submit form");

            setStatus({ type: "success", message: "Thank you! We'll reach out within 1 business day." });
            setFormData({ name: "", email: "", phone: "", company: "", service: validSlug, message: "" });
        } catch (err) {
            setStatus({
                type: "error",
                message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section
            background="primary"
            spacing="xl"
            className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden"
        >
            {/* Decorative blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-48 -right-48 w-[32rem] h-[32rem] bg-secondary-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-48 -left-48 w-[32rem] h-[32rem] bg-primary-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[20rem] bg-primary-700/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — copy & trust signals */}
                    <div className="text-white">
                        <span className="inline-block text-secondary-400 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                            Start Today
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
                            Ready to Transform Your{" "}
                            <span className="text-secondary-400">{serviceTitle}?</span>
                        </h2>

                        <p className="text-lg text-primary-200 mb-12 leading-relaxed">
                            Let our experts build a tailored solution for your business. Fill in the
                            form and we&apos;ll reach out within one business day.
                        </p>

                        <div className="space-y-6">
                            {TRUST_SIGNALS.map((item) => (
                                <div key={item.label} className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-secondary-400 flex-shrink-0 border border-white/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-base">{item.label}</p>
                                        <p className="text-sm text-primary-300 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider + tagline */}
                        <div className="mt-12 pt-10 border-t border-white/10">
                            <p className="text-primary-300 text-sm">
                                Trusted by hundreds of businesses across the country. No commitment
                                required — just a conversation.
                            </p>
                        </div>
                    </div>

                    {/* Right — form card */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-large">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-neutral-900">Send Us a Message</h3>
                            <p className="text-neutral-500 text-sm mt-1">Fields marked * are required.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {status.message && (
                                <div
                                    className={`p-4 rounded-xl text-sm font-medium ${status.type === "success"
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                        }`}
                                >
                                    {status.message}
                                </div>
                            )}

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                        Work Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        placeholder="john@company.com"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Phone + Company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        placeholder="+1 (234) 567-8900"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        placeholder="Your Company"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Service of Interest — auto-populated */}
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Service of Interest *
                                </label>
                                <div className="relative">
                                    <select
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className={`${inputClass} appearance-none pr-10`}
                                    >
                                        {SERVICE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder={`Tell us about your ${serviceTitle} needs...`}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full bg-secondary-600 hover:bg-secondary-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl text-base font-bold"
                            >
                                {isSubmitting ? "Sending…" : "Send Message →"}
                            </Button>
                        </form>
                    </div>

                </div>
            </Container>
        </Section>
    );
}
