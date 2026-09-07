"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { IconoCarrito, IconoMenu } from "@/components/ui/Iconos";
import { NAV_PRINCIPAL } from "@/data/navegacion";
import { cn } from "@/lib/cn";
import { useUi } from "./UiProvider";
import { MenuMovil } from "./MenuMovil";

const UMBRAL = 40;

/**
 * Header fijo en coral (decisión del cliente): logo y navegación en blanco.
 * Al hacer scroll se compacta y muestra solo el isotipo, como pide el manual.
 */
export function Header() {
  const pathname = usePathname();
  const [compacto, setCompacto] = useState(false);
  const { scrollY } = useScroll();
  const { abrirCarrito, abrirMenu, totalUnidades } = useUi();

  useMotionValueEvent(scrollY, "change", (y) => setCompacto(y > UMBRAL));
  useEffect(() => {
    setCompacto(window.scrollY > UMBRAL);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-coral text-blanco transition-shadow duration-500 ease-waffy",
          compacto && "shadow-[0_12px_32px_-20px_rgb(26_26_26/0.45)]",
        )}
      >
        <div
          className={cn(
            "contenedor flex items-center justify-between transition-[height] duration-500 ease-waffy",
            compacto ? "h-16 md:h-[4.5rem]" : "h-20 md:h-24",
          )}
        >
          {/* Logo: completo arriba, isotipo al compactar. Solo opacidad: nunca se deforma. */}
          <Link
            href="/"
            aria-label="Waffy, ir al inicio"
            className="grid items-center [&>*]:col-start-1 [&>*]:row-start-1"
          >
            <span
              aria-hidden={compacto}
              className={cn(
                "transition-opacity duration-500 ease-waffy",
                compacto ? "pointer-events-none opacity-0" : "opacity-100",
              )}
            >
              <Logo mode="completo" variant="blanco" height={52} safeZone={false} className="md:hidden" />
              <Logo mode="completo" variant="blanco" height={64} safeZone={false} className="max-md:hidden" />
            </span>
            <span
              aria-hidden={!compacto}
              className={cn(
                "transition-opacity duration-500 ease-waffy",
                compacto ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Logo mode="isotipo" variant="blanco" height={30} safeZone={false} />
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            {NAV_PRINCIPAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link"
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/productos" variant="blanco" size="sm" className="hidden md:inline-flex">
              Comprar
            </Button>
            <button
              type="button"
              onClick={abrirCarrito}
              aria-label={`Abrir carrito, ${totalUnidades} ${totalUnidades === 1 ? "producto" : "productos"}`}
              className="btn btn-icono btn-sm btn-fantasma-blanco relative"
            >
              <IconoCarrito />
              {totalUnidades > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-pill bg-ambar px-1 text-[0.6875rem] font-semibold text-tinta">
                  {totalUnidades}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={abrirMenu}
              aria-label="Abrir menú"
              className="btn btn-icono btn-sm btn-fantasma-blanco md:hidden"
            >
              <IconoMenu />
            </button>
          </div>
        </div>
      </header>
      <MenuMovil />
    </>
  );
}
