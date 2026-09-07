"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { IconoCerrar, IconoMas, IconoMenos } from "@/components/ui/Iconos";
import { formatCOP } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useUi, type ItemCarrito } from "./UiProvider";
import { getLenis } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;
const ENVIO_GRATIS = 150000;

const FONDOS: Record<NonNullable<ItemCarrito["tono"]>, string> = {
  hueso: "bg-hueso",
  coral: "bg-coral",
  ambar: "bg-ambar",
  amarillo: "bg-amarillo",
  blanco: "bg-blanco ring-1 ring-inset ring-tinta/10",
};

/** Carrito visual: drawer lateral con estado local. No hay checkout. */
export function CarritoDrawer() {
  const { carritoAbierto, cerrarCarrito, items, cambiarCantidad, quitar, subtotal } = useUi();

  useEffect(() => {
    if (!carritoAbierto) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrarCarrito();
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [carritoAbierto, cerrarCarrito]);

  const progreso = Math.min(1, subtotal / ENVIO_GRATIS);
  const faltante = Math.max(0, ENVIO_GRATIS - subtotal);

  return (
    <AnimatePresence>
      {carritoAbierto && (
        <>
          <motion.button
            type="button"
            aria-label="Cerrar carrito"
            className="fixed inset-0 z-[70] bg-tinta/40"
            onClick={cerrarCarrito}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Tu carrito"
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-blanco sm:rounded-l-card-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <header className="flex items-center justify-between px-6 pt-6 md:px-8">
              <h2 className="font-display text-h3 font-bold">Tu carrito</h2>
              <button
                type="button"
                onClick={cerrarCarrito}
                aria-label="Cerrar carrito"
                className="btn btn-icono btn-sm btn-fantasma"
                autoFocus
              >
                <IconoCerrar />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <Logo mode="isotipo" height={56} safeZone={false} />
                <p className="font-display text-2xl font-bold">Aún no hay nada aquí.</p>
                <p className="max-w-xs text-sm text-grafito">
                  Empieza por lo que más le gusta. Envío gratis desde {formatCOP(ENVIO_GRATIS)}.
                </p>
                <Button href="/productos" onClick={cerrarCarrito}>
                  Ver productos
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 md:px-8" data-lenis-prevent>
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-4 border-b border-tinta/10 py-5 last:border-0">
                      <div className={cn("size-20 shrink-0 rounded-2xl", FONDOS[i.tono ?? "hueso"])} aria-hidden="true" />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="font-semibold leading-snug">{i.nombre}</p>
                        <p className="text-sm text-grafito">{i.gramaje}</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div className="inline-flex h-9 items-center rounded-pill border border-tinta/15">
                            <button
                              type="button"
                              className="flex h-full w-9 items-center justify-center rounded-l-pill hover:bg-hueso"
                              aria-label={`Quitar una unidad de ${i.nombre}`}
                              onClick={() => cambiarCantidad(i.id, i.cantidad - 1)}
                            >
                              <IconoMenos size={16} />
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold" aria-live="polite">
                              {i.cantidad}
                            </span>
                            <button
                              type="button"
                              className="flex h-full w-9 items-center justify-center rounded-r-pill hover:bg-hueso"
                              aria-label={`Añadir una unidad de ${i.nombre}`}
                              onClick={() => cambiarCantidad(i.id, i.cantidad + 1)}
                            >
                              <IconoMas size={16} />
                            </button>
                          </div>
                          <span className="font-semibold">{formatCOP(i.precio * i.cantidad)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => quitar(i.id)}
                          className="mt-1 self-start text-xs font-semibold text-grafito underline-offset-4 hover:underline"
                        >
                          Quitar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-tinta/10 px-6 py-6 md:px-8">
                  <p className="text-sm">
                    {progreso >= 1 ? (
                      <span className="font-semibold">Tienes envío gratis.</span>
                    ) : (
                      <>
                        Te faltan <span className="font-semibold">{formatCOP(faltante)}</span> para envío gratis.
                      </>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-hueso" aria-hidden="true">
                    <div
                      className="h-full rounded-pill bg-ambar transition-[width] duration-700 ease-waffy"
                      style={{ width: `${progreso * 100}%` }}
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <span className="text-grafito">Subtotal</span>
                    <span className="text-xl font-semibold">{formatCOP(subtotal)}</span>
                  </div>
                  <Button size="lg" className="mt-4 w-full">
                    Ir a pagar
                  </Button>
                  <p className="mt-3 text-center text-xs text-grafito">
                    PSE, Nequi, Daviplata, tarjetas y contraentrega.
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
