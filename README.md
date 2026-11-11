# Soledad.dev — Portafolio personal

Portafolio profesional de **Sebastián Soledad**, Ingeniero de Sistemas en formación y desarrollador FullStack. Sitio estático bilingüe (ES/EN) con portada, sobre mí, experiencia, stack, proyectos, «fuera del código» y contacto.

![Astro](https://img.shields.io/badge/Astro-6-BC52EE?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D22.12-339933?logo=nodedotjs&logoColor=white)

> **Estado:** v2 en curso. Contenido, diseño y secciones implementados; faltan capturas, demos y algunos extras de SEO/analítica. Ver [Pendientes](#pendientes).
>
> **Demo:** pendiente de despliegue.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) 6 (salida estática, sin framework de UI) |
| Estilos | [Tailwind CSS](https://tailwindcss.com) 4 vía `@tailwindcss/vite` |
| Tipado | TypeScript en `src/data` e `src/i18n` |
| Imágenes | `astro:assets` (`<Image />`, variantes WebP) |
| Tipografía | Montserrat (display), Inter (cuerpo), JetBrains Mono (etiquetas) desde Google Fonts |

No hay React, Vue ni Svelte: los componentes son `.astro` y el JavaScript del cliente se limita al menú móvil, el resaltado del enlace activo y las animaciones de entrada.

## Requisitos

- Node **>= 22.12.0** (`engines` de `package.json`).
- npm.

En Windows con PowerShell, si `npm` está bloqueado por la política de scripts (`npm.ps1`), usa `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` en local |

`astro build` es la única verificación automática del proyecto: **no hay lint, tests, typecheck ni CI**. `astro check` no está instalado.

## Estructura

```text
.
├─ public/
│  ├─ SEBASTIAN_SOLEDAD_CV.pdf   # CV descargable
│  ├─ favicon.svg
│  └─ _redirects                 # fallback de hosting (Netlify)
├─ src/
│  ├─ assets/
│  │  ├─ about/                  # foto de «Sobre mí» (una sola imagen al nivel superior)
│  │  ├─ projects/<slug>/        # capturas de proyectos
│  │  └─ personal/               # portadas de series, escudo y camiseta del Barça
│  ├─ components/
│  │  ├─ Navbar.astro            # navegación + CV + selector de idioma
│  │  ├─ LanguageToggle.astro    # control segmentado deslizante ES / EN
│  │  ├─ Hero.astro
│  │  ├─ About.astro
│  │  ├─ Experience.astro        # trayectoria + certificaciones
│  │  ├─ Skills.astro            # #stack con logos monocromos
│  │  ├─ Projects.astro          # cuadrícula 2×2
│  │  ├─ ProjectCard.astro
│  │  ├─ Personal.astro          # FC Barcelona + series
│  │  ├─ Contact.astro
│  │  └─ Footer.astro
│  ├─ data/
│  │  ├─ projects.ts             # proyectos tipados (textos ES/EN)
│  │  ├─ personal.ts             # equipo favorito y series
│  │  └─ tech-icons.ts           # rutas SVG de los logos del stack
│  ├─ i18n/
│  │  ├─ es.ts                   # textos de `/` (fuente de verdad)
│  │  ├─ en.ts                   # mismas claves en inglés
│  │  └─ index.ts                # Lang, dictionary, getCopy, homePath
│  ├─ layout/
│  │  └─ Layout.astro            # <head>, fuentes, hreflang, fondo y reveal
│  ├─ pages/
│  │  ├─ index.astro             # portada ES
│  │  └─ en/index.astro          # portada EN
│  └─ styles/
│     └─ global.css              # tokens Tailwind v4 + clases base
├─ docs/portafolio-specs.md      # especificación del rediseño v2
├─ AGENTS.md                     # guía de trabajo y estado del repo
└─ astro.config.mjs
```

> `src/layout/` va en **singular** (no `layouts/`). `tailwind.config.mjs` existe pero **no se carga**: los tokens viven en `src/styles/global.css`.

## Secciones del sitio

| Sección | `id` | Componente | Contenido |
|---|---|---|---|
| Portada | `#inicio` | `Hero.astro` | Disponibilidad, título, subtítulo, CTAs y franja «Stack diario» |
| Sobre mí | `#sobre-mi` | `About.astro` | Retrato, presentación y objetivos («Busco») |
| Experiencia | `#experiencia` | `Experience.astro` | Trayectoria, educación y certificaciones |
| Stack | `#stack` | `Skills.astro` | Cinco tarjetas: backend, frontend, datos, DevOps y metodología/IA |
| Proyectos | `#proyectos` | `Projects.astro` + `ProjectCard.astro` | Cuatro tarjetas en 2×2 |
| Personal | `#personal` | `Personal.astro` | FC Barcelona y cuatro series |
| Contacto | `#contacto` | `Contact.astro` | Correo, WhatsApp, LinkedIn y GitHub |
| Pie | — | `Footer.astro` | Enlaces de texto y copyright |

Los `id` de sección se mantienen en español también en la versión inglesa.

## Internacionalización

- Rutas estáticas: `/` (español) y `/en/` (inglés).
- Los textos viven en `src/i18n/es.ts` y `src/i18n/en.ts`; cada componente recibe `lang` y lee su diccionario con `getCopy(lang)`.
- **No hay fallback automático**: si añades una cadena, replica la misma clave en ambos archivos o el hueco queda visible.
- `Layout.astro` declara `<link rel="alternate" hreflang>` para `es`, `en` y `x-default`.
- El selector `LanguageToggle.astro` es un control segmentado: dos enlaces con `hreflang` y `aria-current="page"`, y una pastilla accent que se desplaza por CSS. Va después de `DESCARGAR CV` en escritorio y al final del menú móvil.

## Contenido editable

### Proyectos — `src/data/projects.ts`

Cada proyecto implementa `Project`:

| Campo | Obligatorio | Nota |
|---|---|---|
| `slug` | Sí | Identificador estable |
| `title` | Sí | Nombre del proyecto |
| `category`, `description` | Sí | `Record<Lang, string>` |
| `highlight` | No | Línea «DESTACADO»; si falta, no se renderiza |
| `stack` | Sí | Chips de tecnologías |
| `demoUrl`, `repoUrl` | No | Si faltan, el botón correspondiente no aparece |
| `image`, `imageAlt` | No | Captura importada desde `src/assets` |
| `video`, `videoType`, `poster` | No | Reservado para demos en video |

| Proyecto | Repositorio | Demo | Captura |
|---|---|---|---|
| Papelería POS | `SebasSoledad07/Proyecto-Papeleria` | — | Sí |
| NailTrack Pro | `SebasSoledad07/ReservasBackend` | — | Sí |
| RentFlow Manager | `SebasSoledad07/GestionPropiedades` | — | Pendiente |
| Alinata Bakery | `SebasSoledad07/Alinata-Landing` | [alinatabakery.netlify.app](https://alinatabakery.netlify.app/) | Sí |

### «Fuera del código» — `src/data/personal.ts`

- `favoriteTeam`: FC Barcelona (escudo, camiseta local 26/27 e información del club).
- `series`: El Mentalista, Lucifer, Suits y Breaking Bad, con portada y textos ES/EN.

Las imágenes se importan desde `src/assets/personal/` para que Astro las optimice. El escudo, la camiseta y las portadas son material de terceros (marcas registradas y derechos de sus titulares): úsalos solo como referencia visual.

### Logos del stack — `src/data/tech-icons.ts`

Rutas SVG monocromas (Simple Icons, CC0). Heredan `currentColor` del chip y pasan a accent en hover. Si añades una tecnología al stack, añade también su logo aquí o el chip se mostrará sin ícono.

### CV — `public/SEBASTIAN_SOLEDAD_CV.pdf`

El nombre del archivo está referenciado en `Navbar.astro` y `Hero.astro`. Si cambias el PDF, actualiza todas las referencias a la vez o conserva el nombre actual.

## Diseño y estilos

Los design tokens están dentro de `@theme` en `src/styles/global.css`:

- Colores: `bg`, `surface`, `surface-2`, `preview-bg`, `line`, `line-soft`, `ink`, `ink-body`, `ink-nav`, `ink-meta`, `accent`, `accent-ink`, `success`.
- Fuentes: `--font-display`, `--font-sans`, `--font-mono`.

Reglas que conviene respetar:

- Nombres de token en **kebab-case**: `--color-accent` genera `text-accent`; `--color-cyanElectric` no genera nada.
- Cualquier color o fuente nueva va en `global.css`, no en `tailwind.config.mjs`.
- Clases base reutilizables: `container-page`, `section`, `eyebrow`, `btn`, `btn-primary`, `btn-outline`, `btn-card`, `btn-card-outline`, `chip`, `card`, `card-hover`.
- La navegación de escritorio aparece desde `xl` (1280 px); por debajo se colapsa en el menú móvil.
- La cuadrícula de proyectos es de una columna en móvil y 2×2 desde `md` (768 px).

Accesibilidad: foco visible con `:focus-visible`, botones y enlaces de navegación de 44 px, contraste mínimo 4.5:1 y `prefers-reduced-motion` respetado de forma global.

## Añadir contenido

**Un proyecto nuevo**

1. Copia la captura en `src/assets/projects/<slug>/image.png`.
2. Impórtala y añade la entrada en `src/data/projects.ts` con `category`, `description` e `imageAlt` en ambos idiomas.
3. Rellena `stack`, `repoUrl` y, si existe, `demoUrl`.
4. Ejecuta `npm run build` y revisa la tarjeta en `/` y `/en/`.

**Una serie nueva**

1. Copia la portada en `src/assets/personal/series/`.
2. Añade el objeto a `series` en `src/data/personal.ts` con `genre`, `description` y `posterAlt` en ES/EN.

**Un texto nuevo**

1. Añade la clave en `src/i18n/es.ts`.
2. Replica exactamente la misma clave en `src/i18n/en.ts`.

## Reglas de contenido

- **No inventar** métricas, fechas, clientes ni experiencia. Si un dato no está verificado, se omite o queda pendiente.
- Nada de placeholders `[ASÍ]` ni enlaces `href="#"` antes de publicar.
- Cualquier cifra que se muestre debe salir del CV o de un repositorio real.
- Escudo, camiseta y portadas de series son material de terceros; sustitúyelos si el sitio se monetiza.

## Despliegue

El build genera HTML estático en `dist/`, compatible con Netlify, Vercel, Cloudflare Pages o cualquier hosting estático.

```bash
npm run build
```

`public/_redirects` contiene el fallback `/* /index.html 200` para Netlify. Aún no hay dominio, HTTPS ni configuración de despliegue en el repositorio.

## Pendientes

- Captura de **RentFlow Manager**.
- Demos desplegadas de **Papelería POS**, **NailTrack Pro** y **RentFlow Manager**.
- Métricas medibles y verificables por proyecto.
- Case studies `/proyectos/[slug]` con Problema → Decisión → Resultado → Aprendizajes.
- SEO: `@astrojs/sitemap`, `robots.txt`, JSON-LD `Person` y `og:image` de 1200×630.
- Analítica sin cookies (Plausible/Umami) y dominio con HTTPS.
- Mover los datos de experiencia y stack a `src/data/`.

## Documentación

- [`docs/portafolio-specs.md`](docs/portafolio-specs.md) — especificación del rediseño v2, decisiones de diseño y checklist de aceptación.
- [`AGENTS.md`](AGENTS.md) — guía para trabajar en el repo: mapa real, trampas de Tailwind v4, estado y fases.

## Autor

**Sebastián Soledad** — Ingeniero de Sistemas en formación · FullStack Developer

- GitHub: [@SebasSoledad07](https://github.com/SebasSoledad07)
- LinkedIn: [sebastiansoledad](https://www.linkedin.com/in/sebastiansoledad/)
- Correo: [soledadsebastian07@gmail.com](mailto:soledadsebastian07@gmail.com)
