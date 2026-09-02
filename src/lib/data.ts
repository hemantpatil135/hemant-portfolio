/**
 * Single source of truth for all portfolio content.
 *
 * Every value here is derived directly from Hemant Patil's resume.
 * No experience, metric, or credential is invented. Update this file to
 * update the entire site — components never hardcode content.
 */

export type IconName =
  | "react"
  | "next"
  | "typescript"
  | "javascript"
  | "redux"
  | "tailwind"
  | "html"
  | "css"
  | "sass"
  | "mui"
  | "bootstrap"
  | "styled"
  | "jest"
  | "git"
  | "api"
  | "node"
  | "angular"
  | "mysql"
  | "mongodb"
  | "framer"
  | "gsap"
  | "vite";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  yearsExperience: string;
  links: {
    linkedin: string;
    github: string;
    email: string;
    phone: string;
    whatsapp: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
  resumePath: string;
}

export const profile: Profile = {
  name: "Hemant Patil",
  role: "Frontend Software Engineer",
  tagline:
    "Architecting scalable, high-performance enterprise web applications with React & TypeScript.",
  location: "Surat, Gujarat, India",
  email: "patilhemantsing@gmail.com",
  phone: "+91 9157094137",
  summary:
    "Frontend Software Engineer with 4.9+ years of experience architecting and building scalable, high-performance enterprise web applications using React.js, TypeScript, and modern state management patterns. Proven track record designing reusable component architecture, optimizing frontend performance, and integrating complex REST APIs across multi-role platforms for enterprise and international clients.",
  yearsExperience: "4.9+",
  links: {
    linkedin: "https://linkedin.com/in/hemantpatil333",
    github: "https://github.com/hemantpatil135",
    email: "mailto:patilhemantsing@gmail.com",
    phone: "tel:+919157094137",
    // Click-to-chat (digits only, no +/spaces), with a prefilled greeting.
    whatsapp:
      "https://wa.me/919157094137?text=Hi%20Hemant%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
    twitter: "https://x.com/hemant_patil135",
    instagram: "https://www.instagram.com/hemant_419/",
    facebook:
      "https://www.facebook.com/people/Hemant-Rajput/pfbid0aw1Q4t7RQXmaEgPUHbaTYqRmxCkaAb3UzGSoR4rHT4AMziFWgRoW1rLbodEw9wg9l/",
  },
  resumePath: "/Hemant_Patil_Resume.pdf",
};

export interface AboutFact {
  label: string;
  value: string;
}

export const about = {
  headline:
    "Turning complex UI engineering problems into clean, accessible code.",
  /** Themed hero question for the About section ("mask" = the person behind the work). */
  question: "Who is behind the mask?",
  intro:
    "I build enterprise-grade web applications that are scalable, accessible and performance-focused.",
  /** The "My Story" narrative paragraph. */
  story:
    "I turn complex enterprise UI problems into clean, accessible, high-performance React — work I've shipped for global clients like American Express, Pearson, and Axis Bank.",
  bio: [
    "I'm a Frontend Software Engineer based in Surat, India, with 4.9+ years building enterprise-grade React applications for international clients including American Express, Pearson, and Axis Bank.",
    "My focus is reusable component architecture, frontend performance optimization, and integrating complex REST APIs across multi-role platforms. I thrive in Agile/Scrum teams, collaborating closely with backend, QA, and product.",
    "I care deeply about clean, maintainable, and accessible code — and about mentoring the engineers around me. I was promoted from Developer to Team Leader within two years.",
  ],
  focus: [
    "Scalable component architecture",
    "Frontend performance optimization",
    "Type-safe state management",
    "Accessible, responsive UI",
  ],
  facts: [
    { label: "Based in", value: "Surat, India" },
    { label: "Experience", value: "4.9+ years" },
    { label: "Enterprise clients", value: "10+ international" },
    { label: "Languages", value: "English · Hindi · Marathi · Gujarati" },
  ] as AboutFact[],
  quote:
    "I care less about code that merely works, and more about code that stays fast, stays readable, and holds up as the product grows.",
};

