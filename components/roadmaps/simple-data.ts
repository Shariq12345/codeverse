import { RoadmapMeta } from "./types";

export const ROADMAPS: RoadmapMeta[] = [
  {
    slug: "frontend",
    title: "Frontend Developer",
    short: "HTML • CSS • JavaScript • Frameworks • Tooling",
    difficulty: "beginner",
    estMonths: 6,
    tags: ["web", "ui", "react", "css"],
    theme: "from-pink-500 via-fuchsia-500 to-purple-500",
    nodes: [
      {
        id: "internet-fundamentals",
        title: "Internet Fundamentals",
        level: 0,
        description: "Understanding how the internet works",
        children: [
          {
            id: "http-https",
            title: "HTTP/HTTPS",
            level: 1,
            description:
              "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS adds a security layer using SSL/TLS encryption. Understanding these protocols is crucial for web development as they define how browsers and servers communicate.",
          },
          {
            id: "dns",
            title: "DNS",
            level: 1,
            description:
              "Domain Name System (DNS) translates human-readable domain names (like google.com) into IP addresses that computers can understand. It's like the phonebook of the internet.",
          },
          {
            id: "browsers",
            title: "How Browsers Work",
            level: 1,
            description:
              "Understanding how browsers parse HTML, CSS, and JavaScript, render pages, and handle user interactions. This includes the DOM, rendering engine, and JavaScript engine concepts.",
          },
        ],
      },
      {
        id: "html",
        title: "HTML",
        level: 0,
        description: "Structure web content with semantic markup",
        children: [
          {
            id: "html-basics",
            title: "HTML Basics",
            level: 1,
            description:
              "Learn the fundamental building blocks of web pages: elements, tags, attributes, and document structure.",
          },
          {
            id: "semantic-html",
            title: "Semantic HTML",
            level: 1,
            description:
              "Use HTML elements that convey meaning about the content structure, improving accessibility and SEO.",
          },
          {
            id: "forms",
            title: "Forms & Validation",
            level: 1,
            description:
              "Create interactive forms with proper validation, input types, and user-friendly experiences.",
          },
          {
            id: "accessibility",
            title: "Accessibility",
            level: 1,
            optional: true,
            description:
              "Make web content usable for people with disabilities through proper ARIA attributes, semantic markup, and keyboard navigation.",
          },
        ],
      },
      {
        id: "css",
        title: "CSS",
        level: 0,
        description: "Style and layout for web pages",
        children: [
          {
            id: "css-basics",
            title: "CSS Fundamentals",
            level: 1,
            description:
              "Learn selectors, properties, values, specificity, and the cascade to style web pages effectively.",
          },
          {
            id: "flexbox",
            title: "Flexbox",
            level: 1,
            description:
              "Master one-dimensional layouts with flexible containers and items for responsive design.",
          },
          {
            id: "grid",
            title: "CSS Grid",
            level: 1,
            description:
              "Create complex two-dimensional layouts with powerful grid system for modern web design.",
          },
          {
            id: "responsive",
            title: "Responsive Design",
            level: 1,
            description:
              "Build websites that work seamlessly across all device sizes using media queries and flexible layouts.",
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        level: 0,
        description: "Add interactivity and dynamic behavior",
        children: [
          {
            id: "js-basics",
            title: "JavaScript Fundamentals",
            level: 1,
            description:
              "Variables, functions, control structures, and basic programming concepts in JavaScript.",
          },
          {
            id: "dom",
            title: "DOM Manipulation",
            level: 1,
            description:
              "Learn to interact with HTML elements, handle events, and create dynamic user interfaces.",
          },
          {
            id: "async",
            title: "Async JavaScript",
            level: 1,
            description:
              "Master promises, async/await, and handling asynchronous operations like API calls.",
          },
          {
            id: "es6",
            title: "Modern JavaScript (ES6+)",
            level: 1,
            description:
              "Arrow functions, destructuring, modules, template literals, and other modern JavaScript features.",
          },
        ],
      },
      {
        id: "frameworks",
        title: "Frontend Frameworks",
        level: 0,
        description: "Popular libraries and frameworks",
        children: [
          {
            id: "react",
            title: "React",
            level: 1,
            description:
              "Learn component-based architecture, hooks, state management, and building interactive UIs with React.",
          },
          {
            id: "vue",
            title: "Vue.js",
            level: 1,
            optional: true,
            description:
              "Progressive framework for building user interfaces with a gentle learning curve and powerful features.",
          },
          {
            id: "angular",
            title: "Angular",
            level: 1,
            optional: true,
            description:
              "Full-featured framework with TypeScript, dependency injection, and comprehensive tooling.",
          },
        ],
      },
      {
        id: "tools",
        title: "Development Tools",
        level: 0,
        description: "Essential tools for modern development",
        children: [
          {
            id: "git",
            title: "Git & GitHub",
            level: 1,
            description:
              "Version control with Git and collaboration on GitHub for managing code and working in teams.",
          },
          {
            id: "npm",
            title: "Package Managers",
            level: 1,
            description:
              "Manage dependencies and scripts using npm, yarn, or pnpm for JavaScript projects.",
          },
          {
            id: "webpack",
            title: "Build Tools",
            level: 1,
            description:
              "Bundle and optimize code with tools like Webpack, Vite, or Parcel for production deployment.",
          },
        ],
      },
    ],
  },
  {
    slug: "backend",
    title: "Backend Developer",
    short: "Server • Database • API • Security • DevOps",
    difficulty: "intermediate",
    estMonths: 8,
    tags: ["server", "api", "database", "security"],
    theme: "from-green-500 via-emerald-500 to-teal-500",
    nodes: [
      {
        id: "languages",
        title: "Programming Languages",
        level: 0,
        description: "Core server-side programming languages",
        children: [
          {
            id: "javascript",
            title: "JavaScript/Node.js",
            level: 1,
            description:
              "Server-side JavaScript runtime for building scalable network applications and APIs.",
          },
          {
            id: "python",
            title: "Python",
            level: 1,
            description:
              "Versatile language with frameworks like Django and Flask for web development and data processing.",
          },
          {
            id: "java",
            title: "Java",
            level: 1,
            optional: true,
            description:
              "Enterprise-grade language with Spring framework for building robust, scalable applications.",
          },
        ],
      },
      {
        id: "databases",
        title: "Databases",
        level: 0,
        description: "Data storage and management",
        children: [
          {
            id: "sql",
            title: "SQL Databases",
            level: 1,
            description:
              "Relational databases like PostgreSQL and MySQL for structured data with ACID compliance.",
          },
          {
            id: "nosql",
            title: "NoSQL Databases",
            level: 1,
            description:
              "Document, key-value, and graph databases like MongoDB, Redis, and Neo4j for flexible data models.",
          },
        ],
      },
      {
        id: "apis",
        title: "APIs & Services",
        level: 0,
        description: "Building and consuming web services",
        children: [
          {
            id: "rest",
            title: "REST APIs",
            level: 1,
            description:
              "Design and implement RESTful web services with proper HTTP methods, status codes, and resource modeling.",
          },
          {
            id: "graphql",
            title: "GraphQL",
            level: 1,
            description:
              "Query language and runtime for APIs that allows clients to request exactly the data they need.",
          },
          {
            id: "microservices",
            title: "Microservices",
            level: 1,
            optional: true,
            description:
              "Architectural pattern for building applications as a collection of loosely coupled, independently deployable services.",
          },
        ],
      },
    ],
  },
];

// Helper function to get a roadmap by slug
export function getRoadmap(slug: string): RoadmapMeta | undefined {
  return ROADMAPS.find((roadmap) => roadmap.slug === slug);
}
