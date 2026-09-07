import type { ComponentType } from "react";
import { IconoHoja, IconoReloj, IconoSello, IconoVeterinario } from "@/components/ui/Iconos";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

const SELLOS: Array<{ Icono: ComponentType<{ size?: number }>; titulo: string; texto: string }> = [
  { Icono: IconoHoja, titulo: "Sin subproductos", texto: "Proteína real como primer ingrediente." },
  { Icono: IconoVeterinario, titulo: "Formulado con veterinarios", texto: "Cada receta revisada por nutricionistas." },
  { Icono: IconoReloj, titulo: "Domicilio en 24 h", texto: "Bogotá, Medellín, Cali y más ciudades." },
  { Icono: IconoSello, titulo: "Satisfacción garantizada", texto: "Si no le gusta, te devolvemos el dinero." },
];

export function BarraConfianza() {
  return (
    <section aria-label="Por qué Waffy" className="contenedor -mt-10 relative z-10 md:-mt-14">
      <Reveal
        as="ul"
        className="grid gap-px overflow-hidden rounded-card-lg bg-tinta/10 shadow-[0_32px_64px_-40px_rgb(26_26_26/0.28)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {SELLOS.map(({ Icono, titulo, texto }) => (
          <RevealItem as="li" key={titulo} className="flex gap-4 bg-blanco p-6 md:p-8">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ambar-claro text-tinta">
              <Icono size={20} />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-semibold leading-snug">{titulo}</span>
              <span className="text-sm text-grafito">{texto}</span>
            </span>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
