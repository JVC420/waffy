"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;
const REBOTE = [0.34, 1.35, 0.64, 1] as const;

const SELLOS = [
  "Sin subproductos",
  "Formulado con veterinarios",
  "Domicilio 24 h",
  "Satisfacción garantizada",
  "Hecho en Colombia",
];

const contenedor: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const hijo: Variants = {
  oculto: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const hijoRebote: Variants = {
  oculto: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: REBOTE },
  },
};

export function MotionDemo() {
  const [clave, setClave] = useState(0);
  const reducido = useReducedMotion();

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* Curva */}
      <div className="card p-8">
        <p className="eyebrow text-grafito">Easing único</p>
        <p className="mt-2 font-semibold">cubic-bezier(0.16, 1, 0.3, 1)</p>
        <svg viewBox="-10 -10 220 220" className="mt-6 h-auto w-full max-w-[16rem]" aria-hidden="true">
          <rect x="0" y="0" width="200" height="200" rx="16" fill="var(--color-hueso)" />
          <line x1="0" y1="200" x2="32" y2="0" stroke="var(--color-ambar)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="200" y1="0" x2="60" y2="0" stroke="var(--color-ambar)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M0 200 C 32 0, 60 0, 200 0" fill="none" stroke="var(--color-tinta)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="32" cy="0" r="7" fill="var(--color-ambar)" />
          <circle cx="60" cy="0" r="7" fill="var(--color-ambar)" />
          <circle cx="0" cy="200" r="7" fill="var(--color-coral)" />
          <circle cx="200" cy="0" r="7" fill="var(--color-coral)" />
        </svg>
        <ul className="mt-6 space-y-2 text-sm text-grafito">
          <li>Desplazamiento 16–24 px, opacidad 0 → 1.</li>
          <li>Stagger 60–80 ms entre hermanos.</li>
          <li>Rebote sutil solo en contenido. Nunca en logo ni navegación.</li>
          <li>Una animación continua por viewport: el video.</li>
        </ul>
      </div>

      {/* Demo */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-grafito">Entrada escalonada · 70 ms</p>
          <Button variant="fantasma" size="sm" onClick={() => setClave((k) => k + 1)}>
            Reproducir
          </Button>
        </div>

        {reducido ? (
          <p className="text-sm text-grafito">
            Movimiento reducido activo: las entradas se muestran sin animación.
          </p>
        ) : null}

        <motion.ul
          key={`a${clave}`}
          initial={reducido ? false : "oculto"}
          animate="visible"
          variants={contenedor}
          className="flex flex-wrap gap-2"
        >
          {SELLOS.map((s) => (
            <motion.li key={s} variants={hijo} className="chip chip-activo cursor-default">
              {s}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          key={`b${clave}`}
          initial={reducido ? false : "oculto"}
          animate="visible"
          variants={contenedor}
          className="grid gap-4 sm:grid-cols-3"
        >
          {["Mensual", "Bimestral", "Personalizado"].map((p, i) => (
            <motion.div
              key={p}
              variants={i === 2 ? hijoRebote : hijo}
              className="card flex aspect-[4/3] min-w-0 flex-col justify-between overflow-hidden p-6"
            >
              <span className="eyebrow text-grafito">{i === 2 ? "Con rebote" : "Estándar"}</span>
              <span className="font-display text-2xl font-bold">{p}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
