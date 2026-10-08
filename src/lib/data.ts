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
  /** Core stack shown under the role in the hero. */
  techLine: string;
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
  role: "Senior Frontend Engineer",
  techLine: "React.js · TypeScript · Next.js",
  tagline:
    "I build scalable, high-performance frontend applications and own them end to end — from architecture and API layer to auth, CI/CD and code review.",
  location: "Pune, Maharashtra, India",
  email: "patilhemantsing@gmail.com",
  phone: "+91 9157094137",
  summary:
    "Senior Frontend Engineer with about 5 years of experience building large React.js, TypeScript and Next.js applications for clients like American Express, Pearson, Axis Bank and YES Securities. Owns frontend work end to end — folder structure, API layer, authentication, state management, CI/CD and code review — on platforms used by 250,000+ students and 550+ universities.",
  yearsExperience: "~5",
  links: {
    linkedin: "https://linkedin.com/in/hemantpatil135",
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
    "Senior Frontend Engineer with about 5 years building large React.js, TypeScript and Next.js applications for enterprise clients.",
  /** The "My Story" narrative paragraph. */
  story:
    "I own frontend work from the first folder to production — module structure, a shared API layer, authentication, state management, CI/CD and code review. That work has shipped for American Express, Pearson, Axis Bank, YES Securities and Interstride, on platforms used by 250,000+ students across 550+ universities. Earlier, as a Team Leader, I led 6 developers and mentored juniors.",
  bio: [
    "I'm a Senior Frontend Engineer based in Pune, India, with about 5 years building React.js, TypeScript and Next.js applications for clients including American Express, Pearson, Axis Bank and YES Securities.",
    "I own frontend work end to end: folder structure, API layer, authentication, state management, CI/CD and code review — with a focus on performance and test coverage.",
    "I was promoted from React.js Developer to Team Leader within 2 years, leading a team of 6 developers and mentoring juniors.",
  ],
  focus: [
    "Frontend architecture & shared API layer",
    "Performance — Lighthouse & Core Web Vitals",
    "Auth & role-based authorization",
    "Type-safe state with Redux Toolkit",
  ],
  facts: [
    { label: "Based in", value: "Pune, India" },
    { label: "Experience", value: "~5 years" },
    { label: "Enterprise clients", value: "10+ international" },
    { label: "Languages", value: "English · Hindi · Marathi · Gujarati" },
  ] as AboutFact[],
  quote:
    "I care less about code that merely works, and more about code that stays fast, stays readable, and holds up as the product grows.",
};

/** "My Story" highlight cards — icon key resolved in the component. */
export interface AboutHighlight {
  icon: "rocket" | "building" | "clients" | "code" | "team";
  value?: string;
  title: string;
  sub: string;
}

export const aboutHighlights: AboutHighlight[] = [
  {
    icon: "rocket",
    value: "~5",
    title: "Years of Experience",
    sub: "React.js, TypeScript & Next.js",
  },
  {
    icon: "building",
    title: "Enterprise Applications",
    sub: "Amex, Pearson, Axis Bank, YES Securities",
  },
  {
    icon: "code",
    title: "End-to-end Ownership",
    sub: "Architecture through delivery",
  },
  {
    icon: "team",
    title: "Team Leadership",
    sub: "Led 6 developers, mentored juniors",
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
    org: "iauro · YES Securities",
    blurb: "Built independently deployable micro-frontend modules.",
  },
  {
    year: "2025+",
    role: "Frontend Developer",
    org: "Interstride",
    blurb: "Owning frontend for 4 role-based portals across 7 user roles.",
  },
];

/** "Impact in numbers" — every figure is stated in the resume; "~" kept where the resume uses it. */
export interface ImpactStat {
  icon: "experience" | "students" | "universities" | "speed" | "api" | "team" | "testing" | "delivery";
  value: string;
  label: string;
}

