"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { IconoCerrar } from "@/components/ui/Iconos";
import { NAV_PRINCIPAL, WHATSAPP_URL } from "@/data/navegacion";
import { useUi } from "./UiProvider";
import { getLenis } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

const lista: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Menú móvil a pantalla completa sobre coral, con enlaces en Gluten. */
export function MenuMovil() {
  const { menuAbierto, cerrarMenu } = useUi();
  const pathname = usePathname();

  // Cierra al navegar.
  useEffect(() => {
    cerrarMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Bloquea el scroll y cierra con Escape.
  useEffect(() => {
    if (!menuAbierto) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cerrarMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuAbierto, cerrarMenu]);

  return (
    <AnimatePresence>
      {menuAbierto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-[60] flex flex-col bg-coral text-blanco"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="contenedor flex h-20 items-center justify-between">
            <Logo mode="isotipo" variant="blanco" height={30} safeZone={false} />
            <button
              type="button"
              onClick={cerrarMenu}
              aria-label="Cerrar menú"
              className="btn btn-icono btn-sm btn-fantasma-blanco"
              autoFocus
            >
              <IconoCerrar />
            </button>
          </div>

          <motion.nav
            aria-label="Principal"
            className="contenedor flex flex-1 flex-col justify-center gap-3"
            variants={lista}
            initial="oculto"
            animate="visible"
          >
            {NAV_PRINCIPAL.map((l) => (
              <motion.div key={l.href} variants={item}>
                <Link
                  href={l.href}
                  onClick={cerrarMenu}
                  className="font-display text-h2 font-bold leading-none"
                  aria-current={pathname === l.href ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="contenedor flex flex-col gap-4 pb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            <Button href="/productos" variant="blanco" size="lg" onClick={cerrarMenu}>
              Comprar ahora
            </Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-blanco/85"
            >
              Escríbenos por WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
