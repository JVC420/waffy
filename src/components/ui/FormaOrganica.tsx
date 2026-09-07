import { cn } from "@/lib/cn";
import { PORTADA, type Trazado } from "./logo-paths";

/**
 * Formas orgánicas del manual (portada): mancha, anillos y racimo de puntos.
 * Son elementos decorativos, siempre aria-hidden, siempre en tintas o ámbar.
 * Nunca se apilan sobre el logo ni compiten con la foto.
 */
export type Forma = "mancha" | "anillos" | "anillosClaros" | "puntos";

const FORMAS: Record<Forma, { paths: Trazado[]; vb: string; color: string }> = {
  mancha: { paths: PORTADA.mancha, vb: "-222 429 1499 1184", color: "var(--color-coral-suave)" },
  anillos: { paths: PORTADA.anillosAmbar, vb: "1613 417 433 408", color: "var(--color-ambar)" },
  anillosClaros: { paths: PORTADA.anillosClaros, vb: "-55 -138 543 306", color: "var(--color-coral-claro)" },
  puntos: { paths: PORTADA.puntos, vb: "186 351 253 260", color: "var(--color-ambar-suave)" },
};

export function FormaOrganica({
  forma,
  color,
  className,
}: {
  forma: Forma;
  /** Sobrescribe el color por defecto (cualquier valor CSS). */
  color?: string;
  className?: string;
}) {
  const f = FORMAS[forma];
  return (
    <svg
      viewBox={f.vb}
      className={cn("block", className)}
      fill={color ?? f.color}
      aria-hidden="true"
      focusable="false"
    >
      {f.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.evenodd ? "evenodd" : undefined} />
      ))}
    </svg>
  );
}
