import { env } from '@/env.mjs';

type SiteConfig = {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  googleSiteVerificationId: string;
  socials?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export const siteConfig: SiteConfig = {
  title: 'Asad Ali | Software Engineer',
  description:
    "Hello, I'm a Full Stack Engineer with 2+ years of experience shipping production-grade apps — from an AI coaching platform with 5,000+ monthly users to full-scale e-commerce platforms. I specialize in Next.js, TypeScript & Node.js — crafting fast, scalable, and user-friendly experiences across the full stack.",

  keywords: [
    'Full Stack Developer',
    'MERN Stack',
    'Next.js',
    'NestJS',
    'React',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'Web Development',
    'Responsive Design',
    'Material UI',
    'Tailwind CSS',
    'Front-end',
    'Back-end',
    'Portfolio',
    'Projects',
    'Website',
    'Web Applications',
    'Developer',
    'Code',
    'Programming',
    'Pakistan',
  ],

  url: env.SITE_URL || "https://example.com",
  googleSiteVerificationId: env.GOOGLE_SITE_VERIFICATION_ID || "",

  socials: {
    twitter: "asad_dev",        // <-- update your handle
    github: "https://github.com/Asad-Ali-Developer",    // <-- update your handle
    linkedin: "https://www.linkedin.com/in/asad-ali-najaf/",  // <-- update your handle
    instagram: "https://www.instagram.com/asadalinajaf?igsh=Mmd3NHA4a20zeGpl",     // <-- update your handle
  },
};