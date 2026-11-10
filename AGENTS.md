# AGENTS.md

Portafolio personal de Sebastián Soledad. Sitio estático Astro + Tailwind CSS v4.
La fuente de verdad del rediseño v2 es `docs/portafolio-specs.md`; este archivo resume cómo
trabajar en el repo y en qué orden aplicar esa especificación.

## Comandos

Node `>=22.12.0` (`package.json` `engines`). En PowerShell de este equipo `npm.ps1` está
bloqueado: usa **`npm.cmd`**, no `npm`.

```bash
npm.cmd install
npm.cmd run dev        # http://localhost:4321
npm.cmd run build      # única verificación automática disponible
npm.cmd run preview
```

- No hay lint, test, typecheck ni CI configurados. No inventes scripts: `astro build` es la
  verificación real. `astro check` no está instalado (requiere `@astrojs/check` + `typescript`).
- Salida estática en `dist/`. `public/_redirects` es el fallback estilo Netlify; no borrarlo.

## Mapa real del repo

```
src/layout/Layout.astro        # <head>, fuentes, fondo global, script .reveal (ojo: singular "layout")
src/pages/index.astro           # única página; compone las secciones
src/components/                 # Navbar, Hero, About, Experience, Skills, Projects, ProjectCard, Contact, Footer
src/data/projects.ts            # datos tipados de proyectos (demo/repo/imagen opcionales)
src/data/tech-icons.ts          # rutas SVG (Simple Icons) de los logos del stack
src/styles/global.css           # tokens Tailwind v4 + base
public/SEBASTIAN_SOLEDAD_CV.pdf # nombre real del CV
docs/portafolio-specs.md        # especificación v2 (checklist en §11)
```

La estructura propuesta en `docs` (§10) todavía no está completa: falta `src/i18n/`.
`src/layout/` es singular; no lo renombres sin motivo (la spec propone
`src/layouts/Base.astro`, pero hoy el archivo real es `Layout.astro`).

## Tailwind v4: trampas que rompen el diseño en silencio

- Los tokens viven en `src/styles/global.css` dentro de `@theme`. **`tailwind.config.mjs` NO se
  carga** (es resto de v3). Cualquier color/fuente nueva va en `global.css`; si algún día se
  necesita el JS config, hay que añadir `@config "../tailwind.config.mjs"`.
- El snippet de `docs/portafolio-specs.md` §1.1 está en formato v3: tradúcelo a variables
  `--color-*` / `--font-*` dentro de `@theme`, no lo pegues tal cual.
- Los nombres deben ser **kebab-case**: `--color-accent` genera `text-accent`. En la v1 había
  clases camelCase (`text-cyanElectric`, `bg-cyanElectric/5`) que generaban **0 reglas CSS**;
  ya se corrigieron, pero no reintroduzcas esa forma.
- Tokens v2 ya aplicados en `global.css`: `bg`, `surface`, `surface-2`, `preview-bg`, `line`,
  `line-soft`, `ink`, `ink-body`, `ink-nav`, `ink-meta`, `accent`, `accent-ink`, `success`.
  Fuentes: Montserrat (display), Inter (cuerpo) y JetBrains Mono (etiquetas), cargadas desde
  Google Fonts en `Layout.astro`.
- Clases base reutilizables en `global.css`: `container-page`, `section`, `eyebrow`, `btn`,
  `btn-primary`, `btn-outline`, `btn-card`, `btn-card-outline`, `chip`, `card`, `card-hover`.

## Estado actual y bugs conocidos

- **Navegación y Hero resueltos en la Fase 4**: ids españoles (`#inicio`, `#sobre-mi`,
  `#experiencia`, `#stack`, `#proyectos`, `#contacto`), menú móvil real con `aria-expanded` y
  resaltado por `IntersectionObserver`.
- `About.astro` (`#sobre-mi`) existe y está enlazado desde el menú. La foto real de `[TU FOTO]`
  aún no está: `About.astro` detecta automáticamente cualquier imagen en `src/assets/about/`
  (4:5, WebP/AVIF) y, mientras no exista, muestra un monograma neutro `SS`.
- El segundo párrafo de About se redactó con datos reales del CV (arquitectura hexagonal, Docker,
  los tres proyectos). Si el autor quiere contar su motivación personal, debe editar ese texto.