/** "My Story" highlight cards — icon key resolved in the component. */
export interface AboutHighlight {
  icon: "rocket" | "building" | "clients" | "code" | "a11y";
  value?: string;
  title: string;
  sub: string;
}

export const aboutHighlights: AboutHighlight[] = [
  {
    icon: "rocket",
    value: "4.9+",
    title: "Years of Experience",
    sub: "Building production frontends",
  },
  {
    icon: "building",
    title: "Enterprise Applications",
    sub: "Built for global organizations",
  },
  {
    icon: "code",
    title: "Clean, Scalable & Maintainable Code",
    sub: "Reusable component architecture",
  },
  {
    icon: "a11y",
    title: "Accessibility Focused",
    sub: "WCAG & inclusive by default",
  },
];

/** Career journey milestones (derived from real experience history). */
export interface JourneyMilestone {
  year: string;
  role: string;
  org: string;
  blurb: string;
}

export const journey: JourneyMilestone[] = [
  {
    year: "2021",
    role: "React.js Developer",
    org: "Koli Infotech",
    blurb: "Began building enterprise React applications for global clients.",
  },
  {
    year: "2023",
    role: "Team Leader",
    org: "Koli Infotech",
    blurb: "Promoted within 2 years; led 6 remote developers across projects.",
  },
  {
    year: "2025",
    role: "Software Engineer",
    org: "iauro · Yes Securities",
    blurb: "Built micro-frontend modules with independent deployment.",
  },
  {
    year: "2025+",
    role: "Frontend Engineer",
    org: "Interstride",
    blurb: "Architecting 4 role-based portals across 7 user roles.",
  },
];

/** "Impact in Numbers" — every figure is drawn from the resume (see `stats`). */
export interface ImpactStat {
  icon: "projects" | "clients" | "team" | "delivery";
  value: string;
  label: string;
}

export const impact: ImpactStat[] = [
  { icon: "projects", value: "6+", label: "Enterprise Projects" },
  { icon: "clients", value: "10+", label: "International Clients" },
  { icon: "team", value: "6", label: "Developers Led" },
  { icon: "delivery", value: "95%", label: "On-time Delivery" },
];

/** Enterprise clients, with the plate colour each brand logo reads best on. */
export interface ClientLogo {
  name: string;
  logo: string;
  plate: "light" | "dark";
}

export const clients: ClientLogo[] = [
  { name: "American Express", logo: "/logos/amex.svg", plate: "light" },
  { name: "Pearson", logo: "/logos/pearson.png", plate: "dark" },
  { name: "Axis Bank", logo: "/logos/axis.svg", plate: "dark" },
  { name: "Interstride", logo: "/logos/interstride.svg", plate: "light" },
];

/**
 * Tech-stack "orbit" — the interactive stack visual. `reactCore` sits at the
 * centre; `orbitTools` are the satellites in clockwise order from the top.
 * Every tool carries the copy shown in the "Tool in Focus" panel.
 */
export interface StackTool {
  id: string;
  name: string;
  icon: IconName;
  role: string;
  color: string;
  level: number; // expertise %, for visualization only
  description: string;
  uses: string[];
  usedIn: { title: string; icon: string }[];
  // 3D Specific Attributes
  planetType:
    | "sun"
    | "gas"
    | "rocky"
    | "crystal"
    | "metallic"
    | "energy"
    | "moon"
    | "ice"
    | "digital"
    | "volcanic"
    | "glowing";
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  planetSize: number;
}

export const reactTool: StackTool = {
  id: "react",
  name: "React.js",
  icon: "react",
  role: "Core Library",
  color: "#61DAFB",
  level: 95,
  description:
    "Building interactive and reusable user interfaces with a component-driven approach and best practices.",
  uses: [
    "Component Architecture",
    "Custom Hooks",
    "Context API",
    "Performance Optimization",
    "React Router",
    "Suspense & Lazy Loading",
  ],
  usedIn: [
    { title: "Admin Dashboard", icon: "LayoutDashboard" },
    { title: "Banking Portal", icon: "Building2" },
    { title: "Analytics Platform", icon: "BarChart3" },
  ],
  planetType: "sun",
  orbitRadius: 0,
  orbitSpeed: 0,
  orbitInclination: 0,
  planetSize: 3.5,
};

