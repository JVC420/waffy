import { FormaOrganica } from "@/components/ui/FormaOrganica";
import { cn } from "@/lib/cn";

type Tono = "coral" | "ambar" | "hueso" | "blanco";

const FONDO: Record<Tono, string> = {
  coral: "bg-coral",
  ambar: "bg-ambar",
  hueso: "bg-hueso",
  blanco: "bg-blanco",
};

const COLORES: Record<Tono, { mancha: string; anillos: string; anillosClaros: string; puntos: string }> = {
  coral: {
    mancha: "var(--color-coral-suave)",
    anillos: "var(--color-ambar)",
    anillosClaros: "var(--color-coral-claro)",
    puntos: "var(--color-ambar-suave)",
  },
  ambar: {
    mancha: "var(--color-ambar-suave)",
    anillos: "var(--color-blanco)",
    anillosClaros: "var(--color-ambar-claro)",
    puntos: "var(--color-coral-claro)",
  },
  hueso: {
    mancha: "var(--color-ambar-claro)",
    anillos: "var(--color-ambar)",
    anillosClaros: "var(--color-coral-claro)",
    puntos: "var(--color-ambar-suave)",
  },
  blanco: {
    mancha: "var(--color-ambar-claro)",
    anillos: "var(--color-ambar)",
    anillosClaros: "var(--color-coral-claro)",
    puntos: "var(--color-ambar-suave)",
  },
};

/** Sobre claros, la composición respira más: anillos ámbar más pequeños y sin racimo de puntos. */
const LIGERO: Record<Tono, boolean> = { coral: false, ambar: false, hueso: true, blanco: true };

/**
 * Fondo de marca con las formas orgánicas de la portada del manual.
 * Lo usa CinematicVideo cuando no hay video ni poster, y cualquier bloque que
 * necesite un fondo de color con carácter.
 */
export function FondoMarca({ tono = "coral", className }: { tono?: Tono; className?: string }) {
  const c = COLORES[tono];
  const ligero = LIGERO[tono];
  return (
    <div className={cn("absolute inset-0 overflow-hidden", FONDO[tono], className)} aria-hidden="true">
      {/* Los anillos claros van por debajo de la franja del header, lejos del logo y del menú. */}
      <FormaOrganica forma="anillosClaros" color={c.anillosClaros} className="absolute left-[40%] top-[12%] w-[44%] md:left-[58%] md:top-[9%] md:w-[28%]" />
      <FormaOrganica forma="mancha" color={c.mancha} className="absolute -left-[45%] top-[52%] w-[150%] md:-left-[12%] md:top-[40%] md:w-[78%]" />
      {!ligero && (
        <FormaOrganica forma="puntos" color={c.puntos} className="absolute left-[8%] top-[44%] w-[22%] md:left-[10%] md:top-[32%] md:w-[13%]" />
      )}
      <FormaOrganica
        forma="anillos"
        color={c.anillos}
        className={cn(
          "absolute",
          ligero
            ? "left-[78%] top-[26%] w-[32%] md:left-[86%] md:top-[44%] md:w-[18%]"
            : "left-[72%] top-[22%] w-[40%] md:left-[84%] md:top-[39%] md:w-[23%]",
        )}
      />
    </div>
  );
}
