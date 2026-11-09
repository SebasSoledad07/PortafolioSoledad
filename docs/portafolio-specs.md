# Soledad.dev — Especificaciones de rediseño (v2)

Documento de cambios para pasar del portafolio actual a la v2. Stack: **Astro + Tailwind CSS**.
Cada cambio indica **qué**, **por qué**, **cómo** y **criterio de aceptación**.

> Los textos entre `[CORCHETES]` en el diseño son placeholders: hay que reemplazarlos por contenido real (foto, métricas, correo, enlaces). No inventes cifras.

---

## 0. Resumen de prioridades

| Prioridad | Cambio | Sección |
|---|---|---|
| 🔴 Alta | Capturas/GIF + "Demo en vivo" + "Resultado" en cada proyecto | §6 |
| 🔴 Alta | Sección de contacto con CTA claro | §7 |
| 🔴 Alta | Contraste y legibilidad del texto pequeño | §1 |
| 🟡 Media | Sección "Sobre mí" con foto | §3 |
| 🟡 Media | Hero: subtítulo específico, disponibilidad, botones coherentes | §2 |
| 🟡 Media | Íconos semánticos, hovers, nomenclatura unificada | §5, §8 |
| 🟢 Baja | Versión EN, case studies, analítica | §9 |

---

## 1. Design tokens

### 1.1 Colores

| Token | Valor | Uso |
|---|---|---|
| `bg` | `#0E0E10` | Fondo de página |
| `surface` | `#17171A` | Tarjetas |
| `surface-2` | `#1F1F24` | Chips, pills, íconos |
| `preview-bg` | `#121214` | Área de captura en proyectos |
| `border` | `#2E2E35` | Bordes de tarjetas y chips |
| `border-soft` | `#26262B` | Separadores de sección |
| `text` | `#F4F4F5` | Títulos y texto principal |
| `text-body` | `#C4C4CC` | Párrafos |
| `text-nav` | `#B4B4BE` | Enlaces de navegación |
| `text-meta` | `#9A9AA6` | Etiquetas auxiliares |
| `accent` | `#00E5FF` | Acento (botones, etiquetas, títulos) |
| `on-accent` | `#04141A` | Texto sobre botones cian |
| `success` | `#3DDC84` | Punto de disponibilidad |

Contrastes calculados (WCAG, mínimo 4.5:1 para texto normal):

| Texto / fondo | Ratio |
|---|---|
| `text` / `bg` | 17.5:1 |
| `text-body` / `bg` | 11.1:1 |
| `text-body` / `surface` | 10.3:1 |
| `text-nav` / `bg` | 9.4:1 |
| `text-meta` / `bg` | 6.9:1 |
| `#8A8A95` / `preview-bg` (etiquetas de captura) | 5.5:1 |
| `accent` / `bg` | 12.5:1 |
| `on-accent` / `accent` | 12.2:1 |
| `#C9C9D1` / `surface-2` (chips) | 10.0:1 |

**Prohibido** usar grises más oscuros que `#8A8A95` para texto (por ejemplo `#6B6B73` da 3.65:1 y falla).

**Por qué:** en la v1 los chips de la trayectoria y las etiquetas mono son casi ilegibles.
**Aceptación:** Lighthouse Accessibility ≥ 95 y cero errores de contraste en axe DevTools.

