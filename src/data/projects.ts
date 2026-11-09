import type { ImageMetadata } from "astro";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Métrica real y verificable. Si no existe, no se renderiza la línea RESULTADO. */
  result?: string;
  stack: string[];
  /** URL de la demo desplegada. Si no existe, no se renderiza el botón. */
  demoUrl?: string;
  /** URL del repositorio público. Si no existe, no se renderiza el botón. */
  repoUrl?: string;
  /** Captura real 1200×750 (WebP < 150 KB) importada desde src/assets. */
  image?: ImageMetadata;
  imageAlt?: string;
  /** Video del demo en MP4/WebM de 5–10 s; requiere poster para reduced motion. */
  video?: string;
  videoType?: "video/mp4" | "video/webm";
  poster?: ImageMetadata;
}

export const projects: Project[] = [
  {
    slug: "nailtrack-pro",
    title: "NailTrack Pro",
    category: "Fullstack · Reservas",
    description:
      "Sistema de reservas y gestión para manicuristas. Arquitectura desacoplada: API en Spring Boot, interfaz en Angular y agenda de citas en tiempo real.",
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL"],
    repoUrl: "https://github.com/SebasSoledad07/ReservasFrontend",
  },
  {
    slug: "rentflow-manager",
    title: "RentFlow Manager",
    category: "Gestión de propiedades",
    description:
      "Plataforma para administrar propiedades en alquiler: control de contratos de arrendamiento y flujos de pago en un solo lugar.",
    stack: ["Spring Boot", "React", "PostgreSQL"],
    repoUrl: "https://github.com/SebasSoledad07/Propiedades-front",
  },
  {
    slug: "educore-system",
    title: "EduCore System",
    category: "Gestión académica",
    description:
      "Sistema de gestión académica centrado en la experiencia del estudiante, con backend serverless sobre Supabase.",
    stack: ["React", "Supabase", "Tailwind CSS"],
  },
];
