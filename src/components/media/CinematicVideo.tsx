"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconoPausa, IconoPlay } from "@/components/ui/Iconos";
import { cn } from "@/lib/cn";
import { FondoMarca } from "./FondoMarca";

export type VideoVariant = "hero" | "inline" | "loop";
export type VideoOverlay = "none" | "suave" | "fuerte" | "inferior" | "hero";

/** Qué archivos existen. Lo calcula el servidor (src/lib/videos.ts) para no sondear rutas. */
export type Disponibilidad = {
  video: boolean;
  poster: boolean;
  videoMobile?: boolean;
  posterMobile?: boolean;
};

export type CinematicVideoProps = {
  /** Si se pasa, no se hacen sondeos HEAD en cliente. */
  disponible?: Disponibilidad;
  /** Ruta del .mp4 (H.264). El .webm se deriva con el mismo nombre. */
  src: string;
  /** Versión vertical para < 768px (hero). */
  srcMobile?: string;
  /** Poster obligatorio: evita el flash negro antes del primer frame. */
  poster: string;
  posterMobile?: string;
  variant?: VideoVariant;
  overlay?: VideoOverlay;
  /** Solo inline: relación de aspecto CSS, p. ej. "21/9". */
  aspect?: string;
  /** Solo inline: relación de aspecto bajo 768px (por defecto, la misma). */
  aspectMobile?: string;
  caption?: string;
  className?: string;
  /** Qué mostrar si no existe ni el video ni el poster. Por defecto, FondoMarca. */
  fallback?: ReactNode;
  /** Solo loop: reproduce bajo demanda (hover de categoría). */
  playing?: boolean;
  /** Hero: precarga completa. */
  priority?: boolean;
  /** Contenido superpuesto (texto del hero, etc.). */
  children?: ReactNode;
};

const OVERLAYS: Record<VideoOverlay, string> = {
  none: "",
  suave: "bg-tinta/25",
  fuerte: "bg-tinta/45",
  inferior: "bg-[linear-gradient(to_top,rgb(26_26_26/0.7),rgb(26_26_26/0.15)_45%,transparent_70%)]",
  hero: "bg-[linear-gradient(to_bottom,rgb(26_26_26/0.45),transparent_28%,transparent_50%,rgb(26_26_26/0.6))]",
};

const webmDe = (mp4: string) => mp4.replace(/\.mp4$/i, ".webm");

/**
 * Video cinematográfico: autoplay silencioso en loop, poster obligatorio,
 * pausa fuera del viewport, respeta prefers-reduced-motion (solo poster),
 * y si el archivo no existe muestra el poster o un fondo de marca sin romper el layout.
 */
