"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-soft">
      {/* Header – clickable on mobile to toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 lg:cursor-default"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900 uppercase tracking-wider">
          <svg
            className="w-4 h-4 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h10M4 18h10"
            />
          </svg>
          Table of Contents
        </span>
        <svg
          className={`w-4 h-4 text-neutral-500 transition-transform lg:hidden ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Nav list – always visible on lg, collapsible on mobile */}
      <nav
        className={`border-t border-neutral-100 px-4 pb-4 pt-2 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <ul className="space-y-0.5">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(heading.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block text-sm py-1.5 px-2 rounded-lg transition-all duration-150 leading-snug ${
                  activeId === heading.id
                    ? "text-primary-600 font-medium bg-primary-50 border-l-2 border-primary-500 pl-3"
                    : "text-neutral-600 hover:text-primary-600 hover:bg-neutral-50"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
