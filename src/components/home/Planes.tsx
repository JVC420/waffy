import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Chip";
import { Encabezado } from "@/components/ui/Encabezado";
import { IconoCheck } from "@/components/ui/Iconos";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { PLANES } from "@/data/planes";
import { cn } from "@/lib/cn";
import { Calculadora } from "./Calculadora";

export function Planes() {
  return (
    <section id="planes" className="bg-blanco py-section">
      <div className="contenedor">
        <Encabezado
          eyebrow="Suscripción"
          titulo="Que nunca falte el plato."
          texto="Elige el ritmo, nosotros calculamos la ración y la llevamos antes de que se acabe. Pausa o cancela cuando quieras."
          centrado
          className="mx-auto"
        />

        <Reveal as="ul" amount={0.2} className="mt-14 grid gap-4 md:grid-cols-3">
          {PLANES.map((plan) => (
            <RevealItem as="li" key={plan.id} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col gap-6 rounded-card-lg p-8",
                  plan.destacado ? "bg-tinta text-blanco" : "bg-hueso text-tinta",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className={cn("eyebrow", plan.destacado ? "text-blanco/70" : "text-grafito")}>{plan.frecuencia}</p>
                  {plan.destacado && <Badge tono="ambar">Más elegido</Badge>}
                </div>
                <div>
                  <h3 className="font-display text-h3 font-bold">{plan.nombre}</h3>
                  <p className="mt-3 font-display text-[3.25rem] font-bold leading-none">
                    <span className={plan.destacado ? "text-ambar" : "text-coral"}>−{plan.ahorro}</span>
                    <span className="text-2xl"> %</span>
                  </p>
                </div>
                <p className={cn("text-sm text-pretty", plan.destacado ? "text-blanco/80" : "text-grafito")}>{plan.resumen}</p>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {plan.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                          plan.destacado ? "bg-ambar text-tinta" : "bg-blanco text-tinta",
                        )}
                      >
                        <IconoCheck size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Button href="/suscripcion" variant={plan.destacado ? "coral" : "tinta"} className="mt-auto">
                  Elegir {plan.nombre.toLowerCase()}
                </Button>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-6">
          <Calculadora />
        </div>
      </div>
    </section>
  );
}
