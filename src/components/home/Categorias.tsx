import { Button, Flecha } from "@/components/ui/Button";
import { Encabezado } from "@/components/ui/Encabezado";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { CATEGORIAS } from "@/data/categorias";
import { conteoPorEspecie } from "@/data/productos";
import { VIDEO_CATEGORIA } from "@/data/videos";
import { disponibilidadVideo } from "@/lib/videos";
import { cn } from "@/lib/cn";
import { CategoriaCard } from "./CategoriaCard";

export function Categorias() {
  return (
    <section id="categorias" className="bg-blanco py-section">
      <div className="contenedor">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Encabezado
            eyebrow="Para cada especie"
            titulo="¿Para quién es hoy?"
            texto="Alimento, accesorios e higiene organizados como piensas tú: por quien vive en tu casa."
          />
          <Button href="/productos" variant="fantasma" className="shrink-0">
            Ver todos los productos <Flecha />
          </Button>
        </div>

        <Reveal
          as="ul"
          amount={0.15}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        >
          {CATEGORIAS.map((c) => {
            const video = VIDEO_CATEGORIA(c.slug);
            return (
              <RevealItem
                as="li"
                key={c.slug}
                className={cn(c.grande && "sm:col-span-2 lg:row-span-2")}
              >
                <CategoriaCard
                  categoria={c}
                  conteo={conteoPorEspecie(c.slug)}
                  video={video}
                  disponible={disponibilidadVideo(video)}
                />
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
