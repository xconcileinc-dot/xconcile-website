import React from "react";
import { cn } from "@/lib/utils";
import { PortableText } from '@/components/ui/PortableText';

interface FeatureCardProps {
  title: string;
  description: string | any[]; // Support both plain text and rich text
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  linkText,
  linkHref,
  className,
}) => {
  const isRichText = Array.isArray(description);

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900">
        {title}
      </h3>
      {isRichText ? (
        <PortableText value={description} className="text-base md:text-lg text-neutral-600 leading-relaxed" />
      ) : (
        <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
          {description}
        </p>
      )}
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          {linkText}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