export const orbitTools: StackTool[] = [
  reactTool,
  {
    id: "typescript",
    name: "TypeScript",
    icon: "typescript",
    role: "Language",
    color: "#3178C6",
    level: 92,
    description: "Type-safe data flow across enterprise platforms.",
    uses: [
      "Type-safe APIs",
      "Reusable Generics",
      "Safer Refactors",
      "Domain Modeling",
    ],
    usedIn: [
      { title: "Enterprise Apps", icon: "Building" },
      { title: "Design Systems", icon: "Palette" },
      { title: "Micro Frontends", icon: "Network" },
    ],
    planetType: "crystal",
    orbitRadius: 6,
    orbitSpeed: 0.8,
    orbitInclination: 0.1,
    planetSize: 0.8,
  },
  {
    id: "redux",
    name: "Redux Toolkit",
    icon: "redux",
    role: "State Management",
    color: "#764ABC",
    level: 90,
    description: "Centralized, predictable state for multi-role workflows.",
    uses: [
      "Global State",
      "Typed Slices",
      "Async Thunks",
      "Memoized Selectors",
    ],
    usedIn: [
      { title: "Student Portal", icon: "Users" },
      { title: "Course Builder", icon: "BookOpen" },
    ],
    planetType: "energy",
    orbitRadius: 8,
    orbitSpeed: 0.6,
    orbitInclination: 0.15,
    planetSize: 1.1,
  },
  {
    id: "next",
    name: "Next.js",
    icon: "next",
    role: "Framework",
    color: "#E5E7EB",
    level: 82,
    description:
      "Production React with routing, rendering and performance built in.",
    uses: ["SSR & SSG", "Routing", "Image Optimization", "Performance"],
    usedIn: [
      { title: "E-Commerce", icon: "ShoppingCart" },
      { title: "Corporate Site", icon: "Globe" },
    ],
    planetType: "moon",
    orbitRadius: 11,
    orbitSpeed: 0.5,
    orbitInclination: -0.05,
    planetSize: 1.4,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwind",
    role: "Styling",
    color: "#38BDF8",
    level: 88,
    description:
      "Utility-first styling for fast, consistent, responsive interfaces.",
    uses: [
      "Design Tokens",
      "Responsive Layouts",
      "Dark Mode",
      "Rapid Prototyping",
    ],
    usedIn: [
      { title: "SaaS Platform", icon: "LayoutTemplate" },
      { title: "Marketing Site", icon: "Globe" },
    ],
    planetType: "gas",
    orbitRadius: 14,
    orbitSpeed: 0.4,
    orbitInclination: 0.2,
    planetSize: 1.8,
  },
  {
    id: "mui",
    name: "Material UI",
    icon: "mui",
    role: "UI Library",
    color: "#007FFF",
    level: 88,
    description:
      "Reusable component libraries and render optimization at scale.",
    uses: ["Component Libraries", "Theming", "Render Tuning", "Accessibility"],
    usedIn: [
      { title: "Banking Portal", icon: "Building2" },
      { title: "CRM Dashboard", icon: "LayoutDashboard" },
    ],
    planetType: "metallic",
    orbitRadius: 17,
    orbitSpeed: 0.35,
    orbitInclination: -0.1,
    planetSize: 1.2,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "javascript",
    role: "Language",
    color: "#F7DF1E",
    level: 95,
    description: "Core language of the web.",
    uses: [
      "DOM Manipulation",
      "ES6+ Features",
      "Async Programming",
      "Web APIs",
    ],
    usedIn: [{ title: "All Projects", icon: "FolderGit2" }],
    planetType: "rocky",
    orbitRadius: 5,
    orbitSpeed: 1.2,
    orbitInclination: 0.0,
    planetSize: 0.9,
  },
  {
    id: "api",
    name: "REST APIs",
    icon: "api",
    role: "Integration",
    color: "#2DD4BF",
    level: 90,
    description: "Robust REST integration.",
    uses: ["Data Fetching", "Error Handling", "Pagination", "Client Caching"],
    usedIn: [
      { title: "Payment Gateway", icon: "CreditCard" },
      { title: "User Management", icon: "Users" },
    ],
    planetType: "digital",
    orbitRadius: 19,
    orbitSpeed: 0.3,
    orbitInclination: 0.25,
    planetSize: 1.0,
  },
  {
    id: "git",
    name: "Git",
    icon: "git",
    role: "Tooling",
    color: "#F1502F",
    level: 90,
    description: "Version control workflows.",
    uses: ["Branching", "Code Review", "CI Hooks", "Collaboration"],
    usedIn: [{ title: "All Projects", icon: "FolderGit2" }],
    planetType: "volcanic",
    orbitRadius: 21,
    orbitSpeed: 0.25,
    orbitInclination: -0.2,
    planetSize: 0.8,
  },
  {
    id: "jest",
    name: "Jest",
    icon: "jest",
    role: "Testing",
    color: "#F472B6",
    level: 76,
    description: "Unit testing for reliable components.",
    uses: ["Unit Tests", "Snapshots", "Mocks", "Coverage"],
    usedIn: [{ title: "Core UI Library", icon: "Component" }],
    planetType: "moon",
    orbitRadius: 23,
    orbitSpeed: 0.2,
    orbitInclination: 0.3,
    planetSize: 0.7,
  },
  {
    id: "html",
    name: "HTML5",
    icon: "html",
    role: "Language",
    color: "#E34F26",
    level: 95,
    description: "Semantic, accessible markup.",
    uses: ["Semantic Markup", "Accessibility", "SEO", "Forms"],
    usedIn: [{ title: "All Projects", icon: "FolderGit2" }],
    planetType: "rocky",
    orbitRadius: 25,
    orbitSpeed: 0.18,
    orbitInclination: 0.05,
    planetSize: 0.9,
  },
  {
    id: "css",
    name: "CSS3",
    icon: "css",
    role: "Language",
    color: "#38BDF8",
    level: 93,
    description: "Advanced layouts and animation.",
    uses: ["Flexbox & Grid", "Animations", "Responsive Design", "Theming"],
    usedIn: [{ title: "All Projects", icon: "FolderGit2" }],
    planetType: "ice",
    orbitRadius: 27,
    orbitSpeed: 0.15,
    orbitInclination: -0.05,
    planetSize: 1.1,
  },
  {
    id: "node",
    name: "Node.js",
    icon: "node",
    role: "Backend & APIs",
    color: "#539E43",
    level: 72,
    description: "Server-side JavaScript for API and tooling work.",
    uses: ["REST Endpoints", "API Integration", "Build Tooling", "npm Ecosystem"],
    usedIn: [{ title: "API Integration", icon: "Network" }],
    planetType: "rocky",
    orbitRadius: 7,
    orbitSpeed: 0.9,
    orbitInclination: 0.12,
    planetSize: 1.0,
  },
  {
    id: "angular",
    name: "Angular.js",
    icon: "angular",
    role: "Framework",
    color: "#DD0031",
    level: 68,
    description: "Maintaining and extending Angular client applications.",
    uses: ["Components", "Services & DI", "Routing", "Forms"],
    usedIn: [{ title: "Client Projects", icon: "FolderGit2" }],
    planetType: "volcanic",
    orbitRadius: 4,
    orbitSpeed: 1.1,
    orbitInclination: -0.12,
    planetSize: 0.9,
  },
  {
    id: "sass",
    name: "SASS",
    icon: "sass",
    role: "Styling",
    color: "#CC6699",
    level: 85,
    description: "Structured, maintainable stylesheets at scale.",
    uses: ["Variables & Mixins", "Nesting", "Partials", "Theming"],
    usedIn: [{ title: "Design Systems", icon: "Palette" }],
    planetType: "gas",
    orbitRadius: 12,
    orbitSpeed: 0.45,
    orbitInclination: 0.18,
    planetSize: 1.0,
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    icon: "bootstrap",
    role: "UI Library",
    color: "#7952B3",
    level: 85,
    description: "Rapid responsive layouts on a proven grid.",
    uses: ["Grid System", "Responsive Utilities", "Components", "Theming"],
    usedIn: [{ title: "Client Projects", icon: "FolderGit2" }],
    planetType: "metallic",
    orbitRadius: 15,
    orbitSpeed: 0.38,
    orbitInclination: -0.15,
    planetSize: 1.1,
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "mysql",
    role: "Database",
    color: "#00758F",
    level: 65,
    description: "Relational data modelling and querying.",
    uses: ["Schema Design", "Joins & Queries", "Indexing", "Data Modeling"],
    usedIn: [{ title: "Client Projects", icon: "FolderGit2" }],
    planetType: "ice",
    orbitRadius: 29,
    orbitSpeed: 0.13,
    orbitInclination: 0.22,
    planetSize: 0.9,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: "mongodb",
    role: "Database",
    color: "#47A248",
    level: 65,
    description: "Document storage for flexible, evolving data.",
    uses: ["Collections", "Aggregation", "Schema Flexibility", "Indexing"],
    usedIn: [{ title: "Client Projects", icon: "FolderGit2" }],
    planetType: "digital",
    orbitRadius: 31,
    orbitSpeed: 0.11,
    orbitInclination: -0.22,
    planetSize: 1.0,
  },
];

