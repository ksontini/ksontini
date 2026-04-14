// ── lib/data.ts ──────────────────────────────────────────────────────────────
// Single source of truth for all site copy & content.
// ─────────────────────────────────────────────────────────────────────────────

export const hero = {
  preheadline: "SENIOR TECH LEAD & SOLUTION ARCHITECT",
  h1Line1: "I build systems",
  h1Line2: "that run businesses.",
  subheadline: "17 years of enterprise architecture · PHP/Symfony · Node.js · Cloud",
  subheadline2: "Co-founder. Operator. Engineer.",
  body: "I design and ship backend systems that sit at the core of operations — ERPs, PMS, POS platforms, distributed APIs. I also run a retail & production business, which means I understand cash flow, constraints, and what it costs when a system goes down.",
  stats: [
    { value: "17+", label: "Years of experience" },
    { value: "50 / 50", label: "Engineer × Entrepreneur" },
    { value: "Remote-ready", label: "Open to EU teams" },
  ],
};

export const about = {
  label: "ABOUT",
  h2Line1: "The engineer who runs a business.",
  h2Line2: "The entrepreneur who architects systems.",
  paragraphs: [
    "I've spent 17 years designing and building backend systems for B2B companies — from ERP and PMS platforms to distributed APIs serving thousands of daily users. My core stack is PHP/Symfony and Node.js, but my real expertise is architectural thinking: how to structure systems that are maintainable, scalable, and aligned with business reality.",
    "In parallel, I co-founded and operate a retail & production business. That experience changed how I think about software. When you've managed inventory, cash flow, and operations under real pressure, you stop over-engineering. You build what solves the problem — reliably, at the right cost, on time.",
    "I work best at the intersection of both worlds: with teams and companies where technical excellence and business outcomes are the same conversation. Based in Tunisia, open to remote engagements with European teams.",
  ],
  facts: [
    { icon: "MapPin", label: "Location", value: "Hammamet, Tunisia" },
    { icon: "Globe", label: "Target market", value: "Europe (remote)" },
    { icon: "Languages", label: "Languages", value: "French · English · Arabic" },
    { icon: "Briefcase", label: "Roles", value: "Tech Lead · Solution Architect · Advisory" },
  ],
};

export type ExpertiseCard = {
  title: string;
  description: string;
  tags: string[];
  icon: string;
};

export const expertiseCards: ExpertiseCard[] = [
  {
    icon: "Network",
    title: "Solution Architecture",
    description: "Design scalable, maintainable systems from the ground up. API-first, event-driven, cloud-ready.",
    tags: ["Distributed Systems", "Microservices", "Event-driven"],
  },
  {
    icon: "Code2",
    title: "Backend Engineering",
    description: "Deep expertise in PHP/Symfony and Node.js. Legacy modernization, performance optimization, CI/CD.",
    tags: ["PHP 8 / Symfony", "Node.js", "Python"],
  },
  {
    icon: "Plug",
    title: "API Design & Integration",
    description: "RESTful and async API platforms. Third-party system integration. Developer experience focus.",
    tags: ["REST", "Webhooks", "OpenAPI"],
  },
  {
    icon: "Cloud",
    title: "Cloud & Infrastructure",
    description: "Hybrid architectures, Docker Swarm, Nginx load balancing, WireGuard networking.",
    tags: ["Docker", "CI/CD", "OVH / Cloud"],
  },
  {
    icon: "RefreshCw",
    title: "Legacy Modernization",
    description: "PHP 5→8 migrations, Symfony upgrades, dependency refactoring. Zero downtime approach.",
    tags: ["Migration", "Refactoring", "GitLab"],
  },
  {
    icon: "Users",
    title: "Tech Leadership",
    description: "Team enablement, architecture documentation, delivery ownership, cross-functional communication.",
    tags: ["Team Lead", "Architecture", "Delivery"],
  },
];

export type StackCategory = {
  category: string;
  items: { name: string; level: number }[];
};

export const stackCategories: StackCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "PHP 8.x", level: 5 },
      { name: "Node.js", level: 5 },
      { name: "Python", level: 4 },
      { name: "JavaScript/TS", level: 4 },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Symfony", level: 5 },
      { name: "Next.js", level: 3 },
      { name: "Express", level: 4 },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker / Swarm", level: 4 },
      { name: "Nginx", level: 4 },
      { name: "Jenkins", level: 4 },
      { name: "GitLab CI", level: 4 },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL / MariaDB", level: 5 },
      { name: "Redis", level: 4 },
      { name: "PostgreSQL", level: 3 },
    ],
  },
  {
    category: "Architecture",
    items: [
      { name: "REST APIs", level: 5 },
      { name: "Event-driven", level: 4 },
      { name: "Microservices", level: 4 },
      { name: "WireGuard", level: 3 },
    ],
  },
];

