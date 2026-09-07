import { Hero } from "@/components/home/Hero";
import { BarraConfianza } from "@/components/home/BarraConfianza";
import { Categorias } from "@/components/home/Categorias";
import { Proposito } from "@/components/home/Proposito";
import { Destacados } from "@/components/home/Destacados";
import { Ingredientes } from "@/components/home/Ingredientes";
import { Planes } from "@/components/home/Planes";
import { Quiz } from "@/components/home/Quiz";
import { VideoNarrativo } from "@/components/home/VideoNarrativo";
import { Testimonios } from "@/components/home/Testimonios";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BarraConfianza />
      <Categorias />
      <Proposito />
      <Destacados />
      <Ingredientes />
      <Planes />
      <Quiz />
      <VideoNarrativo />
      <Testimonios />
    </>
  );
}
