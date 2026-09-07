"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";

const ESPECIES = ["Todos", "Perro", "Gato", "Aves", "Peces", "Exóticos"];
const LINEAS = ["Alimento", "Accesorios", "Higiene"];

export function ChipsDemo() {
  const [especie, setEspecie] = useState("Todos");
  const [lineas, setLineas] = useState<string[]>(["Alimento"]);

  const toggleLinea = (l: string) =>
    setLineas((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="eyebrow mb-4 text-grafito">Selección única · especie</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Especie">
          {ESPECIES.map((e) => (
            <Chip key={e} activo={especie === e} onClick={() => setEspecie(e)}>
              {e}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-4 text-grafito">Selección múltiple · línea</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Línea">
          {LINEAS.map((l) => (
            <Chip key={l} activo={lineas.includes(l)} onClick={() => toggleLinea(l)}>
              {l}
              {lineas.includes(l) && (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              )}
            </Chip>
          ))}
        </div>
      </div>
      <p className="text-sm text-grafito">
        Filtrando <span className="font-semibold text-tinta">{especie.toLowerCase()}</span> en{" "}
        <span className="font-semibold text-tinta">
          {lineas.length ? lineas.join(", ").toLowerCase() : "ninguna línea"}
        </span>
        .
      </p>
    </div>
  );
}
