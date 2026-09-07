import { existsSync } from "node:fs";
import path from "node:path";
import "server-only";

/**
 * Comprueba en el servidor qué archivos de /public existen, para que
 * <CinematicVideo /> no tenga que sondear rutas y llenar la consola de 404
 * mientras los videos no estén generados.
 */
export function existeEnPublic(ruta: string): boolean {
  const limpia = ruta.replace(/^\/+/, "");
  return existsSync(path.join(process.cwd(), "public", limpia));
}

import type { Disponibilidad } from "@/components/media/CinematicVideo";

export function disponibilidadVideo(slot: {
  src: string;
  poster: string;
  srcMobile?: string;
  posterMobile?: string;
}): Disponibilidad {
  return {
    video: existeEnPublic(slot.src),
    poster: existeEnPublic(slot.poster),
    videoMobile: slot.srcMobile ? existeEnPublic(slot.srcMobile) : undefined,
    posterMobile: slot.posterMobile ? existeEnPublic(slot.posterMobile) : undefined,
  };
}
