/**
 * English copy for `/en/`. Mirrors the keys in `es.ts`.
 * Proper names (people, universities, products) are not translated.
 */
export const en = {
  meta: {
    title: "Soledad.dev | FullStack & Architecture",
    description:
      "Professional portfolio of Sebastián Soledad — Systems Engineering student, FullStack developer with Java, Spring Boot and React, and AI agents in his workflow.",
  },

  nav: {
    aria: "Main",
    items: [
      { label: "About me", href: "#sobre-mi" },
      { label: "Experience", href: "#experiencia" },
      { label: "Stack", href: "#stack" },
      { label: "Projects", href: "#proyectos" },
      { label: "Personal", href: "#personal" },
      { label: "Contact", href: "#contacto" },
    ],
    cv: "Download CV",
    language: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    availability: "Available for projects · Cúcuta, COL",
    subtitlePre: "Systems Engineering student building ",
    subtitleStrong: "fullstack applications with Java, Spring Boot and React",
    subtitlePost:
      ": bookings, rentals and point of sale; I also bring AI agents into the development workflow.",
    primaryCta: "View projects ↗",
    cvCta: "Download CV",
    stackLabel: "Daily stack",
  },

  about: {
    eyebrow: "// About me",
    titleLead: "From the database ",
    titleAccent: "to the interface",
    paragraphs: [
      "I'm Sebastián Soledad, a Systems Engineering student at Universidad Francisco de Paula Santander in Cúcuta, and a FullStack developer. I enjoy building complete applications —bookings, rentals and point of sale— with architecture in mind: decoupled REST APIs, relational databases and clear interfaces.",
      "I work with hexagonal architecture to separate business logic from infrastructure, and with Docker to take projects to production. I bring AI agents into my development workflow and right now I'm building a booking system, a rental platform and a point-of-sale system for a stationery store, end to end.",
    ],
    lookingFor: "Looking for",
    goals: ["Own projects", "Junior role", "Remote"],
    imageAlt: "Portrait of Sebastián Soledad",
  },

  experience: {
    eyebrow: "// Experience",
    titleLead: "Career ",
    titleAccent: "Path",
    items: [
      {
        date: "2026 — Present",
        role: "Fullstack Developer",
        company: "Soledad.dev · Own projects",
        current: true,
        description:
          "Building complete web applications: requirements analysis, database design, REST API, security, deployment and AI agents supporting the workflow.",
        highlights: [
          "Spring Security (JWT)",
          "Docker",
          "Render / Railway",
          "Testing and debugging",
          "AI agents",
        ],
      },
      {
        date: "2021 — 2027 (EST.)",
        role: "Systems Engineering",
        company: "Universidad Francisco de Paula Santander",
        current: false,
        description:
          "In progress. Estimated graduation in December 2027. Strong foundations in algorithms, data structures and software engineering principles.",
        highlights: ["Java Enterprise", "Spring Boot", "Clean Architecture"],
      },
    ],
    certifications: {
      eyebrow: "// Certifications",
      titleLead: "Continuous ",
      titleAccent: "Learning",
      items: [
        {
          issuer: "AWS",
          year: "2024",
          title: "AWS Academy Cloud Operations",
        },
        {
          issuer: "CISCO",
          year: "2024 — 2025",
          title: "Networking Basic & Operating Systems Basic",
        },
        {
          issuer: "LACNIC",
          year: "2025",
          title: "Introducción a Gestión de Redes e IPv6 Básico",
        },
        {
          issuer: "BIG SCHOOL",
          year: "2026",
          title: "Desarrollo con IA: Programa con Agentes",
        },
      ],
    },
  },

  skills: {
    eyebrow: "// Stack",
    titleLead: "Infrastructure & ",
    titleAccent: "Technologies",
    categories: [
      {
        title: "Core Backend",
        description: "Business logic and robust services.",
        skills: [
          "Java",
          "Spring Boot",
          "Spring Security",
          "Python",
          "Django",
          "REST APIs",
        ],
      },
      {
        title: "Frontend & UI",
        description: "Reactive interfaces and user experience.",
        skills: [
          "Angular",
          "React",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "HTML5 / CSS3",
        ],
      },
      {
        title: "Data Strategy",
        description: "Persistence and data modeling.",
        skills: ["PostgreSQL", "MySQL", "Supabase"],
      },
      {
        title: "DevOps & Cloud",
        description: "Scalable deployment and automation.",
        skills: ["Docker", "Render", "Railway", "GCP", "Git / GitHub"],
      },
      {
        title: "Methodology & AI",
        description: "Engineering judgment and AI support in the day to day.",
        skills: ["Clean Architecture", "AI Agents", "Testing", "Debugging"],
      },
    ],
  },

  projects: {
    eyebrow: "// Projects",
    titleLead: "Featured ",
    titleAccent: "Projects",
    card: {
      preview: "Preview",
      placeholder: "Project interface",
      highlight: "Highlight",
      demo: "Live demo ↗",
      code: "Code",
      imageAltPrefix: "Interface of",
      videoAltPrefix: "Demo of",
    },
  },

  personal: {
    eyebrow: "// Off_the_clock",
    titleLead: "Beyond the ",
    titleAccent: "Code",
    teamLabel: "Favorite_team",
    seriesLabel: "Series watched",
  },

  contact: {
    eyebrow: "// Contact",
    titleLead: "Got a project? ",
    titleAccent: "Let's talk.",
    intro:
      "Tell me what you need and I'll reply within 24 hours. I'm open to projects and job opportunities.",
    whatsapp: "WhatsApp",
    whatsappMessage:
      "Hi Sebastián, I saw your portfolio and I'd like to talk about a project.",
  },

  footer: {
    status: "Operational // Cúcuta, COL",
    socialLabel: "Social links",
    madeWith: "Built with Astro + Tailwind CSS",
  },
};
