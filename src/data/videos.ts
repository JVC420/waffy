/**
 * Slots de video del sitio (ver public/videos/README.md).
 * Solo rutas: la comprobación de existencia vive en src/lib/videos.ts (servidor).
 */
export const VIDEOS = {
  hero: {
    src: "/videos/hero.mp4",
    srcMobile: "/videos/hero-mobile.mp4",
    poster: "/videos/hero.jpg",
    posterMobile: "/videos/hero-mobile.jpg",
  },
  ingredientes: {
    src: "/videos/ingredientes.mp4",
    poster: "/videos/ingredientes.jpg",
  },
  nosotros1: {
    src: "/videos/nosotros-1.mp4",
    poster: "/videos/nosotros-1.jpg",
  },
  nosotros2: {
    src: "/videos/nosotros-2.mp4",
    poster: "/videos/nosotros-2.jpg",
  },
} as const;

export const VIDEO_CATEGORIA = (slug: string) => ({
  src: `/videos/cat-${slug}.mp4`,
  poster: `/videos/cat-${slug}.jpg`,
});
