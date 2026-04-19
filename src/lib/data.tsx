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
    image: '/images/pinkelephants.png',
    title: 'Pink Elephants',
    description:
      'An AI-powered productivity and goal coaching platform scaled to 5,000+ monthly active users. Built intelligent goal decomposition features using adaptive AI, enabling users to break abstract goals into structured, actionable plans. Improved API response times by 35% through intelligent caching layers and optimized high-traffic endpoints under real production load.',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Node.js',
      'MongoDB',
      'Redux Toolkit',
      'Tailwind',
      'Vercel',
      'Railway',
      'Redis',
      'Framer Motion',
      'Firebase',
      'Zod',
    ],
    links: {
      preview: 'https://pinkelephants.ai',
      github: '/',
    },
  },
  {
    image: '/images/karaydaar.png',
    title: 'Karaydaar',
    description:
      'A full-stack property rental marketplace for tenants and landlords in Pakistan. Features verified listings with rich search filters by location, budget, and property type, alongside landlord portfolio and listing management tools. Built with a mobile-first approach for consistent cross-device accessibility.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Django',
      'PostgreSQL',
      'Tailwind',
      'Firebase',
      'Vercel',
      'AWS',
      'Framer Motion',
      'Joi',
    ],
    links: {
      preview: 'https://karaydaar.com',
      github: '/',
    },
  },
  {
    image: '/images/abundant.png',
    title: 'Abundant Visas',
    description:
      'A global mobility and visa assistance platform simplifying international relocation, study abroad, and work permit processes. Integrated expert consulting and documentation support across study, work, visit, and business visa categories. Achieved a 30% reduction in latency through data request caching, delivering a faster, smoother user experience.',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Firebase',
      'Tailwind',
      'Netlify',
      'Zod',
      'Framer Motion',
      'Railway',
    ],
    links: {
      preview: 'https://abundantvisas.com',
      github: '/',
    },
  },
  {
    image: '/images/skillport.png',
    title: 'SkillPort',
    description:
      'A SaaS portfolio builder that lets users create and publish professional portfolios with custom themes and real-time analytics. Implemented a theme marketplace and purchase flow with integrated payment support for premium templates. Delivers live page-view analytics so users can track profile visibility and engagement.',
    technologies: [
      'Next.js',
      'TypeScript',
      'MongoDB',
      'Tailwind',
      'Framer Motion',
      'Vercel',
    ],
    links: {
      preview: 'https://skillport.vercel.app',
      github: '/',
    },
  },
  {
    image: '/images/codeeditor.png',
    title: 'Real-Time Collaborative Code Editor',
    description:
      'A final year project enabling multiple users to edit code simultaneously with live synchronization via WebSockets. Features syntax highlighting and autocomplete for JavaScript and Python, plus version control allowing users to save and revert code versions — reducing errors and improving team collaboration.',
    technologies: [
      'Codemirror',
      'Lezer/highlight',
      'React.js',
      'TypeScript',
      'WebSockets',
      'Node.js',
      'Express.js',
      'Firebase',
      'Netlify',
      'Framer motion',
    ],
    links: {
      preview: 'https://ts-code-editor-realtime.netlify.app',
      github: '/',
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
] as const;

export const experiencesData = [
  {
    title: 'Full Stack Engineer',
    company: 'TechUp',
    description:
      'Own the full development lifecycle of a live affiliate marketing and e-commerce platform — from scoping features with the product team to production deployment. Architected global state with Redux Toolkit, reducing UI rendering overhead by 25% and boosting app performance by 30%. Contributed to a 20% increase in user engagement through scalable Next.js and TypeScript solutions.',
    period: 'Nov 2024 – Present',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Node.js',
      'Redux Toolkit',
      'Firebase',
      'Vercel',
    ],
  },
  {
    title: 'Full Stack Engineer Intern',
    company: 'Xenara AI',
    description:
      'Collaborated with senior engineers to build mobile-first, accessible UI components across a large-scale React application. Drove SSR vs. SSG rendering decisions per page, achieving a 40% improvement in search visibility and 50% faster content delivery. Applied global state management best practices to improve app performance and user interaction speed.',
    period: 'Apr 2024 – Nov 2024',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'Node.js',
      'Redux Toolkit',
      'Material UI',
      'MongoDB',
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
