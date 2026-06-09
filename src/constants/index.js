// ==============================================
// CONSTANTS - All static data for the portfolio
// ==============================================

export const personalInfo = {
  name: 'Vedant Devrani',
  title: 'Full Stack Developer',
  email: 'vedantdevrani177@gmail.com',
  github: 'https://github.com/vedantdevrani',
  linkedin: 'https://linkedin.com/in/vedantdevrani',
  twitter: 'https://twitter.com/vedantdevrani',
  location: 'India',
  resumeUrl: '/resume.pdf',
  bio: 'Passionate B.Tech student building scalable web applications, solving algorithmic challenges, and creating modern digital experiences.',
  longBio: `I'm a B.Tech 3rd year student passionate about building real-world software that makes a difference. 
  My journey started with curiosity about how web applications work, which led me to dive deep into full-stack development, 
  algorithmic problem solving, and modern engineering practices.
  
  I believe in writing clean, scalable code and creating experiences that users love. Every project I build is an opportunity 
  to learn something new and push my boundaries further.`,
  goal: 'Seeking internship opportunities in software engineering where I can contribute to meaningful products, grow as a developer, and work with talented teams.',
};

export const roles = [
  'Full Stack Developer',
  'DSA Enthusiast',
  'Software Engineering Student',
  'Problem Solver',
  'React Developer',
];

// ==============================================
// SKILLS
// ==============================================
export const skillsData = {
  frontend: [
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'Next.js', level: 80, icon: '▲' },
    { name: 'JavaScript', level: 88, icon: 'JS' },
    { name: 'TypeScript', level: 72, icon: 'TS' },
    { name: 'Tailwind CSS', level: 92, icon: '🎨' },
    { name: 'HTML & CSS', level: 95, icon: '📄' },
  ],
  backend: [
    { name: 'Node.js', level: 82, icon: '🟢' },
    { name: 'Express.js', level: 80, icon: '⚡' },
    { name: 'MongoDB', level: 78, icon: '🍃' },
    { name: 'PostgreSQL', level: 68, icon: '🐘' },
    { name: 'REST APIs', level: 85, icon: '🔗' },
    { name: 'Firebase', level: 70, icon: '🔥' },
  ],
  programming: [
    { name: 'C++', level: 88, icon: '⚙️' },
    { name: 'JavaScript', level: 88, icon: 'JS' },
    { name: 'Python', level: 72, icon: '🐍' },
  ],
  dsa: [
    { name: 'Arrays & Strings', level: 90, icon: '📊' },
    { name: 'Trees & Graphs', level: 80, icon: '🌳' },
    { name: 'Dynamic Programming', level: 75, icon: '🧩' },
    { name: 'Sorting & Searching', level: 88, icon: '🔍' },
    { name: 'Recursion & Backtracking', level: 78, icon: '↩️' },
  ],
  tools: [
    { name: 'Git & GitHub', level: 90, icon: '🐙' },
    { name: 'Docker', level: 60, icon: '🐳' },
    { name: 'AWS Basics', level: 55, icon: '☁️' },
    { name: 'Postman', level: 88, icon: '📬' },
    { name: 'Figma', level: 65, icon: '🎭' },
    { name: 'VS Code', level: 95, icon: '💻' },
  ],
};

