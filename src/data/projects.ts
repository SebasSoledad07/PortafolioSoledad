import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n";

/** Texto que existe en ambos idiomas del sitio. */
export type LocalizedText = Record<Lang, string>;

export interface Project {
  slug: string;
  title: string;
  category: LocalizedText;
  description: LocalizedText;
  /** Dato real y verificable del CV/repositorio. Si no existe, no se renderiza la línea DESTACADO. */
  highlight?: LocalizedText;
  stack: string[];
  /** URL de la demo desplegada. Si no existe, no se renderiza el botón. */
  demoUrl?: string;
  /** URL del repositorio público. Si no existe, no se renderiza el botón. */
  repoUrl?: string;
  /** Captura real 1200×750 (WebP < 150 KB) importada desde src/assets. */
  image?: ImageMetadata;
  imageAlt?: LocalizedText;
  /** Video del demo en MP4/WebM de 5–10 s; requiere poster para reduced motion. */
  video?: string;
  videoType?: "video/mp4" | "video/webm";
  poster?: ImageMetadata;
}

export const projects: Project[] = [
  {
    slug: "papeleria-pos",
    title: "Papelería POS",
    category: {
      es: "SaaS · Punto de venta e inventario",
      en: "SaaS · Point of sale & inventory",
    },
    description: {
      es: "Sistema para una papelería en Colombia: catálogo con código de barras, inventario con kárdex, compras, caja con tirilla, ventas con pagos mixtos y reportes.",
      en: "System for a stationery store in Colombia: barcode catalog, inventory with stock ledger, purchases, cash drawer with receipts, mixed-payment sales and reports.",
    },
    highlight: {
      es: "3 roles (Administrador, Bodeguero, Cajero), alertas de stock bajo y reportes exportables a Excel y PDF.",
      en: "3 roles (Administrator, Warehouse, Cashier), low-stock alerts and reports exportable to Excel and PDF.",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL", "React", "TypeScript"],
    repoUrl: "https://github.com/SebasSoledad07/Proyecto-Papeleria",
  },
  {
    slug: "nailtrack-pro",
    title: "NailTrack Pro",
    category: { es: "SaaS · Reservas", en: "SaaS · Bookings" },
    description: {
      es: "Sistema de reservas y gestión para manicuristas. Arquitectura desacoplada: API en Spring Boot con seguridad JWT, interfaz en Angular 21 y despliegue en contenedores.",
      en: "Booking and management system for manicurists. Decoupled architecture: Spring Boot API with JWT security, Angular 21 interface and container-based deployment.",
    },
    highlight: {
      es: "Spring Security con JWT, Angular 21, Docker y despliegue en Render / Railway.",
      en: "Spring Security with JWT, Angular 21, Docker and deployment on Render / Railway.",
    },
    stack: ["Java", "Spring Boot", "Spring Security", "Angular", "Docker"],
    repoUrl: "https://github.com/SebasSoledad07/ReservasBackend",
  },
  {
    slug: "rentflow-manager",
    title: "RentFlow Manager",
    category: { es: "Plataforma · Alquileres", en: "Platform · Rentals" },
    description: {
      es: "API RESTful desacoplada para administrar propiedades en alquiler: propiedades, inquilinos, contratos, pagos y autenticación basada en roles, con frontend independiente.",
      en: "Decoupled RESTful API to manage rental properties: properties, tenants, contracts, payments and role-based authentication, with a separate frontend.",
    },
    highlight: {
      es: "API RESTful desacoplada y pruebas de integración de extremo a extremo.",
      en: "Decoupled RESTful API and end-to-end integration tests.",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"],
    repoUrl: "https://github.com/SebasSoledad07/GestionPropiedades",
  },
];
