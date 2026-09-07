import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  activo?: boolean;
  children: ReactNode;
};

/** Chip de filtro. Estado accesible vía aria-pressed. */
export function Chip({ activo = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      className={cn("chip", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export type BadgeTono = "ambar" | "hueso" | "blanco" | "coral" | "tinta";

export function Badge({
  tono = "ambar",
  className,
  children,
}: {
  tono?: BadgeTono;
  className?: string;
  children: ReactNode;
}) {
  return <span className={cn("badge", `badge-${tono}`, className)}>{children}</span>;
}
