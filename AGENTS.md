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
src/layout/Layout.astro        # <head>, fuentes, hreflang, fondo global, script .reveal (ojo: singular "layout")
src/pages/index.astro           # portada ES; compone las secciones
src/pages/en/index.astro        # portada EN; mismos componentes con lang="en"
src/components/                 # Navbar, LanguageToggle, Hero, About, Experience, Skills, Projects, ProjectCard, Personal, Contact, Footer
src/i18n/es.ts                  # todos los textos en español (fuente de verdad de `/`)
src/i18n/en.ts                  # mismos claves en inglés (fuente de verdad de `/en/`)
src/i18n/index.ts               # `Lang`, `dictionary`, `getCopy`, `homePath`
src/data/projects.ts            # datos tipados de proyectos; textos como `LocalizedText`
src/data/personal.ts            # equipo favorito y series de `#personal`
src/data/tech-icons.ts          # rutas SVG (Simple Icons) de los logos del stack
src/assets/about/               # foto de Sobre mí (una sola imagen en el nivel superior)
src/assets/projects/            # capturas de proyectos; se importan desde `projects.ts`
src/assets/personal/            # portadas de series y escudo/camiseta del Barça; se importan desde `personal.ts`
src/styles/global.css           # tokens Tailwind v4 + base
public/SEBASTIAN_SOLEDAD_CV.pdf # nombre real del CV
docs/portafolio-specs.md        # especificación v2 (checklist en §11)
```

`src/layout/` es singular; no lo renombres sin motivo (la spec propone
`src/layouts/Base.astro`, pero hoy el archivo real es `Layout.astro`).

### i18n: cómo está montado

- Cada componente acepta `lang?: Lang` (default `"es"`) y lee sus textos con
  `getCopy(lang)`. Las páginas pasan el `lang` explícito a todos los hijos.
- Las rutas son estáticas: `/` (ES) y `/en/` (EN). Los ids de sección siguen en español
  (`#sobre-mi`, `#experiencia`, `#stack`, `#proyectos`, `#personal`, `#contacto`) también en inglés.
- El selector es un control deslizante de dos enlaces `ES` / `EN` con `hreflang` y
  `aria-current="page"` (no `aria-pressed`: es navegación, no un toggle). Va después de
  `DESCARGAR CV` en escritorio y dentro del menú móvil, también después del CV. `Layout.astro`
  declara `<link rel="alternate" hreflang>` es/en/x-default.
- `projects.ts` guarda `category`, `description`, `highlight` e `imageAlt` como
  `Record<Lang, string>`; `personal.ts` hace lo mismo con `genre` y `description`. Si añades un
  proyecto o una serie, rellena ambos idiomas.
- Al añadir cualquier cadena nueva, replica la misma clave en `es.ts` y `en.ts`. No hay
  fallback automático: una clave ausente deja el hueco visible.

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
  `#experiencia`, `#stack`, `#proyectos`, `#personal`, `#contacto`), menú móvil real con
  `aria-expanded` y resaltado por `IntersectionObserver`. El navbar tiene seis enlaces; en
  escritorio se muestran desde `xl` (1280px) porque a 1024px no caben junto al selector de idioma
  y `DESCARGAR CV` (se comprobó desbordamiento de la fila). El selector deslizante va después de
  `DESCARGAR CV` en escritorio y, en móvil, al final del menú desplegable.
- `About.astro` (`#sobre-mi`) existe y está enlazado desde el menú. La foto real es
  `src/assets/about/foto sebas.png` (1536×2730, recortada a 4:5 por `object-cover`); Astro
  genera WebP de 360/480/720. El glob del componente no es recursivo: la variante cuadrada
  descartada (`20250607_180110_872.jpg`, 1920×1920) vive en `src/assets/about/_unused/` y no se
  renderiza. Deja una sola imagen en el nivel superior para evitar ambigüedad.
- El segundo párrafo de About se redactó con datos reales del CV (arquitectura hexagonal, Docker,
  agentes de IA y los tres proyectos). Si el autor quiere contar su motivación personal, debe
  editar ese texto. El hero y Sobre mí usan «Ingeniero de Sistemas en formación» (§0.1).
- Contacto ya vive en `Contact.astro` (`#contacto`) con correo, LinkedIn y GitHub reales; el
  footer quedó separado y solo tiene enlaces de texto. El botón de WhatsApp se renderiza porque
  `whatsappNumber` ya tiene el número real (`+573243106287`); si se vacía, desaparece solo.
