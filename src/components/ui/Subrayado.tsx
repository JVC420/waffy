"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const trazo: Variants = {
  oculto: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE, delay: 0.5 },
      opacity: { duration: 0.2, delay: 0.5 },
    },
  },
};

/**
 * Subrayado ámbar a mano alzada bajo una palabra clave. Se dibuja al entrar en
 * viewport. Es el "acento y subrayado" que el manual reserva para el ámbar.
 *
 * El observador va en el <span>: los <path> escalados con preserveAspectRatio="none"
 * no reportan intersección de forma fiable.
 */
export function Subrayado({
  children,
  className,
  color = "var(--color-ambar)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const reducido = useReducedMotion();
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial={reducido ? "visible" : "oculto"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {children}
      <svg
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.18em] w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M3 9 C 25 3, 45 12, 62 7 S 90 4, 97 8"
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          variants={trazo}
        />
      </svg>
    </motion.span>
  );
}