Config Tailwind sugerida:

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        bg: '#0E0E10',
        surface: { DEFAULT: '#17171A', 2: '#1F1F24' },
        line: { DEFAULT: '#2E2E35', soft: '#26262B' },
        ink: { DEFAULT: '#F4F4F5', body: '#C4C4CC', nav: '#B4B4BE', meta: '#9A9AA6' },
        accent: { DEFAULT: '#00E5FF', ink: '#04141A' },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
};
```

### 1.2 Tipografía

| Rol | Fuente | Peso | Tamaño | Notas |
|---|---|---|---|---|
| Título hero | Montserrat | 900 | `clamp(44px, 10vw, 140px)` | `letter-spacing: -0.05em`, `line-height: 0.95` |
| Título de sección (h2) | Montserrat | 800 | `clamp(30px, 4.4vw, 52px)` | MAYÚSCULAS, `letter-spacing: -0.03em` |
| Título de tarjeta (h3) | Montserrat | 700 | 22–24px | MAYÚSCULAS |
| Cuerpo | Inter | 400/500 | 16–20px | `line-height: 1.6–1.7` |
| Etiquetas / chips / nav | JetBrains Mono | 400/700 | **12–14px (nunca menos de 12)** | Antes llegaban a ~10px |

**Cambio clave:** el cuerpo pasa de Montserrat en negrita-cursiva (gris) a **Inter regular**, que es mucho más legible en párrafos. Montserrat queda solo para títulos.
**Cómo:** `<link>` de Google Fonts con `display=swap`, o mejor, autoalojar con `@fontsource` y precargar el peso 900 del hero.

### 1.3 Espaciado y layout

- Contenedor: `max-width: 1200px; margin: 0 auto; padding: 0 24px`.
- Secciones: `padding-block: 88px` (hero 112px arriba / 88px abajo; contacto 112px).
- Separador entre secciones: `border-top: 1px solid line-soft`.
- Gap de tarjetas: 24px. Radio de tarjetas: 8px. Radio de chips y botones: 4px.
- Layout con `flex-wrap` (cada tarjeta `flex: 1 1 340–460px`) para que apile solo en móvil, sin media queries extra.

### 1.4 Componentes base

**Botón primario**
`min-height: 52px` (44px en tarjetas), fondo `accent`, texto `accent-ink`, mono 700, 12–13px, `letter-spacing: 0.1em`.

**Botón secundario (outline)**
Mismo tamaño, `border: 1px solid accent`, texto `accent`. En tarjetas: borde `#3A3A42` y texto `ink`.

**Chip**
Mono 12–13px, fondo `surface-2`, borde `line`, texto `#C9C9D1`, `padding: 6px 10px`, radio 4px.

**Tarjeta con elevación**
Fondo `surface`, borde `line`, radio 8px. Hover: `translateY(-4px)` y sombra `0 12px 32px rgba(0,0,0,.45)`, transición 200ms. Desactivar con `prefers-reduced-motion`.

**Foco visible (obligatorio)**
`:focus-visible { outline: 2px solid #00E5FF; outline-offset: 3px }`.

**Áreas táctiles**
Todo enlace y botón con `min-height: 44px`.

---

## 2. Navegación y Hero

### 2.1 Navegación

| Antes | Ahora |
|---|---|
| `// INICIO · // EXPERIENCIA · // HABILIDADES · // PROYECTOS` | `// SOBRE MÍ · // EXPERIENCIA · // STACK · // PROYECTOS · // CONTACTO` |
| Botón `GET_CV` | Botón `DESCARGAR CV` |
| — | Selector `ES | EN` (botones con `aria-pressed`) |

**Por qué:** los nombres del menú no coincidían con los títulos de sección ("Habilidades" vs "Technical Stack") y el CV tenía dos nombres distintos.
**Cómo:** cada enlace apunta al `id` de su sección; `nav` con `aria-label="Principal"`; resaltar el enlace de la sección visible con `IntersectionObserver` (clase `text-accent`).
**Aceptación:** la etiqueta del menú es idéntica al eyebrow de su sección.

### 2.2 Hero

1. **Pill de disponibilidad** sobre el título: punto `success` + `DISPONIBLE PARA PROYECTOS · CÚCUTA, COL`. Mantenerla actualizada; si no estás disponible, quitarla.
2. **Título** `SOLEDAD.DEV` (".DEV" en `accent`), igual que la v1 pero con `clamp()` para que no se rompa en móvil.
3. **Subtítulo específico** (reemplaza el genérico):
   > Ingeniero de sistemas que construye aplicaciones **fullstack con Java, Spring Boot y React**: reservas, alquileres y gestión académica, de la base de datos a la interfaz.
4. **Botones:** primario `VER PROYECTOS` (ancla a `#proyectos`) y secundario outline `DESCARGAR CV`. Antes "PROYECTOS" parecía texto suelto.
5. **Franja "STACK DIARIO"** con 6 chips (Java, Spring Boot, React, Angular, PostgreSQL, Docker) bajo una línea divisoria. Llena el vacío que había en la v1 y comunica el perfil en 2 segundos.

**Aceptación:** al cargar a 1440×900, el título, el subtítulo y ambos botones se ven sin hacer scroll.

