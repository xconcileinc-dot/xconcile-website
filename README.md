# Next.js Company Website

A modern, fully responsive, and SEO-friendly Next.js website boilerplate with a comprehensive theme system.

## Features

- ✅ **Modern Theme System** - Comprehensive color palette, typography, and spacing
- ✅ **Fully Responsive** - Mobile-first design with Tailwind CSS
- ✅ **SEO Optimized** - Built-in SEO configuration with metadata, Open Graph, and structured data
- ✅ **TypeScript** - Full type safety
- ✅ **Performance** - Optimized for speed and Core Web Vitals
- ✅ **Accessibility** - WCAG compliant with proper focus states and semantic HTML

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Theme System

The theme system is located in:
- `lib/theme.ts` - Theme configuration
- `tailwind.config.ts` - Tailwind theme extension
- `app/globals.css` - Global styles and CSS variables

### Color Palette

- **Primary**: Professional blue (#0ea5e9)
- **Secondary**: Complementary teal (#14b8a6)
- **Neutral**: Gray scale for text and backgrounds

### Typography

- Font: Inter (via Google Fonts)
- Responsive font sizes
- Proper line heights and weights

## SEO Configuration

SEO utilities are in `lib/seo.ts`:

```typescript
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
});
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with SEO
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/
│   ├── theme.ts        # Theme configuration
│   └── seo.ts          # SEO utilities
├── components/         # React components (to be created)
└── public/            # Static assets
```

## Customization

1. **Company Name**: Update in `app/layout.tsx` and `lib/seo.ts`
2. **Colors**: Modify `tailwind.config.ts` and `lib/theme.ts`
3. **Fonts**: Update font imports in `app/layout.tsx`
4. **SEO**: Configure in `lib/seo.ts` and add verification codes

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://xconcile.com
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

