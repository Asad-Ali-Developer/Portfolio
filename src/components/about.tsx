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
        <p className="mb-4 text-justify">
          Hi! I&apos;m a Full Stack Engineer with a strong focus on the{' '}
          <strong>MERN</strong> stack and <strong>Next.js</strong>. My journey
          in programming started in 2021, right after completing my intermediate
          studies. With a growing passion for technology, I pursued a 🎓{' '}
          <strong>Bachelor&apos;s</strong> degree in Computer Science to
          strengthen my foundation and enhance my skills. Currently, I&apos;m
          working at <strong>TechUp.Ai</strong>, where I’m building
          high-performance platforms using Next.js, TypeScript, and
          NestJS. I also gained valuable experience at{' '}
          <strong>Xenara AI</strong>, where I contributed to developing
          full-stack applications, optimizing performance, and implementing
          scalable solutions. I enjoy working across both front-end and
          back-end, turning ideas into functional, user-friendly products. My
          goal is to continue advancing in the field, with aspirations to become
          a Lead Software Engineer and eventually launch my own tech company.
          I’m always eager to collaborate and create impactful digital
          solutions.
        </p>
        <p>
          I&apos;m open to job opportunities where I can contribute, learn, and
          grow. If you have an opportunity that aligns with my skills and
          experience, don&apos;t hesitate to reach out.
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
