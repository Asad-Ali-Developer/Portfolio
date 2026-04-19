'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4 text-left">
          Hi! I&apos;m <strong>Asad Ali</strong>, a{' '}
          <strong>Full Stack Engineer</strong> specializing in{' '}
          <strong>Next.js, TypeScript, React, Node.js,</strong> and{' '}
          <strong>NestJS</strong>, with hands-on experience building and
          shipping production-grade web applications used by thousands of real
          users. My journey in software development began in 2021, and I
          recently completed my 🎓{' '}
          <strong>
            Bachelor&apos;s degree in Computer Science in April, 2025
          </strong>{' '}
          at Government College University Faisalabad (GCUF) while working
          professionally full-time.
        </p>
        <p className="mb-4 text-left">
          Currently at <strong>TechUp</strong>, I own the full development
          lifecycle of a live{' '}
          <strong>affiliate marketing and e-commerce platform</strong> — from
          feature scoping to production deployment, contributing to a{' '}
          <strong>20% increase in user engagement</strong> and a{' '}
          <strong>30% boost in app performance</strong>. Previously at{' '}
          <strong>Xenara AI</strong>, I improved search visibility by{' '}
          <strong>40%</strong> and content delivery speed by{' '}
          <strong>50%</strong> through strategic SSR/SSG rendering decisions.
        </p>
        <p className="mb-4 text-left">
          My notable projects include <strong>Pink Elephants</strong> — an
          AI-powered productivity platform with{' '}
          <strong>5,000+ monthly active users</strong>,{' '}
          <strong>Karaydaar</strong> — a full-stack property rental marketplace,
          and <strong>Abundant Visas</strong> — a global mobility and visa
          assistance platform. I enjoy working across the full stack, turning
          ideas into functional, scalable, and user-friendly products. My goal
          is to grow into a <strong>Lead Software Engineer</strong> role and
          eventually launch my own tech company.
        </p>
        <p>
          I&apos;m open to <strong>full-time remote opportunities</strong> where
          I can contribute, learn, and grow. If you have an opportunity that
          aligns with my skills and experience, don&apos;t hesitate to reach
          out.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