- Contacto ya vive en `Contact.astro` (`#contacto`) con correo, LinkedIn y GitHub reales; el
  footer quedó separado y solo tiene enlaces de texto. Falta el número de WhatsApp: la constante
  `whatsappNumber` de `Contact.astro` está vacía y el botón no se renderiza hasta rellenarla.
- Proyectos ya se renderizan desde `src/data/projects.ts` con `ProjectCard.astro` y enlaces
  reales (sin `#`). Faltan capturas/video reales, demos desplegadas, métricas de resultado y un
  repositorio público para EduCore; no inventar ninguno de esos datos.
- Los chips de `#stack` y de la franja "STACK DIARIO" del Hero muestran logos monocromos de
  `src/data/tech-icons.ts` (Simple Icons, CC0): heredan `currentColor` del chip y pasan a
  `accent` en hover. `Microservicios`, `REST APIs` y `CI/CD` usan un ícono de etiqueta genérico
  porque no son tecnologías con logo; `SQL Server` usa un cilindro de base de datos.
- Experiencia y stack siguen inline en sus componentes; proyectos ya está en `src/data/`. La v2
  pide mover también esos datos a `src/data/*` (§10).
- No hay sitemap, i18n, JSON-LD, OG image ni analítica.

## Guía por fases

Orden por dependencias. Las fases 2 y 3 son las de prioridad 🔴 en la spec y pueden adelantarse
tras la fase 1.

> Estado: **Fases 1, 2, 3, 4 y 5 implementadas**. Fase 1: tokens, tipografía, contraste, foco,
> reduced motion y clases base. Fase 2: tarjeta de proyecto data-driven y enlaces reales; quedan
> bloqueados capturas, demos y métricas reales. Fase 3: sección `#contacto` y footer separado;
> queda pendiente el número real de WhatsApp. Fase 4: navegación con ids reales, menú móvil y
> Hero rediseñado. Fase 5: `About.astro` y línea de tiempo de experiencia; queda pendiente la
> foto real. Lighthouse local: Accessibility 100, Best Practices 100, SEO 100. Siguiente: fase 6.

### Fase 1 — Base visual y accesibilidad (§1)

- Migrar tokens de `global.css` a la paleta de la §1.1 (`bg`, `surface`, `line`, `ink`, `accent`,
  `success`) y tipografía §1.2. Contraste mínimo 4.5:1; prohibido texto más oscuro que `#8A8A95`.
- Etiquetas/nav/chips en mono **≥12px**; cuerpo en Inter regular, no Montserrat itálica.
- Definir botones, chip y tarjeta como clases/patrones reutilizables; foco visible
  `:focus-visible` y áreas táctiles de 44px.
- Contenedor `max-width:1200px`, secciones con `padding-block:88px`, separadores `line-soft`.
- Aceptación: axe sin errores de contraste y textos pequeños legibles.

### Fase 2 — Proyectos (§6, máxima prioridad)

- Crear `src/data/projects.ts` y `ProjectCard.astro`; la tarjeta debe incluir captura/video,
  categoría, título, descripción, "RESULTADO" con métrica real, chips y botones
  `DEMO EN VIVO ↗` + `CÓDIGO`.
- Sustituir `[CAPTURA]`/`[MÉTRICA]` por material real; nunca inventar cifras. Imágenes
  1200×750 WebP <150 KB; video MP4/WebM 5–10 s con póster si `prefers-reduced-motion`.
- Usar `<Image />` de `astro:assets`; enlaces externos con `target="_blank" rel="noopener noreferrer"`.
- Aceptación: cero `#`, cero placeholders y demo funcional por proyecto.

### Fase 3 — Contacto y footer (§7–8)

- Nueva sección `#contacto` centrada, con correo visible en `mailto:`, WhatsApp (`wa.me` con
  mensaje), LinkedIn y GitHub; botones que abran la acción correcta.
- Footer separado con enlaces **con texto** (no solo íconos), copyright y "Hecho con Astro + Tailwind".
- Aceptación: correo copiable a simple vista y cada botón funciona.

> Implementada en `Contact.astro` + `Footer.astro`. Correo, LinkedIn, GitHub e Instagram usan
> URLs reales. El botón de WhatsApp está condicionado a `whatsappNumber`; falta el número real.