// ==============================================
// PROJECTS
// ==============================================
export const projects = [
  {
    id: 1,
    title: 'Gignest',
    subtitle: 'Freelancer-Client Marketplace',
    description: 'A full-featured freelancer-client marketplace platform connecting businesses with skilled professionals through a modern, scalable experience. Features real-time messaging, project management, and secure payments.',
    longDescription: 'Gignest is a comprehensive marketplace that bridges the gap between talented freelancers and businesses seeking specialized skills. Built with a microservices-inspired architecture, it supports real-time collaboration, smart matching algorithms, and a seamless payment flow.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'Tailwind CSS', 'JWT', 'Cloudinary'],
    github: 'https://github.com/vedantdevrani/gignest',
    live: 'https://gignest.vercel.app',
    featured: true,
    gradient: 'from-cyan-500 to-purple-600',
    problem: 'Finding reliable freelancers and managing projects is fragmented across multiple tools, creating friction for both clients and professionals.',
    solution: 'A unified platform with smart matching, real-time communication, transparent pricing, and integrated project management.',
    features: [
      'Smart freelancer-client matching algorithm',
      'Real-time messaging with Socket.io',
      'Secure JWT authentication & authorization',
      'File uploads via Cloudinary integration',
      'Project milestone tracking system',
      'Review and rating system',
      'Responsive mobile-first design',
    ],
    challenges: 'Implementing real-time features while maintaining performance at scale, designing a fair matching algorithm, and ensuring secure payment flows.',
    learnings: 'Deepened understanding of WebSocket patterns, MongoDB aggregation pipelines, and designing scalable REST APIs with proper error handling.',
  },
  {
    id: 2,
    title: 'DevCollab',
    subtitle: 'Collaborative Code Editor',
    description: 'Real-time collaborative code editor with live cursors, syntax highlighting, and room-based collaboration for development teams.',
    tech: ['React', 'Node.js', 'Socket.io', 'CodeMirror', 'Express'],
    github: 'https://github.com/vedantdevrani/devcollab',
    live: '#',
    featured: false,
    gradient: 'from-green-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'AlgoViz',
    subtitle: 'Algorithm Visualizer',
    description: 'Interactive visualization tool for sorting algorithms, graph traversals, and pathfinding algorithms with step-by-step animation.',
    tech: ['React', 'JavaScript', 'CSS Animations', 'D3.js'],
    github: 'https://github.com/vedantdevrani/algoviz',
    live: '#',
    featured: false,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'CloudNotes',
    subtitle: 'Full Stack Notes App',
    description: 'A feature-rich notes application with rich text editing, folders, tags, search, and real-time sync across devices.',
    tech: ['Next.js', 'MongoDB', 'Prisma', 'NextAuth', 'TypeScript'],
    github: 'https://github.com/vedantdevrani/cloudnotes',
    live: '#',
    featured: false,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 5,
    title: 'ShopSphere',
    subtitle: 'E-Commerce Platform',
    description: 'A complete e-commerce platform with product management, cart, checkout flow, order tracking, and admin dashboard.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux Toolkit'],
    github: 'https://github.com/vedantdevrani/shopsphere',
    live: '#',
    featured: false,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 6,
    title: 'TaskFlow',
    subtitle: 'Project Management Tool',
    description: 'A Trello-inspired project management application with drag-and-drop kanban boards, team collaboration, and sprint planning.',
    tech: ['React', 'TypeScript', 'Supabase', 'DnD Kit', 'Tailwind'],
    github: 'https://github.com/vedantdevrani/taskflow',
    live: '#',
    featured: false,
    gradient: 'from-violet-500 to-purple-700',
  },
];

// ==============================================
// CODING PROFILES
// ==============================================
export const codingProfiles = [
  {
    platform: 'LeetCode',
    username: 'vedantdevrani',
    url: 'https://leetcode.com/vedantdevrani',
    solved: 450,
    rating: 1680,
    rank: 'Top 15%',
    color: '#FFA116',
    bgColor: 'rgba(255, 161, 22, 0.1)',
    borderColor: 'rgba(255, 161, 22, 0.3)',
    stats: [
      { label: 'Easy', value: 200, color: '#22C55E' },
      { label: 'Medium', value: 200, color: '#EAB308' },
      { label: 'Hard', value: 50, color: '#4338CA' },
    ],
  },
  {
    platform: 'CodeChef',
    username: 'vedant_dev',
    url: 'https://codechef.com/users/vedant_dev',
    solved: 120,
    rating: 1742,
    rank: '3 Star ⭐⭐⭐',
    color: '#5B4638',
    bgColor: 'rgba(91, 70, 56, 0.15)',
    borderColor: 'rgba(91, 70, 56, 0.4)',
    stats: [
      { label: 'Division', value: '2', color: '#14B8A6' },
      { label: 'Contests', value: 25, color: '#8B5CF6' },
      { label: 'Global Rank', value: '12K', color: '#06B6D4' },
    ],
  },
  {
    platform: 'GeeksforGeeks',
    username: 'vedantdevrani',
    url: 'https://geeksforgeeks.org/user/vedantdevrani',
    solved: 280,
    rating: 680,
    rank: 'Institute Rank #2',
    color: '#2F8D46',
    bgColor: 'rgba(47, 141, 70, 0.1)',
    borderColor: 'rgba(47, 141, 70, 0.3)',
    stats: [
      { label: 'Streak', value: '60 days', color: '#22C55E' },
      { label: 'Score', value: 680, color: '#F59E0B' },
      { label: 'Articles', value: 5, color: '#6366F1' },
    ],
  },
  {
    platform: 'Coding Ninjas',
    username: 'vedant_devrani',
    url: 'https://codingninjas.com/studio/profile/vedant_devrani',
    solved: 180,
    rating: 850,
    rank: 'Expert',
    color: '#F05538',
    bgColor: 'rgba(240, 85, 56, 0.1)',
    borderColor: 'rgba(240, 85, 56, 0.3)',
    stats: [
      { label: 'Streak', value: '30 days', color: '#4338CA' },
      { label: 'Badges', value: 12, color: '#8B5CF6' },
      { label: 'Level', value: 'Expert', color: '#F59E0B' },
    ],
  },
];

