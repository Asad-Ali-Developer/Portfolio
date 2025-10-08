export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const projectsData = [
  {
    image: '/images/abundant.png',
    title: 'Abundant Visas',
    description:
      'Abundant Visas is an all-in-one platform designed to help individuals and businesses navigate the complex visa application process. It offers a wide range of services, including career counseling, visa filing for study, work, business, and visit visas, as well as document services, accommodation help, and travel booking. The platform features an intuitive interface to track visa application progress, access expert guidance, and manage visa-related services efficiently.',
    technologies: [
      'Next.js',
      'Tailwind',
      'TypeScript',
      'Tailwindcss',
      'Firebase',
      'NestJs',
      'Netlify',
    ],
    links: {
      preview: 'https://abundantvisas.com',
      github: '/',
    },
  },
  {
    image: '/images/xenara.png',
    title: 'Xenara AI',
    description:
      'At Xenara AI, I’m working as a Full Stack Developer where I’ve contributed to building and maintaining a modern, scalable web platform. My work spans across the MERN stack, Next.js, and NestJS, handling both client-side and server-side logic.',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Sendgrid',
      'Material UI',
      'Zod',
    ],
    links: {
      preview: 'https://xenara.ai',
      github: 'https://github.com/Xenara-AI/xenara-website.git',
    },
  },
  {
    image: '/images/gamehub.png',
    title: 'GameHub 🎮 ',
    description:
      'Built a responsive video game discovery platform using React 18, TypeScript, and the RAWG API. Features include dynamic search, genre/platform filtering, sorting, and dark mode. Implemented reusable components and custom hooks for clean architecture and scalability.',
    technologies: [
      'React.js',
      'TypeScript',
      'Zod',
      'Chakra UI',
      'Tailwind',
      'React Query',
    ],
    links: {
      preview: 'https://game-hub-gamma-six-90.vercel.app/',
      github: '/',
    },
  },
  {
    image: '/images/blog.png',
    title: 'My Blog',
    description:
      'Check out my personal blog website.This is a modern blog platform built with Next.js, TypeScript, and Tailwind CSS. It features dynamic content rendering, responsive design, and advanced styling techniques, offering a seamless user experience for tech tutorials, interview preparation, and industry insights.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Radix UI',
      'Framer Motion',
      'Zod',
      'Tailwind',
    ],
    links: {
      preview: 'https://my-blog-loy4.vercel.app/',
      github: '/',
    },
  },
] as const;

export const experiencesData = [
  {
    title: 'Full Stack Engineer Intern',
    company: 'OpenVoiceHub',
    description:
      'As a Full Stack Engineer Intern at OpenVoiceHub, I contributed to building a voice-based collaboration platform, integrating real-time communication features using WebSockets and enhancing front-end components with React.js. I focused on improving the user experience by implementing features such as voice command recognition and live data syncing.',
    period: 'Aug 2023 – Dec 2024',
    technologies: [
      'React.js',
      'WebSockets',
      'Node.js',
      'MongoDB',
      'Express.js',
      'TypeScript',
    ],
  },
  {
    title: 'Full Stack Engineer Intern',
    company: 'Xenara AI',
    description:
      'During my remote internship at Xenara AI, I worked as a Full Stack Engineer, collaborating with senior developers on creating user-friendly interfaces with React.js. I contributed to optimizing SSR and SSG in Next.js for better SEO performance, built RESTful APIs using Node.js, and worked on performance optimization and debugging to ensure system stability and scalability.',
    period: 'March 2024 – Nov 2024',
    technologies: [
      'Next.js',
      'Material UI',
      'Node.js',
      'NestJS',
      'TypeScript',
      'Redux Toolkit',
      'Sendgrid',
      'MongoDB',
    ],
  },
  {
    title: 'Full Stack Engineer',
    company: 'TechUp.Ai',
    description:
      'As a Full Stack Engineer at TechUp.Ai, I developed and maintained a high-performance affiliate marketing platform and e-commerce application using Next.js and TypeScript. I optimized server-side rendering (SSR) and static site generation (SSG) to improve SEO and load times, while implementing Redux Toolkit for efficient global state management. I also designed scalable APIs using Nest.js (Node.js) to improve backend communication and performance.',
    period: 'Nov 2024 – Present',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Firebase',
      'Node.js',
      'Redux Toolkit',
      'Netlify',
    ],
  },
] as const;

