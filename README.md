# Waffy · prototipo visual

Prototipo del sitio de **Waffy** (waffy.com.co), marca colombiana de bienestar para mascotas: alimentos premium, accesorios y cuidado. Es un sitio **no funcional**: sin backend, sin base de datos, sin pagos ni autenticación. Todo con datos mock. Lo que se evalúa es el diseño y el movimiento.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Node 20 o superior.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run typecheck` | Comprobación de tipos |

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 con tokens en `@theme` (`src/app/globals.css`)
- Motion (framer-motion) para entradas, scroll y transiciones; Lenis para scroll suave
- Sin librerías de componentes: todo a mano en `src/components`

## Rutas

| Ruta | Estado |
|---|---|
| `/` | Home completa: hero con video, barra de confianza, categorías, píldora de propósito, destacados, ingredientes con diagrama al scroll, planes con calculadora, quiz, video narrativo y testimonios |
| `/estilos` | Sistema de diseño: paleta, tipografía, botones, chips, tarjetas, gestos de marca y movimiento |
| `/productos` | Pendiente (paso 4) |
| `/producto/[slug]` | Pendiente (paso 4) |
| `/nosotros` | Pendiente (paso 4) |
| `/suscripcion` | Pendiente (paso 4) |

## Estructura

```
src/
  app/
    (sitio)/        header, footer, carrito y páginas del sitio
    (sistema)/      /estilos, sin header ni footer
    globals.css     tokens de diseño y componentes base
  components/
    home/           secciones de la Home
    layout/         Header, Footer, MenuMovil, CarritoDrawer, UiProvider, SmoothScroll
    media/          CinematicVideo y FondoMarca
    ui/             Button, Chip, Card, Logo, Reveal, TrazoOrganico, FormaOrganica, Subrayado
  data/             productos, categorías, testimonios, planes, faq, ingredientes, videos
  lib/              formato COP, contraste WCAG, comprobación de videos en servidor
public/
  brand/            SVG del logo extraídos del manual de marca
  videos/           slots de video (ver README.md ahí)
```

## Marca

- Colores oficiales del manual: coral `#E95154` y ámbar `#FBAA35`, más sus tintas. Hueso, tinta y grafito vienen del brief.
- Gluten para display y Poppins para cuerpo y UI.
- El logo se dibuja inline desde `src/components/ui/logo-paths.ts` y también está en `public/brand/`. Nunca se estira, rota ni lleva sombra; la zona segura se aplica como padding.
- Proporción de color 60 % neutros, 30 % coral, 10 % ámbar. El coral va en bloques (header, titulares grandes sobre blanco, CTA), nunca a pantalla completa.

## Videos y fotos

Los videos se generan aparte y se dejan en `public/videos/` con los nombres de la tabla de `public/videos/README.md`. Mientras no existan, cada slot muestra su poster o un fondo de marca; nada se rompe. Los marcos de foto de producto y mascota son bloques de color a la espera de fotografía.

## Assets pendientes

- Videos: `hero`, `hero-mobile`, `cat-*` (5), `ingredientes`, `nosotros-1`, `nosotros-2`, cada uno en `.webm` + `.mp4` + poster `.jpg`.
- Fotografía de producto (24 referencias) y de mascotas (hero, propósito, testimonios).
- Número real de WhatsApp en `src/data/navegacion.ts`.
