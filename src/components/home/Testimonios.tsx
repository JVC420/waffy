"use client";

import { useRef } from "react";
import { Encabezado } from "@/components/ui/Encabezado";
import { IconoFlecha } from "@/components/ui/Iconos";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { TESTIMONIOS, type Testimonio } from "@/data/testimonios";
import { cn } from "@/lib/cn";

const TONOS: Record<Testimonio["tono"], string> = {
  coral: "bg-coral",
  ambar: "bg-ambar",
  hueso: "bg-hueso",
  "ambar-claro": "bg-ambar-claro",
  "coral-claro": "bg-coral-claro",
};

export function Testimonios() {
  const ref = useRef<HTMLUListElement>(null);

  const desplazar = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const ancho = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: dir * (ancho + 16), behavior: "smooth" });
  };

  return (
    <section id="testimonios" className="py-section">
      <div className="contenedor flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Encabezado eyebrow="Historias reales" titulo="Lo que dicen en casa." coral={false} />
        <div className="flex gap-2">
          <button type="button" onClick={() => desplazar(-1)} aria-label="Anterior" className="btn btn-icono btn-fantasma">
            <IconoFlecha className="rotate-180" />
          </button>
          <button type="button" onClick={() => desplazar(1)} aria-label="Siguiente" className="btn btn-icono btn-tinta">
            <IconoFlecha />
          </button>
        </div>
      </div>

      <Reveal amount={0.1} className="mt-12">
        <ul ref={ref} className="carrusel sangria-contenedor pb-2" data-lenis-prevent aria-label="Testimonios">
          {TESTIMONIOS.map((t) => (
            <RevealItem as="li" key={t.id} className="w-[82vw] sm:w-[24rem]">
              <figure className="card card-lg flex h-full flex-col justify-between gap-10 p-8">
                <blockquote className="font-display text-[1.75rem] font-bold leading-tight text-pretty">
                  “{t.cita}”
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span className={cn("size-12 shrink-0 rounded-full", TONOS[t.tono])} aria-hidden="true" />
                  <span className="flex flex-col text-sm">
                    <span className="font-semibold">{t.nombre}</span>
                    <span className="text-grafito">
                      {t.ciudad} · {t.mascota}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
