import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Contenedor píldora coral: bloque de texto sobre coral, sangrado desde el
 * borde izquierdo de la pantalla y con el lado derecho totalmente redondeado.
 * Gesto de composición firma de la marca (portada del manual).
 *
 * Se usa a ancho completo de viewport: el padding izquierdo se alinea con el
 * contenedor del sitio para que el texto respete la retícula.
 */
export function PildoraCoral({
  children,
  className,
  /** Ancho máximo relativo al viewport en escritorio. */
  ancho = "max-w-[min(100%,72rem)]",
}: {
  children: ReactNode;
  className?: string;
  ancho?: string;
}) {
  return (
    <div
      className={cn(
        "pildora-coral w-full py-10 pr-10 md:py-14 md:pr-24 xl:py-20 xl:pr-32",
        "pl-6 md:pl-10 xl:pl-[max(4rem,calc((100vw-var(--container-site))/2+4rem))]",
        ancho,
        className,
      )}
    >
      {children}
    </div>
  );
}
