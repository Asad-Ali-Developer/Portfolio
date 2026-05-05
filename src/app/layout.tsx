import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { ActiveSectionProvider } from '@/components/active-section-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/toaster';
import { fonts } from '@/lib/fonts';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },

  description: siteConfig.description,

  keywords: [
    ...siteConfig.keywords,

    // Core Skills
    'web development',
    'software engineer',
    'full stack developer',
    'MERN stack',
    'Next.js developer',
    'Pakistan software industry',
    'portfolio website',
    'blockchain integration',
    'SEO optimized website',
    'modern UI development',

    // Programming Languages
    'JavaScript',
    'JavaScript ES6',
    'TypeScript',
    'HTML5',
    'CSS3',

    // Frontend Technologies
    'React.js',
    'Next.js',
    'Redux Toolkit',
    'Tailwind CSS',
    'Material UI',
    'Chakra UI',
    'Shadcn UI',
    'Zod',

    // Backend & APIs
    'Node.js',
    'NestJS',
    'Express.js',
    'REST APIs',
    'WebSockets',
    'Socket.IO',
    'JWT authentication',
    'OAuth 2.0',
    'Swagger API documentation',

    // Databases & Caching
    'MongoDB',
    'Firebase',
    'Redis',
    'Prisma ORM',

    // Tools & Platforms
    'Git',
    'GitHub',
    'Jira',
    'Vercel',
    'Netlify',
    'Railway',
    'Postman',
    'ElectronJS',
    'Cursor AI',
    'Antigravity AI',

    // Methodologies
    'Agile development',
    'Scrum workflow',
    'code reviews',
    'mobile-first design',
    'server-side rendering SSR',
    'static site generation SSG',
    'incremental static regeneration ISR',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon/favicon-96x96.png',
        sizes: '96x96',
      },
    ],
  },

  // -----------------------------
  // 🌍 GEO SEO (For Regional Ranking)
  // -----------------------------
  other: {
    'geo.region': 'PK-PB', // Punjab, Pakistan
    'geo.position': '31.5204;74.3587', // Lahore Coordinates
    ICBM: '31.5204, 74.3587',
    'place:location:latitude': '31.5204',
    'place:location:longitude': '74.3587',
    'geo.country': 'PK',
  },

  // -----------------------------
  // 🧭 Open Graph (OG)
  // -----------------------------
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/favicon/og-image.png', // Add your image
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },

  // -----------------------------
  // 🐦 Twitter SEO
  // -----------------------------
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.socials?.twitter ? `@${siteConfig.socials.twitter}` : '',
    images: ['/favicon/og-image.png'],
  },

  // -----------------------------
  // 🔗 Social Profiles – Helps Ranking
  // -----------------------------
  alternates: {
    canonical: siteConfig.url,
  },

  verification: {
    google: siteConfig.googleSiteVerificationId,
  },

  // Schema.org for Social Links (Optional but boosts SEO)
  // (Add this JSON-LD in your layout.tsx <head /> if needed)
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans', fonts)}>
        <ThemeProvider attribute="class">
          <ActiveSectionProvider>
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster position="bottom-left" />
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