/** Left-column value props for the stack section. */
export interface StackFeature {
  icon: "modern" | "performance" | "clean" | "learning";
  title: string;
  sub: string;
}

export const stackFeatures: StackFeature[] = [
  {
    icon: "modern",
    title: "Modern Architecture",
    sub: "Component-driven and scalable",
  },
  {
    icon: "performance",
    title: "Performance First",
    sub: "Optimized for speed and efficiency",
  },
  {
    icon: "clean",
    title: "Clean & Maintainable",
    sub: "Well-structured and testable code",
  },
  {
    icon: "learning",
    title: "Always Learning",
    sub: "Exploring and adapting new tech",
  },
];

/** Bottom "Engineering Strengths" cards. */
export interface EngineeringStrength {
  icon: "component" | "state" | "performance" | "api" | "testing" | "a11y";
  title: string;
  sub: string;
}

export const engineeringStrengths: EngineeringStrength[] = [
  {
    icon: "component",
    title: "Component Driven Development",
    sub: "Reusable, scalable, maintainable.",
  },
  {
    icon: "state",
    title: "State Management Mastery",
    sub: "Predictable state, better apps.",
  },
  {
    icon: "performance",
    title: "Performance Optimization",
    sub: "Speed, Core Web Vitals & efficient rendering.",
  },
  {
    icon: "api",
    title: "API Integration Expertise",
    sub: "RESTful services, auth & error handling.",
  },
  {
    icon: "testing",
    title: "Testing & Code Quality",
    sub: "Reliable, bug-free and tested.",
  },
  {
    icon: "a11y",
    title: "Responsive & Accessible UI",
    sub: "Accessible by default, for everyone.",
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  project?: string;
  stack: string[];
  location?: string;
  highlights: string[];
  /** Brand logo for the timeline node; falls back to the company initial. */
  logo?: string;
  logoPlate?: "light" | "dark";
  /** Headline numbers, each already stated in `highlights` below. */
  metrics?: { value: string; label: string; icon: string }[];
  /** Shipped surfaces, for roles that delivered named products. */
  products?: string[];
  /** Names matching `clients`, for roles delivered to named enterprise brands. */
  clientNames?: string[];
}

export const experiences: Experience[] = [
  {
    company: "Interstride Pvt. Ltd.",
    role: "Frontend Developer",
    period: "Jun 2025 – Present",
    project:
      "Interstride Platform — Student, Admin, Employer & Admission Portals",
    stack: ["React.js", "TypeScript", "Redux Toolkit"],
    logo: "/logos/interstride.svg",
    logoPlate: "light",
    products: ["Student Portal", "Admin Portal", "Employer Portal", "Admission Portal"],
    metrics: [
      { value: "10+", label: "Features shipped", icon: "rocket" },
      { value: "550+", label: "University partners", icon: "globe" },
      { value: "~55%", label: "Fewer API calls", icon: "zap" },
      { value: "~40%", label: "Faster page load", icon: "trend" },
    ],
    highlights: [
      "Architected and delivered 10+ production features across 4 role-based portals — Student, Admin, Employer, and Admission — supporting 7 distinct user roles on a platform serving 550+ university partners.",
      "Engineered a reusable component architecture adopted across 8+ platform modules, eliminating duplicate code and accelerating delivery of each subsequent module.",
      "Implemented debounced search, filtering, sorting, and pagination with React Hooks — cutting redundant API calls by ~55% and improving search/filter UI response time by ~45%.",
      "Integrated REST APIs with Redux Toolkit for centralized state across all 4 portals, improving data consistency and removing duplicated data-fetching logic between Student, Admin, Employer, and Admission workflows.",
      "Improved initial page-load performance by ~40% for a Student Portal with 250,000+ enrolled users, introducing route-level lazy loading and component-level render optimization.",
      "Standardized frontend authentication and role-based authorization across 7 user roles, so each portal renders only the routes, actions, and data views permitted for the signed-in role.",
      "Delivered responsive, cross-device interfaces for 8+ modules and partnered with backend, QA, and product teams across Agile/Scrum sprints, maintaining ~95% on-time sprint delivery.",
    ],
  },
  {
    company: "iauro Systems Pvt. Ltd.",
    role: "Software Engineer",
    period: "Feb 2025 – May 2025",
    project: "Yes Securities",
    stack: ["React.js", "Material UI", "Micro Frontend"],
    // Their footer mark is pure white, so it needs the dark plate.
    logo: "/logos/iauro.svg",
    logoPlate: "dark",
    metrics: [
      { value: "4+", label: "Modules deployed independently", icon: "boxes" },
      { value: "~35%", label: "Fewer re-renders", icon: "gauge" },
      { value: "~30%", label: "Fewer UI defects", icon: "shield" },
    ],
    highlights: [
      "Developed scalable frontend modules using React.js and Micro Frontend architecture, enabling independent deployment across 4+ modules.",
      "Implemented advanced filtering, sorting, and CRUD against REST APIs, reducing manual data-handling effort by ~35%.",
      "Built reusable Material UI components and optimized rendering, reducing unnecessary re-renders by ~35%.",
      "Standardized component patterns across 8+ modules, improving maintainability and reducing reported UI defects by ~30%.",
    ],
  },
  {
    company: "Koli Infotech Pvt. Ltd.",
    role: "React.js Developer → Team Leader",
    period: "Nov 2021 – Feb 2025",
    stack: ["React.js", "Redux Toolkit", "Material UI"],
    logo: "/logos/koli.png",
    logoPlate: "light",
    metrics: [
      { value: "6", label: "Developers led", icon: "users" },
      { value: "10+", label: "International clients", icon: "globe" },
      { value: "~35%", label: "Faster page loads", icon: "gauge" },
    ],
    clientNames: ["American Express", "Pearson", "Axis Bank"],
    highlights: [
      "Led frontend development and technical direction for a team of 6 remote developers, delivering enterprise apps across 6+ client engagements — including American Express, Pearson, and Axis Bank — with ~90% on-time delivery.",
      "Architected scalable, responsive applications supporting 10+ international clients.",
      "Directed REST API integration and workflow optimization, reducing page load times by ~35%.",
      "Mentored 3 junior developers and drove Agile sprint planning and code review, improving sprint velocity by ~25%.",
      "Promoted from React.js Developer to Team Leader within 2 years based on technical execution and leadership impact.",
    ],
  },
];

export interface Project {
  title: string;
  client: string;
  stack: string[];
  summary: string;
  features: string[];
  accent: string;
  metric: string;
  logo: string;
  /** Plate background the brand logo reads best on (fixed, theme-independent). */
  logoPlate: "light" | "dark";
  /** Ongoing work at the current employer. Omit for delivered work. */
  status?: "active" | "completed";
  /**
   * Narrative fields for the mission-detail tabs. All three are rephrasings of
   * the existing summary/features/metric — no facts or figures beyond those.
   * Editable prose, kept short (1–2 sentences each).
   */
  challenge: string;
  solution: string;
  impact: string;
  /**
   * Public URL for the client product. Mostly login/marketing entry points —
   * the delivered work sits behind client auth. Omit when there's no public
   * surface; the "Live project" button only renders when present.
   */
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Multi-Portal Platform",
    client: "Interstride",
    stack: ["React.js", "TypeScript", "Redux Toolkit"],
    accent: "#FB7185",
    metric: "4 portals · 7 roles · 550+ universities",
    logo: "/logos/interstride.svg",
    logoPlate: "light",
    // Current employer — see the open-ended role in `experiences`.
    status: "active",
    summary:
      "Architected 10+ features across 4 role-based portals — Student, Admin, Employer, and Admission — supporting 7 user roles, with a reusable component architecture adopted across 8+ platform modules and REST APIs centralized in Redux Toolkit.",
    features: [
      "Student, Admin, Employer & Admission portals — 7 roles",
      "Reusable component architecture in 8+ modules",
      "Debounced search & filtering — ~55% fewer API calls",
      "Lazy loading & render tuning — ~40% faster load for 250,000+ users",
    ],
    challenge:
      "One platform had to serve four portals and seven distinct user roles across 550+ university partners, without the interface splintering into disconnected, hard-to-maintain screens.",
    solution:
      "Architected a reusable component system in React and TypeScript, centralizing REST data in Redux Toolkit so a single set of primitives powered every new module.",
    impact:
      "A reusable foundation adopted across 8+ modules, with measurably lighter, faster screens — ~55% fewer API calls and ~40% quicker loads for 250,000+ enrolled users.",
    liveUrl: "https://student.interstride.com/",
  },
  {
    title: "Travel Booking Platform",
    client: "American Express",
    stack: ["React.js", "Redux Saga"],
    accent: "#FB923C",
    metric: "~40% faster refunds",
    logo: "/logos/amex.svg",
    logoPlate: "light",
    summary:
      "Built Hotel Cancellation and Refund modules end-to-end, using Redux Saga to orchestrate complex asynchronous refund state transitions and side effects.",
    features: [
      "End-to-end hotel cancellation & refund flows",
      "Redux Saga for complex async side effects",
      "Reduced refund processing time by ~40%",
      "Robust handling of multi-step state transitions",
    ],
    challenge:
      "Hotel cancellations and refunds run on multi-step, asynchronous state that can strand a booking mid-flow if any single step fails.",
    solution:
      "Built the cancellation and refund modules end-to-end with Redux Saga, orchestrating the async side effects and state transitions as one explicit, testable flow.",
    impact:
      "Refund processing time cut by ~40%, with reliable handling of every multi-step cancellation.",
    liveUrl:
      "https://www.americanexpress.com/en-ca/travel/the-hotel-collection/",
  },
  {
    title: "Console+",
    client: "Pearson",
    stack: ["React.js", "Redux Toolkit", "TypeScript"],
    accent: "#F97316",
    metric: "~30% faster course setup",
    logo: "/logos/pearson.png",
    logoPlate: "dark",
    summary:
      "Built dynamic, instructor-driven course creation modules with Redux Toolkit state management and TypeScript for type-safe data flow, powering Pearson's education platform.",
    features: [
      "Dynamic, instructor-driven course authoring",
      "Type-safe data flow with TypeScript",
      "Supported 5+ content teams",
      "Reduced course setup time by ~30%",
    ],
    challenge:
      "Content teams needed to author courses dynamically, but ad-hoc data flow made the tooling fragile and slow to extend across teams.",
    solution:
      "Delivered instructor-driven course-creation modules on Redux Toolkit with end-to-end TypeScript, giving the data flow the type safety to scale.",
    impact:
      "Course setup ~30% faster, supporting 5+ content teams on a type-safe foundation.",
    liveUrl: "https://login.pearson.com/v1/piapi/iesui/signin",
  },
  {
    title: "MUIS-CRM",
    client: "MUIS",
    stack: ["React.js"],
    accent: "#FB7185",
    metric: "~35% fewer data entry errors",
    logo: "/logos/muis.png",
    logoPlate: "dark",
    summary:
      "Developed receipt generation and editing workflows with robust validation and error handling for a customer relationship management platform.",
    features: [
      "Receipt generation & editing workflows",
      "Robust form validation and error handling",
      "Reduced data entry errors by ~35%",
      "Reliable, maintainable UI logic",
    ],
    challenge:
      "Receipt generation and editing were error-prone, and data-entry mistakes flowed straight through to customers.",
    solution:
      "Rebuilt the receipt workflows with robust validation and error handling, catching bad input at the point of entry rather than downstream.",
    impact:
      "~35% fewer data-entry errors, with dependable, maintainable receipt workflows.",
    liveUrl: "https://crm.mgiving.sg/authentication/login",
  },
  {
    title: "Banking Portal",
    client: "Axis Bank",
    stack: ["React.js", "Styled Components"],
    accent: "#10B981",
    metric: "1,000+ end users",
    logo: "/logos/axis.svg",
    logoPlate: "dark",
    summary:
      "Developed banking portal UI screens using React.js and Styled Components, delivering a responsive, component-scoped interface at scale.",
    features: [
      "Banking portal UI screens",
      "Component-scoped styling with Styled Components",
      "Served 1,000+ end users",
      "Responsive, consistent design system",
    ],
    challenge:
      "A banking portal serving over a thousand users demanded a consistent, responsive interface with styling that wouldn't leak between components at scale.",
    solution:
      "Developed the portal's UI in React with component-scoped Styled Components, keeping the design system consistent and styles isolated as the surface grew.",
    impact:
      "A responsive, consistent portal serving 1,000+ end users at scale.",
    liveUrl: "https://omni.axis.bank.in/axisretailbanking/",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { label: "Years of Experience", value: 4.9, suffix: "+" },
  { label: "Enterprise Projects", value: 6, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "" },
  { label: "International Clients", value: 10, suffix: "+" },
  { label: "Developers Led", value: 6, suffix: "" },
  { label: "On-time Delivery", value: 95, suffix: "%" },
];

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  /** Result and focus — sourced from the résumé/education record. */
  cgpa: string;
  specialization: string;
}