- Proyectos: `projects.ts` tiene Papelería POS (#1), NailTrack Pro, RentFlow Manager y Alinata
  Bakery, con repositorios reales (Alinata con demo en Netlify). La línea «DESTACADO» usa el
  campo `highlight`. Papelería POS tiene captura real en
  `src/assets/projects/pos-papeleria/image.png` (1518×702), NailTrack Pro en
  `src/assets/projects/nailtrack/image.png` (1496×688, landing del `ReservasFrontend`) y Alinata
  en `src/assets/projects/alinata-bakery/image.png` (1490×686): Astro las convierte a WebP de
  600/1200 px y las recorta a la franja de la tarjeta con `object-cover`. La cuadrícula es
  `md:grid-cols-2` (2×2) para las cuatro tarjetas. Sigue pendiente la captura de RentFlow Manager,
  las demos desplegadas de Papelería POS, NailTrack Pro y RentFlow Manager, y las métricas
  medibles; no inventarlas. EduCore se quitó porque no está en el CV (§0.1).
- Los chips de `#stack` y de la franja "STACK DIARIO" del Hero muestran logos monocromos de
  `src/data/tech-icons.ts` (Simple Icons, CC0): heredan `currentColor` del chip y pasan a
  `accent` en hover. `REST APIs` usa el ícono de etiqueta genérico; `Arquitectura Limpia`,
  `Agentes de IA`, `Pruebas` y `Depuración` usan íconos conceptuales propios. `Spring Security`,
  `Python`, `Django`, `TypeScript`, `JavaScript`, `HTML5 / CSS3`, `MySQL`, `Render`, `Railway` y
  `GCP` tienen logo de Simple Icons.
- `#stack` tiene cinco tarjetas: las cuatro primeras en 2×2 y `Metodología & IA` a ancho completo
  con ícono de terminal. La caja del ícono mide 48px (32px + `p-2`) y los chips 13px con padding
  7px/12px.
- `#experiencia` incluye el hito de educación con la pill `2021 — 2027 (EST.)` y el texto
  «Cursando», además del bloque `// CERTIFICACIONES` con cuatro tarjetas (AWS, CISCO, LACNIC,
  BIG SCHOOL).
- `#personal` va después de Proyectos y antes de Contacto: tarjeta de FC Barcelona con escudo,
  camiseta local 26/27 y una línea de información, más cuatro series desde `src/data/personal.ts`
  con su portada (las franjas azul/granate siguen siendo decoración). Las imágenes viven en
  `src/assets/personal/` (`series/*.jpg`, `fcb/crest.png`, `fcb/kit-2627.jpg`). Se omiten a
  propósito el párrafo introductorio, la nota «desde cuándo…» y la franja `AHORA_MISMO` porque el
  autor aún no dio ese contenido; no inventarlo. Escudo y camiseta son marcas registradas y las
  portadas tienen derechos de sus titulares: úsalos solo como referencia visual.
- Experiencia y stack siguen inline en sus componentes; proyectos y personal ya están en
  `src/data/`. La v2 pide mover también esos datos a `src/data/*` (§10).
- i18n ya funciona (`/` y `/en/`). Faltan sitemap, JSON-LD, OG image y analítica.

## Guía por fases

Orden por dependencias. Las fases 2 y 3 son las de prioridad 🔴 en la spec y pueden adelantarse
tras la fase 1.

> Estado: **Fases 1–6 implementadas + i18n (parte de la fase 8) + §0.1/§10.1**. Fase 1: tokens,
> tipografía, contraste, foco, reduced motion y clases base. Fase 2: tarjeta de proyecto
> data-driven, enlaces reales y capturas de Papelería POS, NailTrack Pro y Alinata Bakery; falta
> la captura de RentFlow Manager, las demos de Papelería POS y NailTrack Pro y las métricas reales.
> Fase 3: sección `#contacto` y footer separado, con WhatsApp real. Fase 4: navegación con ids reales,
> menú móvil y Hero rediseñado. Fase 5: `About.astro` y línea de tiempo de experiencia, con foto
> real. Fase 6: cinco tarjetas de stack con íconos propios. i18n ES/EN completo con selector en el
> navbar. §0.1: proyectos del CV, stack y certificaciones alineados; Alinata Bakery se añadió
> aparte. §10.1: sección `#personal` con escudo, camiseta y portadas. Lighthouse local:
> Accessibility 100, Best Practices 100, SEO 100. Siguiente: fase 7 (SEO/rendimiento/a11y) y lo
> que falte de la fase 8.

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
  categoría, título, descripción, "DESTACADO" con dato real del CV, chips y botones
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
> `#proyectos`, `#personal` y `#contacto`; el Hero es `#inicio`. Los eyebrows de las secciones
> coinciden con el menú. El navbar vuelve al layout original: logo `Soledad.dev` a la izquierda y,
> a la derecha, los seis enlaces + `DESCARGAR CV` en una sola fila (`justify-between`); por debajo
> de `xl` (1280px) se colapsa en el menú móvil. El `h1` del Hero va sin `max-w` y con
> `clamp(2.25rem, 10.5vw, 9rem)` + `whitespace-nowrap` (285px de texto frente a 312px disponibles
> a 360px), así que no desborda ni se descentra.

### Fase 5 — Sobre mí y Experiencia (§3–4)

- `About.astro` con foto real 4:5, marco accent y chips "BUSCO"; reemplazar `[TU FOTO]` y
  `[TU HISTORIA]` con contenido real.
- Experiencia: eyebrow `// EXPERIENCIA`, título `TRAYECTORIA PROFESIONAL`, hito "Ingeniería de
  Sistemas", chips y pills de fecha legibles; línea de tiempo sin scroll horizontal en móvil.
- Aceptación: sin placeholders y sin texto <12px ni <4.5:1.

> Implementada en `About.astro` + `Experience.astro`. Contraste verificado: chips 9.97:1, pills de
> fecha 11.56:1. La foto ya se renderiza; ver la nota de las dos candidatas en «Estado actual».

### Fase 6 — Stack (§5)

- Reemplazar el ícono de backend (hoy es una flecha de descarga) por servidor, navegador, base
  de datos y nube; SVG inline 24×24, `stroke="currentColor"`, `aria-hidden="true"`.
- Tarjetas 2×2 con número `01–04`, descripción sin cursiva y chips 13px.
- Aceptación: cada tarjeta se distingue por su ícono.

> Implementada. `Skills.astro` define `categoryIcons` como lista de trazos por tarjeta:
> servidor (Core Backend), navegador (Frontend & UI), cilindro (Data Strategy), nube
> (DevOps & Cloud) y terminal (Metodología & IA, a ancho completo). Los chips de `#stack` llevan
> `text-[13px]` y padding 7px/12px.

### Fase 7 — Transversal: rendimiento, SEO y a11y (§9)

- Lighthouse ≥95 en Performance, Accessibility, Best Practices y SEO.
- Meta description/OG/Twitter (1200×630), JSON-LD `Person`, `@astrojs/sitemap`, `robots.txt`,
  `lang="es"`, un solo `<h1>`, landmarks y "Saltar al contenido".
- Imágenes WebP/AVIF con dimensiones explícitas y `loading="lazy"` bajo el pliegue.
- Probar 360, 390, 768, 1024 y 1440 px.
- Aceptación: el checklist §11 completo.

### Fase 8 — Fase 2 del producto (§6.6, §9.5, §9.6)

- Case studies `/proyectos/[slug]` con Problema → Decisión → Resultado → Aprendizajes.
- i18n `/` + `/en/` con textos en `src/i18n/{es,en}.json` y selector deslizante `ES` / `EN`.
- Analítica sin cookies (Plausible/Umami) y dominio con HTTPS.

> i18n ya está hecho, con dos diferencias deliberadas frente a la spec: los diccionarios son
> `src/i18n/{es,en}.ts` (tipados, no JSON) y el selector usa `aria-current="page"` porque son
> enlaces de navegación estática, no un toggle. El indicador se desliza por CSS según el idioma
> activo. Faltan los case studies y la analítica.

### Fase 9 — Alineación con el CV y «Fuera del código» (§0.1, §10.1)

- Reemplazar el contenido por el del CV: «Ingeniero de Sistemas en formación», graduación
  `2021 — 2027 (EST.)`, cuatro proyectos (Papelería POS, NailTrack Pro, RentFlow Manager y
  Alinata Bakery), cinco categorías de stack y cuatro certificaciones.
- Añadir `#personal` después de Proyectos: FC Barcelona (escudo, camiseta 26/27 e info) + cuatro
  series con portada desde `src/data/personal.ts`, sin contenido inventado.

> Implementada. Quedan vacíos deliberados hasta que el autor los complete: frase introductoria de
> `#personal`, «desde cuándo sigo al Barça / jugador o partido favorito» y los valores de
> `VIENDO / LEYENDO / APRENDIENDO` (franja `AHORA_MISMO` omitida). De los proyectos, Papelería POS,
> NailTrack Pro y Alinata ya tienen captura; falta la de RentFlow Manager, las demos de Papelería
> POS y NailTrack Pro y las métricas.

## Reglas de contenido

- No inventar métricas, fechas, clientes ni experiencia. Los `[CORCHETES]` de la spec son
  pendientes del autor.
- Mantener el CV en `public/SEBASTIAN_SOLEDAD_CV.pdf` o actualizar todas las referencias a la vez.
- Escudo y camiseta del Barça y portadas de series son material de terceros (marcas registradas y
  derechos de sus titulares). Se usan como referencia visual por petición del autor; si el sitio
  se monetiza, sustitúyelos por material propio o elimínalos.
- Antes de publicar: cero `[...]`, cero enlaces `#`, demos y perfiles reales.