export const impact: ImpactStat[] = [
  { icon: "experience", value: "~5 yrs", label: "Frontend engineering" },
  { icon: "students", value: "250K+", label: "Students on the platform" },
  { icon: "universities", value: "550+", label: "Universities served" },
  { icon: "speed", value: "~40%", label: "Faster Student Portal load" },
  { icon: "api", value: "~55%", label: "Fewer redundant API calls" },
  { icon: "testing", value: "100%", label: "Jest coverage on owned features" },
  { icon: "team", value: "6", label: "Developers led" },
  { icon: "delivery", value: "~95%", label: "On-time sprint delivery" },
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
    { title: "Interstride Portals", icon: "Users" },
    { title: "Amex Travel", icon: "CreditCard" },
    { title: "Axis Banking Portal", icon: "Building2" },
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
      { title: "Interstride Portals", icon: "Users" },
      { title: "Pearson Console+", icon: "BookOpen" },
      { title: "This Portfolio", icon: "Globe" },
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
      { title: "Pearson Console+", icon: "BookOpen" },
      { title: "Company Website", icon: "Globe" },
      { title: "This Portfolio", icon: "Globe" },
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
    usedIn: [{ title: "This Portfolio", icon: "Globe" }],
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
    uses: ["Component Libraries", "Theming", "Render Tuning", "Storybook Docs"],
    usedIn: [
      { title: "YES Securities", icon: "BarChart3" },
      { title: "Client Apps", icon: "FolderGit2" },
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
      { title: "Interstride Portals", icon: "Users" },
      { title: "YES Securities", icon: "BarChart3" },
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
    usedIn: [{ title: "Amex Travel", icon: "CreditCard" }],
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
    id: "sass",
    name: "SASS",
    icon: "sass",
    role: "Styling",
    color: "#CC6699",
    level: 85,
    description: "Structured, maintainable stylesheets at scale.",
    uses: ["Variables & Mixins", "Nesting", "Partials", "Theming"],
    usedIn: [{ title: "Client Projects", icon: "FolderGit2" }],
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
    title: "AI-assisted Workflow",
    sub: "Claude, ChatGPT & GitHub Copilot day to day",
  },
];

