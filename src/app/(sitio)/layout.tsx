import { UiProvider } from "@/components/layout/UiProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarritoDrawer } from "@/components/layout/CarritoDrawer";
import { WhatsAppFlotante } from "@/components/layout/WhatsAppFlotante";
import { VIDEOS } from "@/data/videos";
import { disponibilidadVideo } from "@/lib/videos";

export default function SitioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // El header necesita saber desde el servidor si el hero de la Home lleva video
  // (texto blanco sobre imagen) o abre en claro (texto tinta sobre hueso).
  const heroConVideo = disponibilidadVideo(VIDEOS.hero).video;

  return (
    <UiProvider heroConVideo={heroConVideo}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-tinta focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-blanco"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <CarritoDrawer />
      <WhatsAppFlotante />
    </UiProvider>
  );
}
