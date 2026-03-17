import { PortableText as PortableTextReact } from '@portabletext/react'

interface PortableTextProps {
    value: any
    className?: string
}

const components = {
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold mb-3 mt-8 text-neutral-900">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold mb-3 mt-6 text-neutral-900">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-xl font-bold mb-2 mt-4 text-neutral-900">{children}</h4>
        ),
        h5: ({ children }: any) => (
            <h5 className="text-lg font-bold mb-2 mt-4 text-neutral-900">{children}</h5>
        ),
        h6: ({ children }: any) => (
            <h6 className="text-base font-bold mb-2 mt-4 text-neutral-900">{children}</h6>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 py-1 my-4 bg-neutral-50 italic text-neutral-700 rounded-r">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 last:mb-0 leading-relaxed text-neutral-700">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-semibold text-neutral-900">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        code: ({ children }: any) => (
            <code className="bg-neutral-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono border border-neutral-200">
                {children}
            </code>
        ),
        underline: ({ children }: any) => <span className="underline decoration-primary-300 decoration-2 underline-offset-2">{children}</span>,
        "strike-through": ({ children }: any) => <span className="line-through text-neutral-500">{children}</span>,
        link: ({ value, children }: any) => {
            const target = value?.href?.startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                >
                    {children}
                </a>
            )
        },
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-outside ml-5 mb-4 space-y-2 text-base leading-relaxed text-neutral-700">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 text-base leading-relaxed text-neutral-700">{children}</ol>,
    },
}

export function PortableText({ value, className = '' }: PortableTextProps) {
    if (!value) return null

    return (
        <div className={className}>
            <PortableTextReact value={value} components={components} />
        </div>
    )
}
