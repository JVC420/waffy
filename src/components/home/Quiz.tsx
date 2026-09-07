"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Flecha } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Card";
import { Encabezado } from "@/components/ui/Encabezado";
import {
  EDADES,
  ESPECIES,
  OBJETIVOS,
  lineaCorta,
  presentacionPrincipal,
  recomendar,
  type Edad,
  type Especie,
  type Objetivo,
} from "@/data/productos";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const PASOS = ["Especie", "Edad", "Peso", "Objetivo"] as const;

type Respuestas = {
  especie?: Especie;
  edad?: Edad;
  peso: number;
  objetivo?: Objetivo;
};

function Opcion({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        "flex min-h-[4.5rem] items-center justify-center rounded-card px-4 py-4 text-center font-semibold transition-[background-color,color,transform] duration-400 ease-waffy",
        activo ? "bg-tinta text-blanco" : "bg-hueso text-tinta hover:-translate-y-0.5 hover:bg-ambar-claro",
      )}
    >
      {children}
    </button>
  );
}

/** Quiz "Encuentra su alimento": cuatro pasos en estado local y una recomendación mock. */
export function Quiz() {
  const [paso, setPaso] = useState(0);
  const [r, setR] = useState<Respuestas>({ peso: 10 });
  const terminado = paso === PASOS.length;

  const puedeSeguir =
    (paso === 0 && !!r.especie) || (paso === 1 && !!r.edad) || paso === 2 || (paso === 3 && !!r.objetivo);

  const reiniciar = () => {
    setPaso(0);
    setR({ peso: 10 });
  };

  const recomendado = terminado && r.especie && r.edad && r.objetivo
    ? recomendar({ especie: r.especie, edad: r.edad, pesoKg: r.peso, objetivo: r.objetivo })
    : null;

  return (
    <section id="quiz" className="scroll-mt-24 py-section">
      <div className="contenedor grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Encabezado
            eyebrow="Encuentra su alimento"
            titulo="Cuatro preguntas y te decimos qué bolsa abrir."
            texto="Especie, edad, peso y lo que quieres mejorar. En menos de un minuto tienes la receta recomendada."
            coral={false}
          />
          <ol className="mt-8 flex flex-wrap gap-2" aria-label="Progreso">
            {PASOS.map((p, i) => (
              <li
                key={p}
                aria-current={i === paso ? "step" : undefined}
                className={cn(
                  "badge transition-colors duration-400",
                  i < paso || terminado ? "badge-ambar" : i === paso ? "badge-tinta" : "badge-hueso",
                )}
              >
                {i + 1} · {p}
              </li>
            ))}
          </ol>
        </div>

        <div className="card card-lg min-h-[26rem] p-6 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={terminado ? "resultado" : paso}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex h-full flex-col gap-8"
            >
              {!terminado && (
                <p className="font-display text-h3 font-bold text-balance">
                  {paso === 0 && "¿Para quién es?"}
                  {paso === 1 && "¿Qué edad tiene?"}
                  {paso === 2 && "¿Cuánto pesa?"}
                  {paso === 3 && "¿Qué quieres mejorar?"}
                </p>
              )}

              {paso === 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(Object.keys(ESPECIES) as Especie[]).map((e) => (
                    <Opcion key={e} activo={r.especie === e} onClick={() => setR({ ...r, especie: e })}>
                      {ESPECIES[e]}
                    </Opcion>
                  ))}
                </div>
              )}

              {paso === 1 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {(Object.keys(EDADES) as Edad[]).map((e) => (
                    <Opcion key={e} activo={r.edad === e} onClick={() => setR({ ...r, edad: e })}>
                      {EDADES[e]}
                    </Opcion>
                  ))}
                </div>
              )}

              {paso === 2 && (
                <div>
                  <p className="font-display text-h1 font-bold leading-none">
                    {r.peso}
                    <span className="text-h3"> kg</span>
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    step={1}
                    value={r.peso}
                    onChange={(e) => setR({ ...r, peso: Number(e.target.value) })}
                    className="slider mt-8"
                    style={{ "--progreso": `${((r.peso - 1) / 59) * 100}%` } as React.CSSProperties}
                    aria-label="Peso en kilos"
                    aria-valuetext={`${r.peso} kilos`}
                  />
                  <div className="mt-2 flex justify-between text-xs text-grafito">
                    <span>1 kg</span>
                    <span>60 kg</span>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(Object.keys(OBJETIVOS) as Objetivo[]).map((o) => (
                    <Opcion key={o} activo={r.objetivo === o} onClick={() => setR({ ...r, objetivo: o })}>
                      {OBJETIVOS[o]}
                    </Opcion>
                  ))}
                </div>
              )}

              {terminado && recomendado && (
                <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
                  <div>
                    <p className="eyebrow text-grafito">Nuestra recomendación</p>
                    <p className="mt-3 font-display text-h3 font-bold text-balance">
                      Para {r.especie && ESPECIES[r.especie].toLowerCase()} {r.edad && EDADES[r.edad].toLowerCase()} de {r.peso} kg
                      que busca {r.objetivo && OBJETIVOS[r.objetivo].toLowerCase()}.
                    </p>
                    <p className="mt-4 text-grafito text-pretty">{recomendado.descripcion}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={`/producto/${recomendado.slug}`}>
                        Ver ficha <Flecha />
                      </Button>
                      <Button variant="fantasma" onClick={reiniciar}>
                        Volver a empezar
                      </Button>
                    </div>
                  </div>
                  <ProductCard
                    id={`${recomendado.slug}-${presentacionPrincipal(recomendado).etiqueta}`}
                    href={`/producto/${recomendado.slug}`}
                    nombre={recomendado.nombre}
                    linea={lineaCorta(recomendado)}
                    gramaje={presentacionPrincipal(recomendado).etiqueta}
                    precio={presentacionPrincipal(recomendado).precio}
                    badge={recomendado.badge}
                    tono={recomendado.tono}
                  />
                </div>
              )}

              {!terminado && (
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <Button variant="fantasma" onClick={() => setPaso((p) => Math.max(0, p - 1))} disabled={paso === 0}>
                    Atrás
                  </Button>
                  <Button onClick={() => setPaso((p) => p + 1)} disabled={!puedeSeguir}>
                    {paso === PASOS.length - 1 ? "Ver recomendación" : "Siguiente"} <Flecha />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