export const education: EducationItem[] = [
  {
    degree: "Master of Computer Application (MCA)",
    institution: "Gujarat Technological University",
    period: "2020 – 2022",
    cgpa: "8.72 / 10",
    specialization: "Computer Science",
  },
  {
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Veer Narmad South Gujarat University",
    period: "2017 – 2020",
    cgpa: "7.85 / 10",
    specialization: "Computer Applications",
  },
];

export interface Achievement {
  /** Resolved to a lucide icon in the component. */
  icon: "leadership" | "delivery" | "team";
  text: string;
  /** Substring of `text` emphasised in accent — the standout fact. */
  highlight: string;
}

export const achievements: Achievement[] = [
  {
    icon: "leadership",
    text: "Promoted from React.js Developer to Team Leader within 2 years, based on strong technical and leadership performance.",
    highlight: "2 years",
  },
  {
    icon: "delivery",
    text: "Led delivery of enterprise React applications for American Express, Pearson, and Axis Bank.",
    highlight: "American Express, Pearson, and Axis Bank",
  },
  {
    icon: "team",
    text: "Directed a team of 6 remote developers across concurrent enterprise projects, delivering high-quality solutions.",
    highlight: "6",
  },
];

export interface LanguageProficiency {
  name: string;
  /** Short script glyph shown on the badge. */
  glyph: string;
  level: "Native" | "Professional";
  /** Per-language badge tint (the one place cool colours are allowed). */
  tint: string;
}

export const languages: LanguageProficiency[] = [
  { name: "English", glyph: "EN", level: "Professional", tint: "#60A5FA" },
  { name: "Hindi", glyph: "हि", level: "Native", tint: "#C084FC" },
  { name: "Marathi", glyph: "म", level: "Native", tint: "#38BDF8" },
  { name: "Gujarati", glyph: "ગ", level: "Native", tint: "#34D399" },
];

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

