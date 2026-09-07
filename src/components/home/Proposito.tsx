import { Button } from "@/components/ui/Button";
import { MarcoFoto } from "@/components/ui/Card";
import { PildoraCoral } from "@/components/ui/PildoraCoral";
import { Reveal } from "@/components/ui/Reveal";
import { TrazoOrganico } from "@/components/ui/TrazoOrganico";

/** Píldora coral de propósito: el gesto de marca, con la foto de mascota recortada a la derecha. */
export function Proposito() {
  return (
    <section id="proposito" className="overflow-hidden py-section">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        <Reveal solo amount={0.2}>
          <PildoraCoral>
            <p className="eyebrow text-blanco/80">Nuestro propósito</p>
            <h2 className="mt-6 max-w-[11em] font-display text-h2 font-bold text-balance">
              Lo que comen, lo que sienten, lo que son.
            </h2>
            <p className="mt-6 max-w-lg text-lead text-pretty">
              Creemos que cuidar bien a una mascota es un acto de amor cotidiano. Por eso hacemos
              comida que se nota en el pelo, en la energía y en las ganas de jugar. Y la llevamos
              hasta tu puerta.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/nosotros" variant="blanco" size="lg">
                Conocer Waffy
              </Button>
              <Button href="/#ingredientes" variant="fantasma-blanco" size="lg">
                Ver ingredientes
              </Button>
            </div>
          </PildoraCoral>
        </Reveal>

        <div className="contenedor lg:pl-0">
          <div className="flex items-center justify-center gap-3 md:gap-8">
            <TrazoOrganico lado="izquierda" className="shrink-0" />
            <div className="w-full min-w-0 max-w-sm">
              <MarcoFoto
                tono="ambar-claro"
                aspect="4/5"
                etiqueta="Foto de mascota recortada"
                className="rounded-card-lg"
              />
            </div>
            <TrazoOrganico lado="derecha" delay={0.2} className="shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