// skillsData.ts
export const skillsData = [
  // Foundational Technologies
  {
    alt: 'HTML5',
    src: 'https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white',
  },
  {
    alt: 'CSS',
    src: 'https://img.shields.io/badge/-CSS-1572B6?style=flat-square&logo=css3&logoColor=white',
  },
  {
    alt: 'JavaScript',
    src: 'https://img.shields.io/badge/-JavaScript-F7DF1C?style=flat-square&logo=javascript&logoColor=black',
  },
  {
    alt: 'TypeScript',
    src: 'https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white',
  },

  // Frontend Development
  {
    alt: 'React',
    src: 'https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white',
  },
  {
    alt: 'Next.js',
    src: 'https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white',
  },
  {
    alt: 'React Query',
    src: 'https://img.shields.io/badge/-React%20Query-FF4154?style=flat-square&logo=react-query&logoColor=white',
  },
  {
    alt: 'Zustand',
    src: 'https://img.shields.io/badge/-Zustand-FF5F00?style=flat-square&logo=zustand&logoColor=white',
  },
  {
    alt: 'Zod',
    src: 'https://img.shields.io/badge/-Zod-2E5F9E?style=flat-square&logo=zod&logoColor=white',
  },

  // Backend Development
  {
    alt: 'Node.js',
    src: 'https://img.shields.io/badge/-Node.js-43853d?style=flat-square&logo=node.js&logoColor=white',
  },
  {
    alt: 'Express.js',
    src: 'https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white',
  },
  {
    alt: 'NestJS',
    src: 'https://img.shields.io/badge/-NestJS-ea2845?style=flat-square&logo=nestjs&logoColor=white',
  },
  {
    alt: 'Prisma',
    src: 'https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white',
  },
  {
    alt: 'MongoDB',
    src: 'https://img.shields.io/badge/-MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white',
  },
  {
    alt: 'Redis',
    src: 'https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis&logoColor=white',
  },

  // Styling and UI Libraries
  {
    alt: 'Bootstrap',
    src: 'https://img.shields.io/badge/-bootstrap-7953b3?style=flat-square&logo=javascript&logoColor=white',
  },
  {
    alt: 'Tailwind CSS',
    src: 'https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white',
  },
  {
    alt: 'Material UI',
    src: 'https://img.shields.io/badge/-Material%20UI-0081CB?style=flat-square&logo=material-ui&logoColor=white',
  },
  {
    alt: 'Chakra UI',
    src: 'https://img.shields.io/badge/-Chakra%20UI-319795?style=flat-square&logo=chakra-ui&logoColor=white',
  },
  {
    alt: 'Daisy UI',
    src: 'https://img.shields.io/badge/-Daisy%20UI-7A5E99?style=flat-square&logo=daisyui&logoColor=white',
  },
  {
    alt: 'Styled Components',
    src: 'https://img.shields.io/badge/-Styled_Components-db7092?style=flat-square&logo=styled-components&logoColor=white',
  },
  {
    alt: 'Radix UI',
    src: 'https://img.shields.io/badge/-Radix_UI-0D0D0D?style=flat-square&logo=react&logoColor=white',
  },

  // DevOps and Deployment
  // {
  //   alt: 'Kubernetes',
  //   src: 'https://img.shields.io/badge/-Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white',
  // },
  // {
  //   alt: 'AWS',
  //   src: 'https://img.shields.io/badge/-AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white',
  // },

  // Tools
  {
    alt: 'Git',
    src: 'https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white',
  },
  {
    alt: 'GitHub Actions',
    src: 'https://img.shields.io/badge/-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white',
  },
  // {
  //   alt: 'npm',
  //   src: 'https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white',
  // },
  // {
  //   alt: 'Yarn',
  //   src: 'https://img.shields.io/badge/-Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white',
  // },
  // {
  //   alt: 'Prettier',
  //   src: 'https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white',
  // },
  // {
  //   alt: 'ESLint',
  //   src: 'https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white',
  // },
  // {
  //   alt: 'Postman',
  //   src: 'https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white',
  // },
  // {
  //   alt: 'Jira',
  //   src: 'https://img.shields.io/badge/-Jira-0052CC?style=flat-square&logo=jira&logoColor=white',
  // },
  // {
  //   alt: 'Slack',
  //   src: 'https://img.shields.io/badge/-Slack-4A154B?style=flat-square&logo=Slack&logoColor=white',
  // },
];