### Fase 4 — Navegación y Hero (§2)

- Unificar etiquetas del menú con los eyebrows de sección: `SOBRE MÍ`, `EXPERIENCIA`, `STACK`,
  `PROYECTOS`, `CONTACTO`; `DESCARGAR CV` como nombre único del botón.
- Arreglar anchors e implementar menú móvil real y resaltado por `IntersectionObserver`
  (o eliminar el script muerto).
- Hero: pill de disponibilidad, subtítulo específico, `VER PROYECTOS` primario + `DESCARGAR CV`
  outline, franja "STACK DIARIO" con 6 chips. Usar `clamp()` y `overflow-wrap`.
- Aceptación: a 1440×900 título, subtítulo y ambos botones visibles sin scroll; a 360px sin desborde.

> Implementada. `Navbar.astro` usa `navItems` con `#sobre-mi`, `#experiencia`, `#stack`,
> `#proyectos` y `#contacto`; el Hero es `#inicio`. Los eyebrows de las secciones coinciden con
> el menú. El navbar vuelve al layout original: logo `Soledad.dev` a la izquierda y, a la derecha,
> los cinco enlaces + `DESCARGAR CV` en una sola fila (`justify-between`); por debajo de `lg` se
> colapsa en el menú móvil. El `h1` del Hero va sin `max-w` y con
> `clamp(2.25rem, 10.5vw, 9rem)` + `whitespace-nowrap` (285px de texto frente a 312px disponibles
> a 360px), así que no desborda ni se descentra.

### Fase 5 — Sobre mí y Experiencia (§3–4)

- `About.astro` con foto real 4:5, marco accent y chips "BUSCO"; reemplazar `[TU FOTO]` y
  `[TU HISTORIA]` con contenido real.
- Experiencia: eyebrow `// EXPERIENCIA`, título `TRAYECTORIA PROFESIONAL`, hito "Ingeniería de
  Sistemas", chips y pills de fecha legibles; línea de tiempo sin scroll horizontal en móvil.
- Aceptación: sin placeholders y sin texto <12px ni <4.5:1.

> Implementada en `About.astro` + `Experience.astro`. Contraste verificado: chips 9.97:1, pills de
> fecha 11.56:1. Queda pendiente únicamente la **foto real**: basta con dejar el archivo 4:5 en
> `src/assets/about/` y se renderiza sola.

### Fase 6 — Stack (§5)

- Reemplazar el ícono de backend (hoy es una flecha de descarga) por servidor, navegador, base
  de datos y nube; SVG inline 24×24, `stroke="currentColor"`, `aria-hidden="true"`.
- Tarjetas 2×2 con número `01–04`, descripción sin cursiva y chips 13px.
- Aceptación: cada tarjeta se distingue por su ícono.

### Fase 7 — Transversal: rendimiento, SEO y a11y (§9)

- Lighthouse ≥95 en Performance, Accessibility, Best Practices y SEO.
- Meta description/OG/Twitter (1200×630), JSON-LD `Person`, `@astrojs/sitemap`, `robots.txt`,
  `lang="es"`, un solo `<h1>`, landmarks y "Saltar al contenido".
- Imágenes WebP/AVIF con dimensiones explícitas y `loading="lazy"` bajo el pliegue.
- Probar 360, 390, 768, 1024 y 1440 px.
- Aceptación: el checklist §11 completo.

### Fase 8 — Fase 2 del producto (§6.6, §9.5, §9.6)

- Case studies `/proyectos/[slug]` con Problema → Decisión → Resultado → Aprendizajes.
- i18n `/` + `/en/` con textos en `src/i18n/{es,en}.json` y selector `ES | EN` con `aria-pressed`.
- Analítica sin cookies (Plausible/Umami) y dominio con HTTPS.

## Reglas de contenido

- No inventar métricas, fechas, clientes ni experiencia. Los `[CORCHETES]` de la spec son
  pendientes del autor.
- Mantener el CV en `public/SEBASTIAN_SOLEDAD_CV.pdf` o actualizar todas las referencias a la vez.
- Antes de publicar: cero `[...]`, cero enlaces `#`, demos y perfiles reales.
