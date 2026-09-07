import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal, RevealItem } from "./Reveal";

/** Encabezado de sección: eyebrow, H2 en Gluten (coral sobre blanco, tinta sobre hueso) y lead. */
export function Encabezado({
  eyebrow,
  titulo,
  texto,
  coral = true,
  centrado = false,
  className,
  children,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  /** Título en coral (solo sobre fondo blanco, por contraste). */
  coral?: boolean;
  centrado?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal
      className={cn("flex flex-col gap-5", centrado ? "items-center text-center" : "items-start", className)}
      amount={0.3}
    >
      {eyebrow && (
        <RevealItem as="p" className="eyebrow text-grafito">
          {eyebrow}
        </RevealItem>
      )}
      <RevealItem
        as="h2"
        className={cn(
          "max-w-[13em] font-display text-h2 font-bold text-balance",
          coral ? "text-coral" : "text-tinta",
        )}
      >
        {titulo}
      </RevealItem>
      {texto && (
        <RevealItem as="p" className="max-w-xl text-lead text-grafito text-pretty">
          {texto}
        </RevealItem>
      )}
      {children && <RevealItem>{children}</RevealItem>}
    </Reveal>
  );
}
