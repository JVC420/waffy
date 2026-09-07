import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatCOP } from "@/lib/format";
import { Badge, type BadgeTono } from "./Chip";
import { BotonAgregar } from "@/components/cart/BotonAgregar";
import type { ItemCarrito } from "@/components/layout/UiProvider";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Radio 40px en vez de 24px. */
  grande?: boolean;
  /** Levita sutilmente al pasar el cursor. */
  hover?: boolean;
  as?: "div" | "article" | "li" | "section" | "figure";
};

export function Card({
  children,
  className,
  grande = false,
  hover = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag className={cn("card", grande && "card-lg", hover && "card-hover", className)}>
      {children}
    </Tag>
  );
}

/* ─── Marco de foto: recorte sobre fondo plano de color ─── */

export type TonoFondo =
  | "hueso"
  | "coral"
  | "ambar"
  | "amarillo"
  | "blanco"
  | "tinta"
  | "ambar-claro"
  | "coral-claro";

const FONDOS: Record<TonoFondo, string> = {
  hueso: "bg-hueso",
  coral: "bg-coral",
  ambar: "bg-ambar",
  amarillo: "bg-amarillo",
  blanco: "bg-blanco ring-1 ring-inset ring-tinta/10",
  tinta: "bg-tinta",
  "ambar-claro": "bg-ambar-claro",
  "coral-claro": "bg-coral-claro",
};

/** El carrito solo conoce cinco tonos; el resto cae a hueso. */
export function tonoCarrito(t: TonoFondo): ItemCarrito["tono"] {
  return t === "coral" || t === "ambar" || t === "amarillo" || t === "blanco" ? t : "hueso";
}

export function MarcoFoto({
  tono = "hueso",
  aspect = "4/5",
  className,
  children,
  etiqueta = "Foto",
}: {
  tono?: TonoFondo;
  aspect?: string;
  className?: string;
  children?: ReactNode;
  etiqueta?: string;
}) {
  const oscuro = tono === "coral" || tono === "tinta";
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.75rem]",
        FONDOS[tono],
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {children ?? (
        <span
          className={cn(
            "eyebrow absolute inset-x-0 bottom-5 text-center",
            oscuro ? "text-blanco/70" : "text-tinta/40",
          )}
        >
          {etiqueta}
        </span>
      )}
    </div>
  );
}

/* ─── Tarjeta de producto ─── */

export type ProductCardProps = {
  id?: string;
  href?: string;
  nombre: string;
  linea: string;
  gramaje: string;
  precio: number;
  badge?: { texto: string; tono?: BadgeTono };
  tono?: TonoFondo;
  className?: string;
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ProductCard({
  id,
  href,
  nombre,
  linea,
  gramaje,
  precio,
  badge,
  tono = "hueso",
  className,
}: ProductCardProps) {
  const idFinal = id ?? slug(nombre);
  return (
    <Card as="article" hover className={cn("group p-3", className)}>
      <div className="relative">
        {href ? (
          <Link href={href} aria-label={nombre} className="block rounded-[1.75rem]">
            <MarcoFoto tono={tono} etiqueta="Foto producto" />
          </Link>
        ) : (
          <MarcoFoto tono={tono} etiqueta="Foto producto" />
        )}
        {badge && (
          <Badge tono={badge.tono ?? "ambar"} className="pointer-events-none absolute left-4 top-4">
            {badge.texto}
          </Badge>
        )}
        <BotonAgregar
          compacto
          producto={{ id: idFinal, nombre, gramaje, precio, tono: tonoCarrito(tono) }}
          className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-500 ease-waffy group-hover:opacity-100 focus-visible:opacity-100"
        />
      </div>
      <div className="flex flex-col gap-1 px-2 pb-2 pt-4">
        <span className="eyebrow text-grafito">{linea}</span>
        <h3 className="text-[1.0625rem] font-semibold leading-snug">
          {href ? (
            <Link href={href} className="after:absolute after:inset-0 after:rounded-card">
              {nombre}
            </Link>
          ) : (
            nombre
          )}
        </h3>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-semibold">{formatCOP(precio)}</span>
          <span className="text-sm text-grafito">{gramaje}</span>
        </div>
      </div>
    </Card>
  );
}

/* ─── Tarjeta de categoría ─── */

export function CategoryCard({
  nombre,
  conteo,
  tono = "hueso",
  className,
}: {
  nombre: string;
  conteo: string;
  tono?: TonoFondo;
  className?: string;
}) {
  const oscuro = tono === "coral" || tono === "tinta";
  return (
    <a
      href="#"
      className={cn(
        "group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-card-lg p-6 transition-transform duration-700 ease-waffy hover:-translate-y-1",
        FONDOS[tono],
        oscuro ? "text-blanco" : "text-tinta",
        (tono === "hueso" || tono === "blanco") && "ring-1 ring-inset ring-tinta/10",
        className,
      )}
    >
      <span className={cn("eyebrow", oscuro ? "text-blanco/70" : "text-grafito")}>
        {conteo}
      </span>
      <span className="font-display text-h3 font-bold">{nombre}</span>
    </a>
  );
}

/* ─── Tarjeta de testimonio ─── */

export function TestimonialCard({
  cita,
  nombre,
  ciudad,
  mascota,
  className,
}: {
  cita: string;
  nombre: string;
  ciudad: string;
  mascota: string;
  className?: string;
}) {
  return (
    <Card as="figure" grande className={cn("flex flex-col gap-8 p-8 md:p-10", className)}>
      <blockquote className="font-display text-h3 font-bold text-pretty">
        “{cita}”
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <span className="size-12 shrink-0 rounded-full bg-ambar" aria-hidden="true" />
        <span className="flex flex-col text-sm">
          <span className="font-semibold">{nombre}</span>
          <span className="text-grafito">
            {ciudad} · {mascota}
          </span>
        </span>
      </figcaption>
    </Card>
  );
}