// ==============================================
// EDUCATION
// ==============================================
export const education = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Computer Science & Engineering',
    institution: 'University Institute of Technology',
    year: '2022 — 2026',
    current: true,
    year_num: '3rd Year',
    cgpa: '8.2',
    courses: [
      'Data Structures & Algorithms',
      'Design & Analysis of Algorithms',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Software Engineering',
      'Theory of Computation',
      'Computer Organization',
      'Discrete Mathematics',
    ],
    highlights: [
      'Active member of the coding club',
      'Participated in multiple hackathons',
      'Contributed to open-source projects',
    ],
  },
  {
    degree: 'Class XII (Higher Secondary)',
    major: 'Science (PCM + Computer Science)',
    institution: 'Modern Senior Secondary School',
    year: '2020 — 2022',
    current: false,
    percentage: '91.2%',
    courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'],
    highlights: ['School topper in Computer Science'],
  },
];

// ==============================================
// ACHIEVEMENTS
// ==============================================
export const achievements = [
  { label: 'Projects Built', value: 15, suffix: '+', icon: '🚀', color: '#14B8A6' },
  { label: 'DSA Problems Solved', value: 1030, suffix: '+', icon: '🧩', color: '#8B5CF6' },
  { label: 'Certifications', value: 8, suffix: '+', icon: '🏆', color: '#4338CA' },
  { label: 'Hackathons', value: 5, suffix: '+', icon: '⚡', color: '#F59E0B' },
];

// ==============================================
// ABOUT CARDS
// ==============================================
export const aboutCards = [
  {
    title: 'Frontend Development',
    description: 'Building beautiful, responsive UIs with React, Next.js, and modern CSS. Focused on performance and user experience.',
    icon: '🎨',
    color: '#14B8A6',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend Development',
    description: 'Designing scalable APIs with Node.js and Express. Building reliable server infrastructure with MongoDB and PostgreSQL.',
    icon: '⚙️',
    color: '#8B5CF6',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'DSA & Problem Solving',
    description: 'Solving 1000+ problems across platforms. Strong fundamentals in algorithms, data structures, and competitive programming.',
    icon: '🧩',
    color: '#4338CA',
    skills: ['C++', 'LeetCode', 'CodeChef', 'GeeksforGeeks'],
  },
  {
    title: 'Cloud & DevOps Basics',
    description: 'Familiar with AWS fundamentals, Docker containerization, CI/CD pipelines, and modern deployment workflows.',
    icon: '☁️',
    color: '#F59E0B',
    skills: ['AWS', 'Docker', 'Git', 'Vercel/Netlify'],
  },
];

// ==============================================
// NAV LINKS
// ==============================================
export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },

  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

// ==============================================
// SOCIAL LINKS
// ==============================================
export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/vedantdevrani', icon: 'FaGithub' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/vedantdevrani', icon: 'FaLinkedin' },
  { label: 'Twitter', url: 'https://twitter.com/vedantdevrani', icon: 'FaTwitter' },
  { label: 'Email', url: 'mailto:vedantdevrani177@gmail.com', icon: 'HiMail' },
];