---

## 3. Nueva sección: Sobre mí (`#sobre-mi`)

**Por qué:** la v1 no tiene rostro ni historia; las personas contratan personas.

**Estructura:** dos columnas (`flex-wrap`).
- **Izquierda (≈360px):** foto con marco `border: 1px solid accent; padding: 12px; radius 8px`. Proporción 4:5, `object-fit: cover`. Reemplazar `[TU FOTO · 4:5]`.
- **Derecha:** eyebrow `// SOBRE_MÍ`, h2 `DE LA BASE DE DATOS A LA INTERFAZ`, dos párrafos y chips "BUSCO".

**Contenido:**
- Párrafo 1 (ya redactado): quién eres, dónde estudias, qué te gusta construir.
- Párrafo 2: **[TU HISTORIA]**: qué te motivó a programar y qué problemas quieres resolver (1–2 líneas, en primera persona).
- Chips "BUSCO": `Freelance`, `Posición junior`, `Remoto` (ajusta a lo que de verdad buscas).

**Imagen:** exportar a WebP/AVIF, `width`/`height` explícitos, `alt="Retrato de Sebastián Soledad"`, `loading="eager"` si queda sobre el pliegue en escritorio.
**Aceptación:** foto real cargada, ningún placeholder visible.

---

## 4. Experiencia (`#experiencia`)

Estructura igual a la v1 (línea de tiempo vertical) con estos ajustes:

- Eyebrow `// EXPERIENCIA` (antes `// MILESTONES`). Título `TRAYECTORIA PROFESIONAL`.
- Título del segundo hito: **"Ingeniería de Sistemas"** (antes "Ingeniero de sistemas en formación", que repetía el cargo).
- **Chips legibles:** 12px, texto `#C9C9D1` sobre `surface-2` (antes gris sobre negro casi invisible).
- **Pill de fecha** (`2026`, `2021 — 2026`): 13px, `#D8D8DE` sobre `surface-2`.
- Nodo de la línea de tiempo: el hito actual con relleno `accent` y halo; los pasados, solo contorno.
- La línea de tiempo se apila en móvil: fecha debajo del contenido (`flex-wrap`).

**Para mejorarla con contenido (pendiente tuyo):** si tienes pasantías, monitorías, clientes reales o certificaciones, añade un hito por cada una. Cada hito debe responder "¿qué logré?", no solo "¿qué tecnologías usé?".

**Aceptación:** ningún texto de la sección baja de 4.5:1 de contraste ni de 12px.

---

## 5. Stack (`#stack`)

- Eyebrow `// STACK`; h2 `INFRAESTRUCTURA & TECNOLOGÍAS` ("TECNOLOGÍAS" en `accent`).
- 4 tarjetas en 2×2 (apilan en móvil), con número `01–04` arriba a la derecha (color `#8A8A95`, 12px).
- **Íconos semánticos** (antes el de Backend era una flecha de descarga):

| Tarjeta | Ícono |
|---|---|
| Core Backend | Servidor (dos racks) |
| Frontend & UI | Ventana de navegador |
| Data Strategy | Cilindro de base de datos |
| DevOps & Cloud | Nube |

  Inline SVG, `stroke="currentColor"`, trazo 1.75, 24×24, dentro de un cuadro de 48px con fondo `surface-2` y borde `line`. `aria-hidden="true"`.
- Descripción en `text-body`, **sin cursiva** (antes cursiva gris de bajo contraste).
- Chips de 13px con más padding (`7px 12px`).

