"use client";

import Link from "next/link";
import { useState } from "react";
import { CinematicVideo, type Disponibilidad } from "@/components/media/CinematicVideo";
import { IconoFlecha } from "@/components/ui/Iconos";
import type { Categoria } from "@/data/categorias";
import { cn } from "@/lib/cn";

const FONDOS: Record<Categoria["tono"], string> = {
  coral: "bg-coral",
  ambar: "bg-ambar",
  hueso: "bg-hueso",
};

/** Tarjeta de categoría con fondo plano y micro-video en loop al pasar el cursor. */
export function CategoriaCard({
  categoria,
  conteo,
  video,
  disponible,
}: {
  categoria: Categoria;
  conteo: number;
  video: { src: string; poster: string };
  disponible: Disponibilidad;
}) {
  const [activo, setActivo] = useState(false);
  const { slug, nombre, descripcion, tono, grande } = categoria;
  const sobreVideo = activo && disponible.video;
  const claro = tono === "coral" || sobreVideo;

  return (
    <Link
      href={`/productos?especie=${slug}`}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      onFocus={() => setActivo(true)}
      onBlur={() => setActivo(false)}
      className={cn(
        "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-card-lg p-6 transition-[transform,color] duration-700 ease-waffy hover:-translate-y-1 md:p-8",
        FONDOS[tono],
        claro ? "text-blanco" : "text-tinta",
        grande ? "min-h-[22rem] lg:min-h-[34rem]" : "min-h-[15rem] lg:min-h-[16rem]",
      )}
    >
      <CinematicVideo
        variant="loop"
        overlay="inferior"
        playing={activo}
        disponible={disponible}
        src={video.src}
        poster={video.poster}
        className="-z-10"
      />

      <span className="flex items-start justify-between gap-4">
        <span className={cn("eyebrow transition-colors duration-500", claro ? "text-blanco/80" : "text-grafito")}>
          {conteo} {conteo === 1 ? "producto" : "productos"}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "btn btn-icono btn-sm transition-transform duration-500 ease-waffy group-hover:translate-x-1",
            claro ? "btn-blanco" : "btn-tinta",
          )}
        >
          <IconoFlecha size={18} />
        </span>
      </span>

      <span className="flex flex-col gap-2">
        <span className={cn("font-display font-bold leading-none", grande ? "text-h2" : "text-h3")}>
          {nombre}
        </span>
        <span
          className={cn(
            "text-sm transition-colors duration-500",
            claro ? "text-blanco/85" : "text-grafito",
            grande ? "max-w-sm" : "max-w-[17rem]",
          )}
        >
          {descripcion}
        </span>
      </span>
    </Link>
  );
}