export function CinematicVideo({
  disponible,
  src,
  srcMobile,
  poster,
  posterMobile,
  variant = "inline",
  overlay = "none",
  aspect = "16/9",
  aspectMobile,
  caption,
  className,
  fallback,
  playing = true,
  priority = false,
  children,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contRef = useRef<HTMLDivElement>(null);
  const [esMovil, setEsMovil] = useState(false);
  const [reducido, setReducido] = useState(false);
  const [falloReproduccion, setFalloReproduccion] = useState(false);
  const [videoSondeo, setVideoSondeo] = useState<boolean | null>(null);
  const [posterSondeo, setPosterSondeo] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [pausadoUsuario, setPausadoUsuario] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);

  // En móvil usamos la versión vertical solo si sabemos que existe; si no, la horizontal.
  const usaMovil = esMovil && !!srcMobile && (disponible ? disponible.videoMobile === true : true);
  const srcActual = usaMovil ? srcMobile! : src;
  const posterActual = esMovil && posterMobile ? posterMobile : poster;

  const conocido = disponible !== undefined;
  const videoOk: boolean | null = conocido
    ? (usaMovil ? (disponible.videoMobile ?? false) : disponible.video)
    : videoSondeo;
  const posterOk: boolean | null = conocido
    ? (esMovil && posterMobile ? (disponible.posterMobile ?? false) : disponible.poster)
    : posterSondeo;
  const fallo = videoOk === false || falloReproduccion;

  // Media queries: móvil y movimiento reducido.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => {
      setEsMovil(mq.matches);
      setReducido(rm.matches);
    };
    actualizar();
    mq.addEventListener("change", actualizar);
    rm.addEventListener("change", actualizar);
    return () => {
      mq.removeEventListener("change", actualizar);
      rm.removeEventListener("change", actualizar);
    };
  }, []);

  // Sin datos del servidor: sondeo en cliente. Si no existe, poster o fondo de marca.
  useEffect(() => {
    if (conocido) return;
    let activo = true;
    setVideoSondeo(null);
    fetch(srcActual, { method: "HEAD" })
      .then((r) => activo && setVideoSondeo(r.ok))
      .catch(() => activo && setVideoSondeo(false));
    return () => {
      activo = false;
    };
  }, [srcActual, conocido]);

  useEffect(() => {
    if (conocido) return;
    let activo = true;
    const img = new Image();
    img.onload = () => activo && setPosterSondeo(true);
    img.onerror = () => activo && setPosterSondeo(false);
    img.src = posterActual;
    return () => {
      activo = false;
    };
  }, [posterActual, conocido]);

  // Recarga cuando cambia la fuente (desktop ↔ móvil).
  useEffect(() => {
    setFalloReproduccion(false);
    videoRef.current?.load();
  }, [srcActual]);

  // Pausa fuera del viewport.
  useEffect(() => {
    const el = contRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Control de reproducción.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || fallo || reducido) return;
    const debe = visible && !pausadoUsuario && (variant !== "loop" || playing);
    if (debe) {
      v.play()
        .then(() => setReproduciendo(true))
        .catch(() => setReproduciendo(false));
    } else {
      v.pause();
      setReproduciendo(false);
    }
  }, [visible, reducido, pausadoUsuario, playing, variant, fallo]);

  // null = aún no sabemos si existe (solo en modo sondeo): no pintamos nada todavía.
  const mostrarVideo = videoOk === true && !fallo && !reducido;
  const resuelto = videoOk !== null && posterOk !== null;
  // En loop (hover de categorías) el fondo plano de la tarjeta es el respaldo: ni poster ni fondo de marca.
  const mostrarPoster = !mostrarVideo && posterOk === true && variant !== "loop";
  const mostrarFallback = !mostrarVideo && resuelto && posterOk === false && variant !== "loop";
  const esFondo = variant === "hero" || variant === "loop";
  const Wrapper = caption ? "figure" : "div";
  // En loop, el video (y su overlay) solo se ven mientras reproduce: el fondo plano de la tarjeta manda.
  const ocultoLoop = variant === "loop" && !reproduciendo;

  return (
    <Wrapper className={cn(esFondo ? "absolute inset-0" : "relative w-full", className)}>
      <div
        ref={contRef}
        className={cn(
          "relative h-full w-full overflow-hidden",
          variant === "hero" && "bg-tinta",
          variant === "inline" && "aspect-(--aspect-m) rounded-card-lg bg-tinta md:aspect-(--aspect)",
        )}
        style={
          variant === "inline"
            ? ({ "--aspect": aspect, "--aspect-m": aspectMobile ?? aspect } as React.CSSProperties)
            : undefined
        }
      >
        {mostrarVideo && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              variant === "loop" && "transition-opacity duration-700 ease-waffy",
              ocultoLoop && "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            poster={posterOk ? posterActual : undefined}
            onError={() => setFalloReproduccion(true)}
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={webmDe(srcActual)} type="video/webm" />
            <source src={srcActual} type="video/mp4" />
          </video>
        )}

        {mostrarPoster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={posterActual} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        )}

        {mostrarFallback && (fallback ?? <FondoMarca />)}

        {overlay !== "none" && !mostrarFallback && (mostrarVideo || mostrarPoster) && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-700 ease-waffy",
              OVERLAYS[overlay],
              ocultoLoop && "opacity-0",
            )}
          />
        )}

        {children}

        {mostrarVideo && variant !== "loop" && (
          <button
            type="button"
            onClick={() => setPausadoUsuario((p) => !p)}
            aria-label={pausadoUsuario ? "Reproducir video" : "Pausar video"}
            className="btn btn-icono btn-sm absolute bottom-5 right-5 z-10 border-blanco/40 bg-blanco/15 text-blanco backdrop-blur-md hover:bg-blanco/35 md:bottom-8 md:right-8"
          >
            {pausadoUsuario ? <IconoPlay size={16} /> : <IconoPausa size={16} />}
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-4 text-sm text-grafito">{caption}</figcaption>}
    </Wrapper>
  );
}
