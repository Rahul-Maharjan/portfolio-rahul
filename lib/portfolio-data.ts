export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  category: "development" | "design";
  featured: boolean;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  title: string;
  icon: string;
  skills: Skill[];
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string | null;
};

export const defaultProfile: Profile = {
  name: "Rahul Maharjan",
  email: "rahulmaharjan252@gmail.com",
  phone: "+(977) 9818639012",
  location: "Lalitpur, Nepal",
  githubUrl: "https://github.com/Rahul-Maharjan",
  linkedinUrl: "https://www.linkedin.com/in/rahul-maharjan-a57256207/",
  cvUrl: null,
};

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Responsive portfolio website with modern design and smooth animations.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    github: "https://github.com",
    demo: "https://demo.com",
    category: "design",
    featured: true,
  },
  {
    title: "UI Kit",
    description: "Reusable UI kit for rapid prototyping and design systems.",
    image: "/api/placeholder/400/250",
    technologies: ["Figma", "React", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
    category: "design",
    featured: false,
  },
  {
    title: "Royal Home Hotel",
    description:
      "Hotel booking website with room reservations, booking management, and modern UI design.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "JavaScript", "CSS3", "Vercel"],
    github: "https://github.com/Rahul-Maharjan",
    demo: "https://royal-home-xdigisoft-pied.vercel.app/",
    category: "development",
    featured: true,
  },
  {
    title: "Mini Cart E-commerce",
    description:
      "Full-stack e-commerce website with product catalog, shopping cart, and user authentication.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Rahul-Maharjan",
    demo: "https://mini-cart-5tf1.vercel.app/",
    category: "development",
    featured: true,
  },
  {
    title: "RentX Car Rental",
    description:
      "Car rental service website with vehicle listings, booking system, and responsive design.",
    image: "/api/placeholder/400/250",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    github: "https://github.com/Rahul-Maharjan/RentX",
    demo: "https://rahul-maharjan.github.io/RentX/",
    category: "development",
    featured: false,
  },
  {
    title: "Spices Food Delivery",
    description:
      "Hotel food delivery website with menu display, ordering system, and modern interface.",
    image: "/api/placeholder/400/250",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    github: "https://github.com/Rahul-Maharjan/Spices",
    demo: "https://rahul-maharjan.github.io/Spices/",
    category: "development",
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    title: "Frontend Developer & UI/UX Designer",
    company: "Core Dreams Innovations",
    period: "Dec, 2024 - Jul, 2025",
    description:
      "Designed and developed responsive web interfaces, improved UI/UX for limousine dispatch systems, and contributed to client-branded solutions.",
    technologies: ["HTML", "CSS", "Tailwind", "React"],
    achievements: [
      "Created user flows, wireframes, and prototypes for dispatch apps",
      "Improved UI/UX of Web Booker, Passenger App, and Chauffeur App",
      "Delivered user-friendly, client-branded solutions",
    ],
  },
  {
    title: "UI/UX Designer",
    company: "New Equilibria",
    period: "Oct, 2024 - Feb, 2025",
    description:
      "Optimized user journeys and designed an intuitive shopping app interface to improve engagement and conversions.",
    technologies: ["Figma", "Wireframing", "Prototyping"],
    achievements: [
      "Enhanced navigation and user flow",
      "Collaborated cross-functionally to align design with business goals",
      "Improved customer experience for e-commerce",
    ],
  },
  {
    title: "UI/UX Intern",
    company: "Treeleaf Technologies",
    period: "Apr, 2024 - Aug, 2024",
    description:
      "Contributed to 5+ projects, improved user workflows and interfaces, and enhanced usability through prototyping.",
    technologies: ["Figma", "Wireframing", "Prototyping"],
    achievements: [
      "Improved user workflows by 30%",
      "Delivered user-centric designs",
      "Collaborated across teams to meet project goals",
    ],
  },
  {
    title: "UI/UX Designer Intern",
    company: "KWS Techzone",
    period: "Jan, 2024 - Apr, 2024",
    description:
      "Designed website interfaces and implemented responsive frontend development using Tailwind CSS.",
    technologies: ["HTML", "CSS", "Tailwind", "Figma"],
    achievements: [
      "Enhanced platform's user experience and visual appeal",
      "Contributed to frontend development and styling",
      "Improved responsiveness across devices",
    ],
  },
  {
    title: "Admin",
    company: "Lalit Academy",
    period: "Jan, 2021 - Jan, 2023",
    description:
      "Handled administrative tasks and coordination at Lalit Academy.",
    technologies: [],
    achievements: [
      "Provided support in daily operations",
      "Maintained organizational efficiency",
      "Assisted in academic administration",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Sass/SCSS", level: 90 },
    ],
  },
  {
    title: "UI/UX Design",
    icon: "✒️",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Wireframe", level: 85 },
      { name: "Prototype", level: 88 },
      { name: "Mood board", level: 75 },
      { name: "Design System", level: 92 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 95 },
      { name: "AWS", level: 75 },
      { name: "Vercel", level: 90 },
      { name: "Figma", level: 85 },
    ],
  },
];

export const otherTechnologies: string[] = [
  "JavaScript",
  "HTML5",
  "CSS3",
  "Webpack",
  "Vite",
  "npm",
  "Yarn",
  "ESLint",
  "Prettier",
  "Storybook",
  "Cypress",
  "Playwright",
  "Jenkins",
  "GitHub Actions",
  "Linux",
  "Nginx",
  "Cloudflare",
];