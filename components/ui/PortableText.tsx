import { PortableText as PortableTextReact } from "@portabletext/react";
import { slugify } from "@/lib/utils";

interface PortableTextProps {
  value: any;
  className?: string;
}

function blockText(value: any): string {
  return value?.children?.map((c: any) => c.text ?? "").join("") ?? "";
}

const components = {
  block: {
    h1: ({ children, value }: any) => (
      <h1 id={slugify(blockText(value))} className="scroll-mt-28 text-[2rem] font-extrabold tracking-tight text-neutral-950 mb-4 mt-10 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children, value }: any) => (
      <h2 id={slugify(blockText(value))} className="scroll-mt-28 text-[1.5rem] font-bold tracking-tight text-neutral-900 mb-3 mt-10 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children, value }: any) => (
      <h3 id={slugify(blockText(value))} className="scroll-mt-28 text-[1.2rem] font-bold text-neutral-900 mb-3 mt-8 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children, value }: any) => (
      <h4 id={slugify(blockText(value))} className="scroll-mt-28 text-[1.05rem] font-bold text-neutral-900 mb-2 mt-6">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-base font-bold text-neutral-800 mb-2 mt-5">{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-sm font-bold text-neutral-700 mb-2 mt-4 uppercase tracking-wide">{children}</h6>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-[3px] border-primary-500 pl-5 pr-4 py-3 bg-primary-50/60 rounded-r-xl italic text-neutral-700 text-[16px] leading-[1.8]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-5 last:mb-0 leading-[1.85] text-neutral-700">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-neutral-100 text-primary-700 px-1.5 py-0.5 rounded-md text-[0.85em] font-mono border border-neutral-200">
        {children}
      </code>
    ),
    underline: ({ children }: any) => (
      <span className="underline decoration-primary-400 decoration-2 underline-offset-2">{children}</span>
    ),
    "strike-through": ({ children }: any) => (
      <span className="line-through text-neutral-400">{children}</span>
    ),
    link: ({ value, children }: any) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary-600 hover:text-primary-800 underline decoration-primary-300 hover:decoration-primary-600 underline-offset-2 transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-neutral-700 leading-[1.8]">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-neutral-700 leading-[1.8]">
        {children}
      </ol>
    ),
  },
};

export function PortableText({ value, className = "" }: PortableTextProps) {
  if (!value) return null;
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
