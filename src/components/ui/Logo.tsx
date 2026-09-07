import { cn } from "@/lib/cn";
import { ISOTIPO, LOGO_VB, WORDMARK } from "./logo-paths";

/**
 * Logo Waffy, dibujado inline con los trazados del manual de marca.
 *
 * El imagotipo es vertical: isotipo (W orgánica con cara de perro) arriba y
 * wordmark "Waffy" en ámbar debajo. El manual no define versión horizontal.
 *
 * Reglas duras (manual, páginas 06–08):
 *  - Zona segura = ancho de una "W" del wordmark, alrededor. Se aplica como padding.
 *  - Proporción fija: viewBox + aspect-ratio. Nunca estirar.
 *  - Sin rotación, sin sombras, sin filtros, sin elementos encima (globals.css → .logo).
 *  - Sobre foto/video o fondo oscuro: solo variante "blanco".
 *  - Isotipo solo: favicon, avatar y header compacto tras scroll.
 *
 * Los mismos trazados están como archivos en /public/brand/ para usos externos.
 */
export type LogoVariant = "color" | "blanco" | "negro";
export type LogoMode = "completo" | "isotipo";

type LogoProps = {
  variant?: LogoVariant;
  mode?: LogoMode;
  /** Altura en px del logo (sin contar zona segura). */
  height?: number;
  /** Aplica la zona segura como padding. Desactivar solo si el contenedor ya la garantiza. */
  safeZone?: boolean;
  className?: string;
  title?: string;
};

const COLORES: Record<LogoVariant, { iso: string; word: string }> = {
  color: { iso: "var(--color-coral)", word: "var(--color-ambar)" },
  blanco: { iso: "var(--color-blanco)", word: "var(--color-blanco)" },
  negro: { iso: "var(--color-tinta)", word: "var(--color-tinta)" },
};

/**
 * Zona segura relativa a la altura, medida en el manual (página 06):
 * la "W" de referencia mide 34 unidades frente a 234 del imagotipo y 193 del isotipo.
 */
const ZONA_SEGURA: Record<LogoMode, number> = { completo: 0.15, isotipo: 0.18 };

export function Logo({
  variant = "color",
  mode = "completo",
  height = 48,
  safeZone = true,
  className,
  title = "Waffy",
}: LogoProps) {
  const [vx, vy, vw, vh] = LOGO_VB[mode];
  const width = Math.round((height * vw) / vh);
  const pad = safeZone ? Math.round(height * ZONA_SEGURA[mode]) : 0;
  const c = COLORES[variant];

  return (
    <span
      className={cn("logo inline-flex shrink-0 leading-none", className)}
      style={{ padding: pad }}
    >
      <svg
        viewBox={`${vx} ${vy} ${vw} ${vh}`}
        width={width}
        height={height}
        role="img"
        aria-label={title}
        className="block h-auto max-w-full"
        style={{ aspectRatio: `${vw} / ${vh}` }}
      >
        {ISOTIPO.map((p, i) => (
          <path key={`i${i}`} d={p.d} fill={c.iso} fillRule={p.evenodd ? "evenodd" : undefined} />
        ))}
        {mode === "completo" &&
          WORDMARK.map((p, i) => (
            <path key={`w${i}`} d={p.d} fill={c.word} fillRule={p.evenodd ? "evenodd" : undefined} />
          ))}
      </svg>
    </span>
  );
}
