"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Encabezado } from "@/components/ui/Encabezado";
import { ANALISIS_ESTRELLA, INGREDIENTES, LO_QUE_NO_LLEVA, type Ingrediente } from "@/data/ingredientes";
import { cn } from "@/lib/cn";

type Segmento = Ingrediente & { inicio: number; fraccion: number };

const SEGMENTOS: Segmento[] = (() => {
  let acumulado = 0;
  return INGREDIENTES.map((ing) => {
    const inicio = acumulado;
    const fraccion = ing.porcentaje / 100;
    acumulado += fraccion;
    return { ...ing, inicio, fraccion };
  });
})();

const MAX = Math.max(...INGREDIENTES.map((i) => i.porcentaje));
const CX = 200;
const R = 148;
const GROSOR = 46;
const HUECO = 0.006;

function Arco({ s, progreso, reducido }: { s: Segmento; progreso: MotionValue<number>; reducido: boolean }) {
  const largo = useTransform(progreso, [s.inicio, s.inicio + s.fraccion], [0, Math.max(0, s.fraccion - HUECO)]);
  return (
    <motion.circle
      cx={CX}
      cy={CX}
      r={R}
      fill="none"
      stroke={s.color}
      strokeWidth={GROSOR}
      transform={`rotate(${-90 + s.inicio * 360} ${CX} ${CX})`}
      style={{ pathLength: reducido ? s.fraccion - HUECO : largo }}
    />
  );
}

function Donut({ progreso, reducido, className }: { progreso: MotionValue<number>; reducido: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn("mx-auto h-auto w-full max-w-[26rem]", className)} role="img" aria-label="Diagrama de ingredientes de la receta Salmón & Quinua">
      <circle cx={CX} cy={CX} r={R} fill="none" stroke="var(--color-hueso)" strokeWidth={GROSOR} />
      {SEGMENTOS.map((s) => (
        <Arco key={s.id} s={s} progreso={progreso} reducido={reducido} />
      ))}
      <text x={CX} y={CX - 4} textAnchor="middle" className="font-display" fontSize={64} fontWeight={700} fill="var(--color-tinta)">
        100 %
      </text>
      <text x={CX} y={CX + 34} textAnchor="middle" className="font-sans" fontSize={17} fontWeight={600} fill="var(--color-grafito)">
        ingredientes reales
      </text>
    </svg>
  );
}

function Fila({ s, progreso, reducido }: { s: Segmento; progreso: MotionValue<number>; reducido: boolean }) {
  const fin = s.inicio + s.fraccion;
  const opacidad = useTransform(progreso, [s.inicio, fin], [0.4, 1]);
  const ancho = useTransform(progreso, [s.inicio, fin], ["0%", `${(s.porcentaje / MAX) * 100}%`]);
  return (
    <motion.li style={{ opacity: reducido ? 1 : opacidad }} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-2 py-5">
      <span className="mt-1 size-3 rounded-full" style={{ background: s.color }} aria-hidden="true" />
      <span className="font-semibold">{s.nombre}</span>
      <span className="font-display text-2xl font-bold leading-none">{s.porcentaje} %</span>
      <span className="col-start-2 text-sm text-grafito">{s.para}</span>
      <span className="col-span-2 col-start-2 mt-1 h-1.5 overflow-hidden rounded-pill bg-tinta/8" aria-hidden="true">
        <motion.span className="block h-full rounded-pill" style={{ background: s.color, width: reducido ? `${(s.porcentaje / MAX) * 100}%` : ancho }} />
      </span>
    </motion.li>
  );
}

/** "Qué hay adentro": el diagrama se arma a medida que el usuario baja por la lista. */
export function Ingredientes() {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 75%"] });

  return (
    <section id="ingredientes" className="py-section">
      <div ref={ref} className="contenedor grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="order-2 lg:order-1 lg:sticky lg:top-32 lg:self-start">
          <Donut progreso={scrollYProgress} reducido={reducido} />
          <dl className="mx-auto mt-8 grid max-w-[26rem] grid-cols-4 gap-2 text-center">
            {[
              ["Proteína", `${ANALISIS_ESTRELLA.proteina} %`],
              ["Grasa", `${ANALISIS_ESTRELLA.grasa} %`],
              ["Fibra", `${ANALISIS_ESTRELLA.fibra} %`],
              ["kcal/100 g", `${ANALISIS_ESTRELLA.kcalPor100g}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-card bg-blanco px-2 py-4">
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-wider text-grafito">{k}</dt>
                <dd className="mt-1 font-display text-xl font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <Encabezado
            eyebrow="Qué hay adentro"
            titulo="Ingredientes que reconocerías en tu cocina."
            texto="La receta estrella, Salmón & Quinua, ingrediente por ingrediente. Baja por la lista y mira cómo se arma el plato."
            coral={false}
          />
          <ol className="mt-8 divide-y divide-tinta/10 border-y border-tinta/10">
            {SEGMENTOS.map((s) => (
              <Fila key={s.id} s={s} progreso={scrollYProgress} reducido={reducido} />
            ))}
          </ol>
          <div className="mt-8">
            <p className="eyebrow text-grafito">Lo que no lleva</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {LO_QUE_NO_LLEVA.map((x) => (
                <li key={x} className="badge badge-blanco line-through decoration-coral decoration-2">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
