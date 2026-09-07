"use client";

import { useUi, type ItemCarrito } from "@/components/layout/UiProvider";
import type { ButtonVariant } from "@/components/ui/Button";
import { IconoMas } from "@/components/ui/Iconos";
import { cn } from "@/lib/cn";

type Props = {
  producto: Omit<ItemCarrito, "cantidad">;
  cantidad?: number;
  /** Botón redondo compacto (tarjetas) o píldora con texto (ficha de producto). */
  compacto?: boolean;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
};

export function BotonAgregar({
  producto,
  cantidad = 1,
  compacto = false,
  variant,
  className,
  children,
}: Props) {
  const { agregar } = useUi();
  const v = variant ?? (compacto ? "blanco" : "coral");
  return (
    <button
      type="button"
      onClick={() => agregar(producto, cantidad)}
      aria-label={compacto ? `Añadir ${producto.nombre} al carrito` : undefined}
      className={cn("btn", `btn-${v}`, compacto ? "btn-icono btn-sm" : "btn-lg", className)}
    >
      {compacto ? <IconoMas size={18} /> : (children ?? "Añadir al carrito")}
    </button>
  );
}
