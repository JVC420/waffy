import { CinematicVideo } from "@/components/media/CinematicVideo";
import { FondoMarca } from "@/components/media/FondoMarca";
import { Reveal } from "@/components/ui/Reveal";
import { VIDEOS } from "@/data/videos";
import { disponibilidadVideo } from "@/lib/videos";
import { cn } from "@/lib/cn";

/** Video narrativo 21:9 (slot /videos/ingredientes.mp4). */
export function VideoNarrativo() {
  const disponible = disponibilidadVideo(VIDEOS.ingredientes);
  return (
    <section aria-label="Cómo se hace Waffy" className="bg-blanco py-section">
      <Reveal solo amount={0.2} className="contenedor">
        <CinematicVideo
          variant="inline"
          aspect="21/9"
          aspectMobile="4/5"
          overlay="inferior"
          disponible={disponible}
          fallback={<FondoMarca tono="hueso" />}
          caption="De la planta en Tocancipá a tu puerta: así se hace una bolsa de Waffy."
          {...VIDEOS.ingredientes}
        >
          <div className="pointer-events-none absolute inset-0 flex items-end p-6 md:p-12">
            <p
              className={cn(
                "max-w-md font-display text-h3 font-bold text-balance",
                disponible.video || disponible.poster ? "text-blanco" : "text-tinta",
              )}
            >
              Hecho en Colombia, con calma.
            </p>
          </div>
        </CinematicVideo>
      </Reveal>
    </section>
  );
}
