"use client";

import { useId, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PLANES, RANGO_PESO, calcularRacion, conAhorro, type EspecieCalculadora } from "@/data/planes";
import { formatCOP } from "@/lib/format";

/** Slider de peso → gramaje sugerido, bolsa y costo mensual con cada plan. Todo local. */
export function Calculadora() {
  const id = useId();
  const [especie, setEspecie] = useState<EspecieCalculadora>("perro");
  const [peso, setPeso] = useState(RANGO_PESO.perro.inicial);
  const rango = RANGO_PESO[especie];
  const racion = calcularRacion(especie, peso);
  const personalizado = PLANES.find((p) => p.id === "personalizado")!;
  const progreso = ((peso - rango.min) / (rango.max - rango.min)) * 100;

  const cambiarEspecie = (e: EspecieCalculadora) => {
    setEspecie(e);
    setPeso(RANGO_PESO[e].inicial);
  };

  return (
    <div className="grid gap-10 rounded-card-lg bg-hueso p-6 md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:p-14">
      <div className="flex flex-col gap-8">
        <div>
          <p className="eyebrow text-grafito">Calcula su ración</p>
          <h3 className="mt-3 font-display text-h3 font-bold">¿Cuánto come al día?</h3>
        </div>

        <div className="flex gap-2" role="group" aria-label="Especie">
          <Chip activo={especie === "perro"} onClick={() => cambiarEspecie("perro")}>
            Perro
          </Chip>
          <Chip activo={especie === "gato"} onClick={() => cambiarEspecie("gato")}>
            Gato
          </Chip>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor={id} className="font-semibold">
              Peso
            </label>
            <output htmlFor={id} className="font-display text-h3 font-bold">
              {peso} kg
            </output>
          </div>
          <input
            id={id}
            type="range"
            min={rango.min}
            max={rango.max}
            step={1}
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
            className="slider mt-4"
            style={{ "--progreso": `${progreso}%` } as React.CSSProperties}
            aria-valuetext={`${peso} kilos`}
          />
          <div className="mt-2 flex justify-between text-xs text-grafito">
            <span>{rango.min} kg</span>
            <span>{rango.max} kg</span>
          </div>
        </div>

        <p className="text-sm text-grafito text-pretty">
          Cálculo orientativo para un adulto con actividad normal. En el plan personalizado un
          veterinario ajusta la ración antes del primer envío.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card bg-blanco p-6">
            <p className="eyebrow text-grafito">Al día</p>
            <p className="mt-3 font-display text-h2 font-bold leading-none">
              {racion.gramosDia}
              <span className="ml-1 text-lg">g</span>
            </p>
          </div>
          <div className="rounded-card bg-blanco p-6">
            <p className="eyebrow text-grafito">Al mes</p>
            <p className="mt-3 font-display text-h2 font-bold leading-none">
              {racion.kgMes}
              <span className="ml-1 text-lg">kg</span>
            </p>
          </div>
        </div>

        <div className="rounded-card bg-blanco p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow text-grafito">Bolsa sugerida</p>
            <p className="font-semibold">
              {racion.bolsasMes > 1 ? `${racion.bolsasMes} × ` : ""}
              {racion.bolsaKg} kg cada mes
            </p>
          </div>
          <ul className="mt-5 divide-y divide-tinta/10 text-sm">
            <li className="flex items-center justify-between py-3">
              <span className="text-grafito">Compra suelta</span>
              <span className="font-semibold">{formatCOP(racion.costoMes)}</span>
            </li>
            {PLANES.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span className="text-grafito">
                  Plan {p.nombre.toLowerCase()}{" "}
                  <span className="badge badge-hueso ml-1">−{p.ahorro} %</span>
                </span>
                <span className="font-semibold">{formatCOP(conAhorro(racion.costoMes, p.ahorro))}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-grafito">Precios por mes, envío incluido. Referencia: receta estrella de {especie}.</p>
        </div>

        <Button href="/suscripcion" size="lg" className="w-full sm:w-auto sm:self-end">
          Empezar plan {personalizado.nombre.toLowerCase()}
        </Button>
      </div>
    </div>
  );
}