**Mejora opcional:** sustituir los chips de texto por logos reales con [Simple Icons](https://simpleicons.org/) o [devicon](https://devicon.dev/), con el nombre visible junto al logo.

**Aceptación:** cada tarjeta se distingue de un vistazo por su ícono.

---

## 6. Proyectos (`#proyectos`) — el cambio más importante

Eyebrow `// PORTAFOLIO`; h2 `PROYECTOS DESTACADOS`.

### 6.1 Anatomía de la tarjeta

De arriba a abajo:

1. **Área de captura (210px de alto)** sobre `preview-bg`: barra con 3 puntos y la etiqueta `[CAPTURA / GIF DEL DEMO]`. Reemplazar por la captura real o un video corto.
2. **Etiqueta de categoría** (mono, `accent`, 12px).
3. **Título** (h3, MAYÚSCULAS).
4. **Descripción** en 2–3 líneas: *qué es y qué problema resuelve*. Sin cursiva.
5. **Línea "RESULTADO"** con borde punteado: `[AÑADE UNA MÉTRICA REAL]`. Ejemplos del tipo de dato que sirve (úsalos solo si son ciertos): tiempo ahorrado, número de usuarios reales, citas gestionadas, latencia de la API.
6. **Chips de tecnologías.**
7. **Dos botones:** `DEMO EN VIVO ↗` (primario) y `CÓDIGO` (outline). Antes solo había "VIEW CODE".

### 6.2 Contenido propuesto

| Proyecto | Categoría | Descripción |
|---|---|---|
| NailTrack Pro | FULLSTACK · RESERVAS | Sistema de reservas y gestión para manicuristas. Arquitectura desacoplada: API en Spring Boot, interfaz en Angular y agenda de citas en tiempo real. |
| RentFlow Manager | GESTIÓN DE PROPIEDADES | Plataforma para administrar propiedades en alquiler: control de contratos de arrendamiento y flujos de pago en un solo lugar. |
| EduCore System | GESTIÓN ACADÉMICA | Sistema de gestión académica centrado en la experiencia del estudiante, con backend serverless sobre Supabase. |

### 6.3 Requisitos de las capturas

- 1200×750 px (16:10), WebP, < 150 KB cada una. Para GIF, preferir `<video autoplay muted loop playsinline>` en MP4/WebM de 5–10 s.
- `alt` descriptivo (qué se ve, no "captura").
- Con `prefers-reduced-motion`, mostrar un póster estático en vez del video.
- Usar `<Image />` de Astro (`astro:assets`) para optimizar y generar `srcset`.

### 6.4 Demo y repositorio

- Cada proyecto debe tener **demo desplegada** (Cloud Run, Vercel, Netlify…) con datos de ejemplo y, si hay login, credenciales de prueba visibles en el README.
- Enlaces con `target="_blank" rel="noopener noreferrer"`.

### 6.5 README de cada repositorio (obligatorio)

Los reclutadores hacen clic en "Código": ahí deben encontrar
1. Una captura o GIF arriba.
2. Descripción en 2–3 líneas.
3. Stack y diagrama simple de arquitectura.
4. Instrucciones para correrlo localmente (máx. 5 comandos).
5. Decisiones técnicas ("por qué Supabase", "por qué desacoplado").

Fija estos 3 repos en tu perfil de GitHub.

### 6.6 Case study (fase 2)

Página `/proyectos/[slug]` por proyecto: **Problema → Decisión técnica → Resultado → Aprendizajes**. Enlazar desde la tarjeta con "VER CASO →".

**Aceptación:** ningún proyecto con `[CAPTURA]`, `[MÉTRICA]` ni enlaces `#` al publicar.

---

## 7. Nueva sección: Contacto (`#contacto`)

**Por qué:** en la v1 contactarte requería adivinar qué ícono pulsar.

- Eyebrow `// CONTACTO`; h2 `¿TIENES UN PROYECTO? HABLEMOS.` ("HABLEMOS." en `accent`), `clamp(34px, 6vw, 72px)`.
- Párrafo: "Cuéntame qué necesitas y te respondo en menos de 24 horas. Estoy abierto a proyectos freelance y a oportunidades de trabajo." (Solo promete 24 h si vas a cumplirlo.)
- Botones: **correo** (primario, con la dirección visible), `WHATSAPP`, `LINKEDIN`, `GITHUB`.
  - Correo: `mailto:` con la dirección real.
  - WhatsApp: `https://wa.me/57XXXXXXXXXX?text=Hola%20Sebasti%C3%A1n...` con mensaje precargado.
- Sección centrada, `padding-block: 112px`.

**Aceptación:** correo copiable a simple vista y cada botón abre la acción correcta.

---

## 8. Footer

- Logo `SOLEDAD.DEV`, estado `OPERATIONAL // CÚCUTA, COL`, enlaces **con texto** (LINKEDIN, GITHUB, INSTAGRAM) en vez de íconos sueltos sin etiqueta, copyright y "Hecho con Astro + Tailwind CSS".
- Texto mono a 12px con contraste ≥ 6.9:1.
- Si los íconos se prefieren, añadir `aria-label` en cada enlace.

---

## 9. Requisitos técnicos transversales

### 9.1 Rendimiento
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO.
- Imágenes en WebP/AVIF con dimensiones explícitas; `loading="lazy"` bajo el pliegue.
- Fuentes: `font-display: swap`, solo los pesos usados (Montserrat 700/800/900, Inter 400/500/600, JetBrains Mono 400/500/700), preferible autoalojadas.
- Cero JavaScript salvo: menú activo por scroll, selector de idioma y, si lo usas, el video.

### 9.2 SEO y compartición
- `<title>` y `<meta name="description">` propios.
- Open Graph y Twitter Card con `og:image` de 1200×630 (para que el enlace se vea bien en LinkedIn/WhatsApp).
- Datos estructurados `Person` (JSON-LD) con nombre, sitio, redes y lugar.
- `sitemap.xml` (`@astrojs/sitemap`) y `robots.txt`.
- `<html lang="es">`; con i18n, `hreflang` para EN.

### 9.3 Accesibilidad
- Un solo `<h1>`; jerarquía h2 → h3 sin saltos.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Enlace "Saltar al contenido" al inicio.
- Foco visible, navegación completa por teclado, `aria-pressed` en el selector de idioma.
- `prefers-reduced-motion` respetado en hovers y videos.
- Iconos decorativos con `aria-hidden="true"`.

### 9.4 Responsive
Probar en 360, 390, 768, 1024 y 1440 px. Comprobar específicamente:
- El título del hero no desborda a 360px (`clamp` + `overflow-wrap`).
- El nav pasa a varias líneas o a menú colapsable sin perder áreas táctiles de 44px.
- Tarjetas de stack y proyectos apilan en una columna.
- La línea de tiempo no genera scroll horizontal.

### 9.5 Internacionalización (fase 2)
Astro i18n con rutas `/` (ES) y `/en/`. Extraer los textos a `src/i18n/es.json` y `src/i18n/en.json`. El selector `ES | EN` del diseño pasa a ser un enlace a la ruta equivalente.

### 9.6 Analítica y dominio
- Plausible o Umami (ligera, sin cookies).
- Dominio propio con HTTPS y redirección `www` → raíz.

---

## 10. Estructura sugerida del proyecto Astro

```
src/
  components/
    Nav.astro
    Hero.astro
    About.astro
    Timeline.astro
    StackGrid.astro
    ProjectCard.astro
    Contact.astro
    Footer.astro
    Chip.astro
  data/
    projects.ts        // título, categoría, descripción, resultado, tags, demoUrl, repoUrl, imagen
    stack.ts
    experience.ts
  i18n/
    es.json
    en.json
  layouts/
    Base.astro         // <head>, SEO, fuentes, OG
  pages/
    index.astro
    en/index.astro
    proyectos/[slug].astro   // fase 2
public/
  cv.pdf
  og.png
```

`ProjectCard.astro` recibe un objeto de `projects.ts`; así añadir un proyecto es agregar un registro, no copiar HTML.

---

## 11. Checklist de entrega

- [ ] Paleta y contrastes aplicados (§1); ningún texto bajo 4.5:1.
- [ ] Tipografía: Inter para cuerpo, Montserrat para títulos, mono ≥ 12px.
- [ ] Nav y secciones con nombres idénticos; `DESCARGAR CV` unificado.
- [ ] Hero con disponibilidad, subtítulo específico y botones coherentes.
- [ ] Sobre mí con foto real e historia propia.
- [ ] Línea de tiempo con chips legibles.
- [ ] Íconos semánticos en el stack.
- [ ] 3 proyectos con captura/video, demo en vivo, código, resultado real.
- [ ] README cuidado en los 3 repositorios y fijados en GitHub.
- [ ] Sección de contacto con correo, WhatsApp y LinkedIn funcionando.
- [ ] Hovers, foco visible, `prefers-reduced-motion`.
- [ ] Meta/OG/JSON-LD/sitemap.
- [ ] Lighthouse ≥ 95 ×4.
- [ ] Probado en 360 px y 1440 px.
- [ ] Sin placeholders (`[...]`) ni enlaces `#`.
