"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE_WAFFY = [0.16, 1, 0.3, 1] as const;

const contenedor: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const hijo: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_WAFFY } },
};

/**
 * Entrada escalonada al entrar en viewport.
 * Envuelve varios <RevealItem /> o úsalo solo con `solo` para un único bloque.
 */
export function Reveal({
  children,
  className,
  solo = false,
  amount = 0.25,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  solo?: boolean;
  amount?: number;
  as?: "div" | "section" | "ul" | "header";
}) {
  const reducido = useReducedMotion();
  const Tag = motion[as];

  if (reducido) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      variants={solo ? hijo : contenedor}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "h1" | "h2" | "h3" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={hijo}>
      {children}
    </Tag>
  );
}
