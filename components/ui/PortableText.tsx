import { PortableText as PortableTextReact } from '@portabletext/react'

interface PortableTextProps {
    value: any
    className?: string
}

const components = {
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-4xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold mb-3">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold mb-2">{children}</h3>
        ),
        normal: ({ children }: any) => (
            <p className="mb-4 last:mb-0">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
        link: ({ value, children }: any) => {
            const target = value?.href?.startsWith('http') ? '_blank' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="text-primary-600 hover:text-primary-700 underline"
                >
                    {children}
                </a>
            )
        },
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
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
