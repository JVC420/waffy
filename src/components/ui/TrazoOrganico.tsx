"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Trazos orgánicos ámbar tipo pincelada. Van en pares flanqueando fotos de
 * mascotas. Se dibujan con pathLength al entrar en viewport.
 */
export function TrazoOrganico({
  lado = "izquierda",
  className,
  delay = 0,
  color = "var(--color-ambar)",
}: {
  lado?: "izquierda" | "derecha";
  className?: string;
  delay?: number;
  color?: string;
}) {
  const reducido = useReducedMotion();
  const espejo = lado === "derecha";

  const trazos = [
    "M24 12 C 70 58, 8 128, 52 188",
    "M58 26 C 104 76, 40 146, 92 196",
  ];

  return (
    <svg
      viewBox="0 0 120 210"
      className={cn("h-auto w-[clamp(3rem,8vw,7.5rem)]", className)}
      style={{ transform: espejo ? "scaleX(-1)" : undefined }}
      fill="none"
      aria-hidden="true"
    >
      {trazos.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          initial={reducido ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            pathLength: { duration: 1.1, ease: EASE, delay: delay + i * 0.12 },
            opacity: { duration: 0.2, delay: delay + i * 0.12 },
          }}
        />
      ))}
    </svg>
  );
}
