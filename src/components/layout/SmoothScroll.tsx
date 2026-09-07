"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let instancia: Lenis | null = null;

/** Acceso a la instancia activa (para detener el scroll con menús y drawers). */
export function getLenis() {
  return instancia;
}

/**
 * Scroll suave con Lenis. Se desactiva con prefers-reduced-motion.
 * Se monta una sola vez en el layout raíz.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      anchors: { offset: -88 },
    });
    instancia = lenis;

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instancia = null;
    };
  }, []);

  return null;
}
