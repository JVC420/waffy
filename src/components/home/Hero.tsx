import { CinematicVideo } from "@/components/media/CinematicVideo";
import { FondoMarca } from "@/components/media/FondoMarca";
import { Button, Flecha } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Subrayado } from "@/components/ui/Subrayado";
import { VIDEOS } from "@/data/videos";
import { disponibilidadVideo } from "@/lib/videos";
import { cn } from "@/lib/cn";

/**
 * Hero a pantalla completa.
 *
 * Con video (16:9 en desktop, 9:16 en móvil): imagen a sangre, overlay y texto blanco.
 * Sin video: abre en hueso con el titular en tinta y formas orgánicas muy suaves.
 * El coral queda reservado al CTA, como manda la proporción 60/30/10.
 */
export function Hero() {
  const disponible = disponibilidadVideo(VIDEOS.hero);
  const oscuro = disponible.video;

  return (
    <section
      id="inicio"
      className={cn(
        "relative isolate min-h-[100svh] overflow-hidden",
        oscuro ? "bg-tinta text-blanco" : "bg-blanco text-tinta",
      )}
    >
      <CinematicVideo
        variant="hero"
        overlay={oscuro ? "hero" : "none"}
        priority
        disponible={disponible}
        fallback={<FondoMarca tono="blanco" />}
        {...VIDEOS.hero}
      />

      <div className="contenedor relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-24">
        <Reveal amount={0.1}>
          <RevealItem as="p" className={oscuro ? "eyebrow text-blanco/85" : "badge badge-ambar"}>
            <span className="max-sm:hidden">Alimento premium&nbsp;·&nbsp;</span>Formulado con veterinarios
            <span className="max-sm:hidden">&nbsp;·&nbsp;Hecho en Colombia</span>
          </RevealItem>
          <RevealItem
            as="h1"
            className={cn(
              "mt-6 max-w-[12em] font-display text-h1 font-bold text-balance",
              !oscuro && "text-coral",
            )}
          >
            Porque tu mascota lo merece{" "}
            <strong className="font-extrabold">
              <Subrayado>TODO</Subrayado>
            </strong>
            .
          </RevealItem>
          <RevealItem
            as="p"
            className={cn("mt-7 max-w-lg text-lead text-pretty", oscuro ? "text-blanco/90" : "text-grafito")}
          >
            Recetas con proteína real como primer ingrediente, sin subproductos ni colorantes.
            En tu puerta en menos de 24 horas.
          </RevealItem>
          <RevealItem className="mt-10 flex flex-wrap gap-3">
            <Button href="/productos" size="lg">
              Comprar ahora <Flecha />
            </Button>
            <Button href="/#quiz" variant={oscuro ? "fantasma-blanco" : "fantasma"} size="lg">
              Encuentra su alimento
            </Button>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