/** Full skill set, grouped exactly as on the resume. */
export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "React Hooks",
      "Context API",
      "Micro Frontend Architecture",
      "Component-Driven Development",
      "Responsive Design",
    ],
  },
  {
    title: "State Management",
    items: ["Redux", "Redux Toolkit", "Redux Saga", "Redux Thunk", "Context API"],
  },
  {
    title: "Frontend Architecture",
    items: [
      "Folder Structure & Module Design",
      "API Layer Design",
      "Authentication",
      "Role-Based Authorization",
      "Reusable Component Architecture",
      "Storybook",
    ],
  },
  {
    title: "Web Performance",
    items: [
      "Chrome DevTools Lighthouse",
      "Core Web Vitals",
      "Bundle-Size Optimization",
      "Lazy Loading",
      "Code Splitting",
      "Rendering Optimization",
    ],
  },
  { title: "Testing & Quality", items: ["Jest", "Unit Testing", "Code Reviews"] },
  {
    title: "CI/CD",
    items: ["GitHub Actions", "Jenkins", "GitLab CI", "Bitbucket Pipelines"],
  },
  { title: "APIs & Backend", items: ["REST APIs", "API Integration", "Node.js"] },
  {
    title: "UI & Styling",
    items: ["Material UI", "Styled Components", "Tailwind CSS", "SASS", "Bootstrap"],
  },
  { title: "Databases", items: ["MySQL", "MongoDB"] },
  { title: "Tools", items: ["Git", "Jira", "Rally", "Trello", "Asana"] },
  { title: "AI & Developer Tools", items: ["Claude", "ChatGPT", "GitHub Copilot"] },
  { title: "Methodologies", items: ["Agile", "Scrum"] },
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
    title: "Component Architecture",
    sub: "Reusable React + TypeScript components.",
  },
  {
    icon: "state",
    title: "State Management",
    sub: "Redux Toolkit, Redux Saga, Context API.",
  },
  {
    icon: "performance",
    title: "Performance Optimization",
    sub: "Lighthouse, Core Web Vitals, code splitting.",
  },
  {
    icon: "api",
    title: "API Layer & Auth",
    sub: "Shared REST layer, role-based authorization.",
  },
  {
    icon: "testing",
    title: "Testing & Code Review",
    sub: "Jest unit tests and CI/CD pipelines.",
  },
  {
    icon: "a11y",
    title: "Responsive UI",
    sub: "Consistent across devices and portals.",
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
  /** In-company career steps, earliest first — rendered as a promotion track. */
  progression?: { role: string; note: string }[];
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
      "Shipped 10+ production features across 4 role-based portals — Student, Admin, Employer and Admission — for a platform used by 550+ universities and 7 user roles, owning frontend design and delivery in React.js and TypeScript within an 8-person team.",
      "Set up the frontend folder structure, a shared API layer and the authentication pattern, giving all 4 portals one consistent base for new modules.",
      "Made the Student Portal load ~40% faster for 250,000+ students with route-level lazy loading, fewer unnecessary re-renders and a trimmed bundle, tracked with Chrome DevTools Lighthouse and Core Web Vitals.",
      "Built debounced search, filtering, sorting and pagination with React Hooks — cutting redundant API calls by ~55% and making search/filter results ~45% faster.",
      "Designed a reusable React + TypeScript component architecture that removed duplicate code across 8+ modules and sped up every module built after it.",
      "Moved REST API calls and shared state into Redux Toolkit, removing duplicated data-fetching logic across all 4 portals and keeping data consistent between workflows.",
      "Standardized role-based authorization across every portal, so each of the 7 user roles sees only the routes, actions and data it is allowed to.",
      "Kept on-time sprint delivery at ~95% by running code reviews and frontend CI/CD pipelines, working closely with backend, QA and product in Agile sprints.",
    ],
  },
  {
    company: "iauro Systems Pvt. Ltd.",
    role: "Software Engineer",
    period: "Feb 2025 – May 2025",
    project: "Client: YES Securities",
    stack: ["React.js", "Micro Frontend", "Material UI", "Storybook"],
    // Their footer mark is pure white, so it needs the dark plate.
    logo: "/logos/iauro.svg",
    logoPlate: "dark",
    metrics: [
      { value: "4+", label: "Modules deployed independently", icon: "boxes" },
      { value: "~35%", label: "Fewer re-renders", icon: "gauge" },
      { value: "~30%", label: "Fewer UI defects", icon: "shield" },
    ],
    highlights: [
      "Made 4+ modules independently deployable by building them on a Micro Frontend architecture in React.js.",
      "Reduced reported UI defects by ~30% across 8+ modules by building a reusable Material UI component library, documenting it in Storybook and standardizing component patterns.",
      "Cut unnecessary re-renders by ~35% by profiling with Chrome DevTools Lighthouse and Core Web Vitals, then fixing rendering and bundle-size issues.",
      "Reduced manual data handling by ~35% by building filtering, sorting and CRUD workflows against REST APIs.",
    ],
  },
  {
    company: "Koli Infotech Pvt. Ltd.",
    role: "Team Leader",
    period: "Nov 2021 – Feb 2025",
    project: "Enterprise client delivery",
    stack: ["React.js", "Next.js", "Redux Toolkit", "Redux Saga", "Material UI"],
    logo: "/logos/koli.png",
    logoPlate: "light",
    progression: [
      { role: "React.js Developer", note: "Joined Nov 2021" },
      { role: "Team Leader", note: "Promoted within 2 years" },
    ],
    metrics: [
      { value: "6", label: "Developers led", icon: "users" },
      { value: "~90%", label: "Projects on time", icon: "check" },
      { value: "10+", label: "International clients", icon: "globe" },
    ],
    clientNames: ["American Express", "Pearson", "Axis Bank"],
    highlights: [
      "Delivered ~90% of projects on time across 6+ enterprise engagements — including American Express, Pearson and Axis Bank — by leading a team of 6 remote developers and setting technical direction.",
      "Promoted from React.js Developer to Team Leader within 2 years on the strength of delivery and leadership.",
      "Delivered scalable, responsive React.js applications for 10+ international clients, designing their architecture with Redux Toolkit and Material UI.",
      "Reduced page load times by ~35% by directing REST API integration and reworking frontend workflows.",
      "Raised team sprint velocity by ~25% by mentoring 3 junior developers (including on Next.js projects), running sprint planning and owning code reviews.",
      "Built the company website and the Pearson Console+ project with Next.js.",
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
  /** Own work rather than NDA client work — changes the preview caption. */
  personal?: boolean;
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
      "Shipped 10+ production features across 4 role-based portals — Student, Admin, Employer and Admission — for 7 user roles, on a shared folder structure, API layer and authentication pattern, with REST data and shared state in Redux Toolkit.",
    features: [
      "Student, Admin, Employer & Admission portals — 7 roles",
      "Shared API layer, auth pattern & role-based authorization",
      "Debounced search & filtering — ~55% fewer API calls",
      "Lazy loading & bundle trimming — ~40% faster load for 250,000+ students",
    ],
    challenge:
      "One platform had to serve four portals and seven distinct user roles across 550+ universities, without the interface splintering into disconnected, hard-to-maintain screens.",
    solution:
      "Set up one frontend foundation — folder structure, shared API layer, auth pattern and a reusable React + TypeScript component architecture — with REST data centralized in Redux Toolkit.",
    impact:
      "Duplicate code removed across 8+ modules, ~55% fewer redundant API calls, ~45% faster search/filter results and a ~40% faster Student Portal for 250,000+ students.",
    liveUrl: "https://student.interstride.com/",
  },
  {
    title: "Travel Booking Platform",
    client: "American Express",
    stack: ["React.js", "Redux Saga", "Jest"],
    accent: "#FB923C",
    metric: "~40% faster refunds · 100% Jest coverage",
    logo: "/logos/amex.svg",
    logoPlate: "light",
    summary:
      "Built the Hotel Cancellation and Refund modules end to end, using Redux Saga to handle complex asynchronous refund states and side effects, with Jest unit tests written alongside the code.",
    features: [
      "End-to-end hotel cancellation & refund flows",
      "Redux Saga for complex async refund states",
      "Reduced refund processing time by ~40%",
      "100% Jest test coverage on every feature built",
    ],
    challenge:
      "Hotel cancellations and refunds run on multi-step, asynchronous state that can strand a booking mid-flow if any single step fails.",
    solution:
      "Owned the cancellation and refund modules end to end with Redux Saga, orchestrating the async side effects as one explicit flow and covering it with Jest unit tests.",
    impact:
      "Refund processing time cut by ~40%, with 100% test coverage on every feature built.",
    liveUrl:
      "https://www.americanexpress.com/en-ca/travel/the-hotel-collection/",
  },
  {
    title: "Console+",
    client: "Pearson",
    stack: ["Next.js", "React.js", "TypeScript", "Redux Toolkit"],
    accent: "#F97316",
    metric: "~30% faster course setup · 5+ content teams",
    logo: "/logos/pearson.png",
    logoPlate: "dark",
    summary:
      "Built instructor-driven course creation modules for Pearson's education platform with Next.js, Redux Toolkit and type-safe TypeScript data flow.",
    features: [
      "Instructor-driven course creation modules",
      "Type-safe data flow with TypeScript",
      "Supported 5+ content teams",
      "Reduced course setup time by ~30%",
    ],
    challenge:
      "Content teams needed to author courses dynamically, but ad-hoc data flow made the tooling fragile and slow to extend across teams.",
    solution:
      "Delivered instructor-driven course-creation modules on Next.js and Redux Toolkit with end-to-end TypeScript, giving the data flow the type safety to scale.",
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
      "Built receipt generation and editing flows with strong validation and error handling for a customer relationship management platform.",
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
  {
    title: "Personal Portfolio",
    client: "Hemant Patil",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    accent: "#FB923C",
    metric: "Vercel · Dynamic OG images · SEO metadata",
    logo: "/favicon.svg",
    logoPlate: "dark",
    personal: true,
    summary:
      "This site — built with Next.js, TypeScript and Tailwind CSS and deployed on Vercel, with dynamically generated Open Graph images and SEO metadata.",
    features: [
      "Next.js App Router with TypeScript",
      "Dynamic Open Graph image generation",
      "SEO metadata, sitemap & structured data",
      "Deployed on Vercel",
    ],
    challenge:
      "A portfolio has to load fast and share well — recruiters often see the link preview before they ever see the site.",
    solution:
      "Built it on Next.js with TypeScript and Tailwind CSS, generating Open Graph images on demand and shipping SEO metadata with every page.",
    impact:
      "A fast, shareable portfolio deployed on Vercel with rich link previews.",
    liveUrl: "https://hemantpatil.vercel.app",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { label: "Years of Experience", value: 5, suffix: "", prefix: "~" },
  { label: "Enterprise Projects", value: 6, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "" },
  { label: "International Clients", value: 10, suffix: "+" },
  { label: "Developers Led", value: 6, suffix: "" },
  { label: "On-time Delivery", value: 95, suffix: "%", prefix: "~" },
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