export type CaseStudy = {
  id: number;
  title: string;
  clientType: string;
  year: string;
  challenge: string;
  approach: string[];
  outcome: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "PHP 8 Enterprise Migration",
    clientType: "B2B SaaS — Enterprise Portal (OpenBee Portal)",
    year: "2024–2025",
    challenge:
      "Legacy Symfony 1.5/sf3 application running on PHP 5.x. Needed migration to PHP 8.3 without downtime and without breaking a multi-module B2B workflow used by enterprise clients.",
    approach: [
      "Audit entire codebase for PHP 8 breaking changes (strict typing, reference passing, deprecated functions).",
      "Isolated CI/CD pipeline on GitLab/Jenkins — parallel build with PHP 8.3.",
      "Fixed sfOutputEscaperArrayDecorator type enforcement failures.",
      "Built custom Xdebug 3.x profiler analysis tool (Python CLI) to identify performance bottlenecks.",
      "Resolved Composer dependency desynchronization across environments.",
    ],
    outcome:
      "Successful PHP 8.3 migration. CI/CD pipeline stabilized. Performance bottlenecks identified and roadmap created. System maintainability significantly improved.",
    tags: ["PHP 8.3", "Symfony", "CI/CD", "Jenkins", "GitLab", "Performance", "Xdebug"],
  },
  {
    id: 2,
    title: "Infrastructure Scaling (Node.js SaaS)",
    clientType: "B2C / B2B SaaS — Next.js + MySQL + Redis application",
    year: "2024",
    challenge:
      "Single OVH VPS becoming a bottleneck as traffic grew. No redundancy, no horizontal scaling capability, deployment required downtime.",
    approach: [
      "Designed private cloud architecture using multiple OVH VPS nodes.",
      "WireGuard VPN for secure internal networking between nodes.",
      "Nginx load balancer with upstream pool configuration.",
      "Docker Swarm for container orchestration.",
      "Jenkins pipeline adapted for multi-node deployment.",
    ],
    outcome:
      "Zero-downtime deployments. Horizontal scaling capability unlocked. Infrastructure cost optimized vs managed cloud alternatives.",
    tags: ["Docker Swarm", "Nginx", "WireGuard", "OVH", "Jenkins", "Node.js", "Redis"],
  },
  {
    id: 3,
    title: "Entrepreneur Lens — Business Systems",
    clientType: "Co-founded retail & production business — operational from day one",
    year: "2020–present",
    challenge:
      "Building internal systems (inventory, POS, cash flow tracking) with zero VC budget, real operational pressure, and a need for immediate ROI.",
    approach: [
      "Applied the same architectural discipline used in enterprise SaaS: simple first, scalable by design.",
      "Selected off-the-shelf tools where ROI was clear.",
      "Custom-built only where competitive differentiation required it.",
    ],
    outcome:
      "Systems that survived real operational load. Developed a practitioner's understanding of: cash flow impact of downtime, build-vs-buy decisions under constraint, and what 'operational scalability' actually means.",
    tags: ["Operations", "POS", "Inventory", "Build vs Buy", "Cash Flow Awareness"],
  },
];

export type Tool = {
  name: string;
  oneliner: string;
  language: string;
  description: string;
  githubUrl: string;
};

export const tools: Tool[] = [
  {
    name: "xdebug_analyze",
    oneliner: "CLI profiler analyzer for Xdebug 3.x cachegrind files — built for PHP performance debugging",
    language: "Python",
    description:
      "Parses cachegrind output from Xdebug 3.x. Identifies top call stacks by time/calls. Flags external process forks (exec/shell calls). Detects Assetic formula-loading overhead. Outputs a structured performance report in terminal.",
    githubUrl: "https://github.com/ksontini/xdebug-analyze",
  },
];

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
};

export const articles: Article[] = [
  {
    category: "Technical",
    title: "How I debugged a Symfony performance bottleneck with Xdebug 3.x",
    excerpt:
      "A step-by-step walkthrough: from slow page load to identified culprit using a custom cachegrind analyzer.",
    readTime: "8 min read",
    date: "Mar 2025",
  },
  {
    category: "Tech × Business",
    title: "What running a retail business taught me about software architecture",
    excerpt:
      "The 3 architectural decisions I make differently now that I've managed cash flow, inventory, and real operational pressure.",
    readTime: "6 min read",
    date: "Feb 2025",
  },
  {
    category: "Opinion",
    title: "Why legacy system migration is an architecture project, not a dev task",
    excerpt:
      "Most legacy migrations fail because they're treated as code rewrites. Here's how to approach them as design problems.",
    readTime: "5 min read",
    date: "Jan 2025",
  },
];

export const contact = {
  headline: "Let's build something that works.",
  subtext:
    "I'm open to Tech Lead and Solution Architect roles with remote-friendly European teams, as well as advisory engagements and fractional CTO conversations.",
  social: [
    { label: "LinkedIn", url: "https://linkedin.com/in/ksontini", icon: "Linkedin" },
    { label: "GitHub", url: "https://github.com/ksontini", icon: "Github" },
    { label: "Email", url: "mailto:anis@ksontini.me", icon: "Mail" },
    { label: "Hammamet, Tunisia · Remote", url: null, icon: "MapPin" },
  ],
};
