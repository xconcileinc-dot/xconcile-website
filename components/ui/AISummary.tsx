"use client";

interface AISummaryProps {
  title: string;
  url: string;
}

const AI_MODELS = [
  {
    name: "ChatGPT",
    description: "OpenAI",
    baseUrl: "https://chatgpt.com/",
    param: "q",
    color: "#10a37f",
    bg: "#f0fdf9",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.109v-5.678a.79.79 0 0 0-.402-.68zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    description: "Anthropic",
    baseUrl: "https://claude.ai/new",
    param: "q",
    color: "#d97706",
    bg: "#fffbeb",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13v6l5 3-1 1.73L9 14V7h2z" />
      </svg>
    ),
  },
  {
    name: "Perplexity",
    description: "AI Search",
    baseUrl: "https://www.perplexity.ai/search",
    param: "q",
    color: "#6366f1",
    bg: "#f5f3ff",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    description: "Google AI",
    baseUrl: "https://gemini.google.com/app",
    param: "q",
    color: "#1a73e8",
    bg: "#eff6ff",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-5l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z" />
      </svg>
    ),
  },
  {
    name: "Grok",
    description: "xAI",
    baseUrl: "https://x.com/i/grok",
    param: "text",
    color: "#111827",
    bg: "#f9fafb",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function AISummary({ title, url }: AISummaryProps) {
  const prompt = `Please summarize and analyze this blog post for me. Provide:\n1. A brief summary (3-4 sentences)\n2. Key takeaways (bullet points)\n3. Main insights\n\nTitle: "${title}"\nURL: ${url}`;

  const handleClick = (model: (typeof AI_MODELS)[0]) => {
    const fullUrl = `${model.baseUrl}?${model.param}=${encodeURIComponent(prompt)}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-soft">
      <div className="px-5 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">AI Summary</p>
            <p className="text-xs text-neutral-500">Summarize with your preferred AI</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {AI_MODELS.map((model) => (
          <button
            key={model.name}
            onClick={() => handleClick(model)}
            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-white hover:border-primary-200 hover:shadow-sm transition-all duration-150 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ backgroundColor: model.bg, color: model.color }}
            >
              {model.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 leading-none">
                {model.name}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{model.description}</p>
            </div>
            <svg
              className="w-3.5 h-3.5 text-neutral-300 group-hover:text-primary-500 transition-colors flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
