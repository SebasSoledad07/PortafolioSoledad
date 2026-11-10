/**
 * Textos del sitio en español. Es la fuente de verdad de `/`.
 * Al añadir una cadena, replica la misma clave en `en.ts`.
 */
export const es = {
  meta: {
    title: "Soledad.dev | FullStack & Architecture",
    description:
      "Portafolio profesional de Sebastián Soledad — Ingeniero de Sistemas en formación, desarrollador FullStack con Java, Spring Boot y React, y agentes de IA en su flujo de trabajo.",
  },

  nav: {
    aria: "Principal",
    items: [
      { label: "Sobre mí", href: "#sobre-mi" },
      { label: "Experiencia", href: "#experiencia" },
      { label: "Stack", href: "#stack" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Personal", href: "#personal" },
      { label: "Contacto", href: "#contacto" },
    ],
    cv: "Descargar CV",
    language: "Idioma",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },

  hero: {
    availability: "Disponible para proyectos · Cúcuta, COL",
    subtitlePre: "Ingeniero de Sistemas en formación que construye aplicaciones ",
    subtitleStrong: "fullstack con Java, Spring Boot y React",
    subtitlePost:
      ": reservas, alquileres y punto de venta; también integro agentes de IA en el desarrollo.",
    primaryCta: "Ver proyectos ↗",
    cvCta: "Descargar CV",
    stackLabel: "Stack diario",
  },

  about: {
    eyebrow: "// Sobre mí",
    titleLead: "De la base de datos ",
    titleAccent: "a la interfaz",
    paragraphs: [
      "Soy Sebastián Soledad, Ingeniero de Sistemas en formación en la Universidad Francisco de Paula Santander, en Cúcuta, y desarrollador FullStack. Disfruto construir aplicaciones completas —reservas, alquileres y punto de venta— cuidando la arquitectura: APIs REST desacopladas, bases de datos relacionales e interfaces claras.",
      "Trabajo con arquitectura hexagonal para separar la lógica de negocio de la infraestructura y con Docker para llevar los proyectos a producción. Integro agentes de IA en mi flujo de desarrollo y, ahora mismo, llevo de principio a fin un sistema de reservas, una plataforma de alquileres y un punto de venta para papelería.",
    ],
    lookingFor: "Busco",
    goals: ["Proyectos propios", "Posición junior", "Remoto"],
    imageAlt: "Retrato de Sebastián Soledad",
  },

  experience: {
    eyebrow: "// Experiencia",
    titleLead: "Trayectoria ",
    titleAccent: "Profesional",
    items: [
      {
        date: "2026 — Actualidad",
        role: "Fullstack Developer",
        company: "Soledad.dev · Proyectos propios",
        current: true,
        description:
          "Desarrollo de aplicaciones web completas: análisis de requisitos, diseño de base de datos, API REST, seguridad, despliegue y agentes de IA como apoyo del flujo de trabajo.",
        highlights: [
          "Spring Security (JWT)",
          "Docker",
          "Render / Railway",
          "Pruebas y depuración",
          "Agentes de IA",
        ],
      },
      {
        date: "2021 — 2027 (EST.)",
        role: "Ingeniería de Sistemas",
        company: "Universidad Francisco de Paula Santander",
        current: false,
        description:
          "Cursando. Graduación estimada en diciembre de 2027. Bases sólidas en algoritmos, estructuras de datos y principios de ingeniería de software.",
        highlights: ["Java Enterprise", "Spring Boot", "Arquitectura Limpia"],
      },
    ],
    certifications: {
      eyebrow: "// Certificaciones",
      titleLead: "Formación ",
      titleAccent: "Continua",
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
    titleLead: "Infraestructura & ",
    titleAccent: "Tecnologías",
    categories: [
      {
        title: "Core Backend",
        description: "Lógica de negocio y servicios robustos.",
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
        description: "Interfaces reactivas y experiencia de usuario.",
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
        description: "Persistencia y modelado de datos.",
        skills: ["PostgreSQL", "MySQL", "Supabase"],
      },
      {
        title: "DevOps & Cloud",
        description: "Despliegue escalable y automatización.",
        skills: ["Docker", "Render", "Railway", "GCP", "Git / GitHub"],
      },
      {
        title: "Metodología & IA",
        description: "Criterio de ingeniería y apoyo de IA en el día a día.",
        skills: ["Arquitectura Limpia", "Agentes de IA", "Pruebas", "Depuración"],
      },
    ],
  },

  projects: {
    eyebrow: "// Proyectos",
    titleLead: "Proyectos ",
    titleAccent: "Destacados",
    card: {
      preview: "Vista previa",
      placeholder: "Interfaz del proyecto",
      highlight: "Destacado",
      demo: "Demo en vivo ↗",
      code: "Código",
      imageAltPrefix: "Interfaz de",
      videoAltPrefix: "Demo de",
    },
  },

  personal: {
    eyebrow: "// Fuera_del_código",
    titleLead: "Más allá del ",
    titleAccent: "Código",
    teamLabel: "Favorite_team",
    seriesLabel: "Series vistas",
  },

  contact: {
    eyebrow: "// Contacto",
    titleLead: "¿Tienes un proyecto? ",
    titleAccent: "Hablemos.",
    intro:
      "Cuéntame qué necesitas y te respondo en menos de 24 horas. Estoy abierto a proyectos y a oportunidades de trabajo.",
    whatsapp: "WhatsApp",
    whatsappMessage:
      "Hola Sebastián, vi tu portafolio y quiero hablar sobre un proyecto.",
  },

  footer: {
    status: "Operational // Cúcuta, COL",
    socialLabel: "Redes sociales",
    madeWith: "Hecho con Astro + Tailwind CSS",
  },
};
