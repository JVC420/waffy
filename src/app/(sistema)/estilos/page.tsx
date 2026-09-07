import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button, Flecha } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Chip";
import { CategoryCard, MarcoFoto, ProductCard, TestimonialCard } from "@/components/ui/Card";
import { PildoraCoral } from "@/components/ui/PildoraCoral";
import { TrazoOrganico } from "@/components/ui/TrazoOrganico";
import { FormaOrganica } from "@/components/ui/FormaOrganica";
import { Swatch, type TokenColor } from "@/components/estilos/Swatch";
import { ChipsDemo } from "@/components/estilos/ChipsDemo";
import { MotionDemo } from "@/components/estilos/MotionDemo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false },
};

const PALETA: Array<{ nombre: string; token: TokenColor; hex: string; uso: string; span?: string }> = [
  { nombre: "Coral", token: "coral", hex: "#E95154", uso: "Primario. Bloques, CTA principal, titulares sobre fondo claro.", span: "col-span-2" },
  { nombre: "Ámbar", token: "ambar", hex: "#FBAA35", uso: "Secundario. Wordmark, acentos, subrayados, elementos gráficos." },
  { nombre: "Amarillo", token: "amarillo", hex: "#FFC400", uso: "Acento saturado. Solo fondos de sección puntuales." },
  { nombre: "Hueso", token: "hueso", hex: "#EDE9E5", uso: "Fondo cálido por defecto." },
  { nombre: "Blanco", token: "blanco", hex: "#FFFFFF", uso: "Fondo alterno y logo en negativo." },
  { nombre: "Tinta", token: "tinta", hex: "#1A1A1A", uso: "Texto principal." },
  { nombre: "Grafito", token: "grafito", hex: "#4A4A4A", uso: "Texto secundario." },
];

const TINTAS: Array<{ nombre: string; token: TokenColor; hex: string; uso: string }> = [
  { nombre: "Coral suave", token: "coral-suave", hex: "#F08B8D", uso: "Manchas orgánicas sobre coral." },
  { nombre: "Coral claro", token: "coral-claro", hex: "#FBE2E2", uso: "Anillos y fondos muy suaves." },
  { nombre: "Ámbar suave", token: "ambar-suave", hex: "#FCC678", uso: "Racimos de puntos, detalles." },
  { nombre: "Ámbar claro", token: "ambar-claro", hex: "#FEF1DD", uso: "Fondo cálido alterno." },
];

function Seccion({
  num,
  titulo,
  descripcion,
  children,
  id,
  ancho = false,
}: {
  num: string;
  titulo: string;
  descripcion?: string;
  children: ReactNode;
  id: string;
  /** Sin columna lateral: el contenido ocupa todo el ancho. */
  ancho?: boolean;
}) {
  return (
    <section id={id} className="border-t border-tinta/10">
      <div className={cn("contenedor py-section", !ancho && "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 xl:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]")}>
        <header className={cn(ancho && "mb-12")}>
          <span className="eyebrow text-grafito">{num}</span>
          <h2 className="mt-4 font-display text-h2 font-bold">{titulo}</h2>
          {descripcion && (
            <p className="mt-5 max-w-sm text-grafito text-pretty">{descripcion}</p>
          )}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Etiqueta({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3 text-grafito">{children}</p>;
}

export default function EstilosPage() {
  return (
    <>
      {/* Barra superior mínima */}
      <header className="contenedor flex items-center justify-between py-4">
        <Logo height={44} />
        <div className="flex items-center gap-5">
          <span className="eyebrow hidden text-grafito sm:block">Sistema de diseño · v0.1</span>
          <Button href="/" variant="fantasma" size="sm">
            Ir al sitio
          </Button>
        </div>
      </header>

      <main>
        {/* Portada */}
        <section className="contenedor pb-section pt-12 md:pt-20">
          <p className="eyebrow text-grafito">waffy.com.co</p>
          <h1 className="mt-6 max-w-[15ch] font-display text-h1 font-bold text-balance">
            Cálido, redondo y con carácter.
          </h1>
          <p className="mt-8 max-w-xl text-lead text-grafito text-pretty">
            La exclusividad no viene de la paleta sino de la ejecución: espacio generoso,
            tipografía enorme, fotografía editorial y transiciones impecables. Cero clichés
            de petshop.
          </p>
          <nav aria-label="Secciones" className="mt-12 flex flex-wrap gap-2">
            {[
              ["identidad", "Identidad"],
              ["paleta", "Paleta"],
              ["tipografia", "Tipografía"],
              ["botones", "Botones"],
              ["chips", "Chips"],
              ["tarjetas", "Tarjetas"],
              ["graficos", "Elementos gráficos"],
              ["movimiento", "Movimiento"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="chip">
                {label}
              </a>
            ))}
          </nav>
        </section>

        {/* 00 Identidad */}
        <Seccion
          id="identidad"
          num="00 · Identidad"
          titulo="Logo"
          descripcion="Imagotipo vertical: la W con cara de perro arriba y el wordmark en ámbar debajo, tal como lo define el manual. Zona segura igual al ancho de una W. Sobre foto, video o fondo oscuro, solo en blanco. Isotipo solo para favicon, avatar y header compacto."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg border border-tinta/10 bg-hueso">
              <span className="rounded-2xl outline-dashed outline-1 outline-tinta/25">
                <Logo height={96} />
              </span>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg bg-blanco">
              <Logo height={96} variant="negro" />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg bg-coral">
              <Logo height={96} variant="blanco" />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg bg-tinta">
              <Logo height={96} variant="blanco" />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg bg-blanco">
              <Logo height={64} mode="isotipo" />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card-lg bg-ambar">
              <Logo height={64} mode="isotipo" variant="blanco" />
            </div>
          </div>
          <dl className="mt-8 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
            <div className="flex gap-3">
              <dt className="font-semibold text-coral">No</dt>
              <dd className="text-grafito">Estirar, rotar, sombras, glow, filtros o elementos encima.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-semibold text-tinta">Sí</dt>
              <dd className="text-grafito">object-contain, proporción fija, contraste garantizado con overlay.</dd>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <dt className="font-semibold text-grafito">Origen</dt>
              <dd className="text-grafito">
                Trazados vectoriales extraídos del PDF del manual. Inline en el sitio y como SVG en /public/brand.
              </dd>
            </div>
          </dl>
        </Seccion>

        {/* 01 Paleta */}
        <Seccion
          id="paleta"
          num="01 · Paleta"
          titulo="Color"
          descripcion="60% neutros, 30% coral, 10% ámbar. El coral es bloque de color, no fondo de página. Coral y ámbar nunca en gran superficie uno junto al otro."
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PALETA.map((c) => (
              <Swatch key={c.token} {...c} className={c.span} />
            ))}
          </div>

          <div className="mt-10">
            <Etiqueta>Tintas del manual · solo formas orgánicas y fondos suaves, nunca texto</Etiqueta>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {TINTAS.map((c) => (
                <Swatch key={c.token} {...c} className="min-h-[12rem]" />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <Etiqueta>Proporción 60 / 30 / 10</Etiqueta>
            <div className="flex h-16 overflow-hidden rounded-pill border border-tinta/10">
              <div className="flex w-[60%] items-center justify-center bg-hueso text-sm font-semibold">
                60 · neutros
              </div>
              <div className="flex w-[30%] items-center justify-center bg-coral text-sm font-semibold text-blanco">
                30 · coral
              </div>
              <div className="flex w-[10%] items-center justify-center bg-ambar text-sm font-semibold text-tinta">
                10
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 text-sm text-grafito md:grid-cols-2">
            <p>
              <span className="font-semibold text-tinta">Ámbar nunca como texto</span> sobre
              hueso o blanco: no alcanza AA. Solo como acento, subrayado o fondo con tinta encima.
            </p>
            <p>
              <span className="font-semibold text-tinta">Coral como titular</span> va sobre
              blanco. Sobre hueso queda por debajo de 3:1; ahí el titular va en tinta.
            </p>
          </div>
        </Seccion>

        {/* 02 Tipografía */}
        <Seccion
          id="tipografia"
          num="02 · Tipografía"
          titulo="Escala"
          descripcion="Gluten para display: grande, con tracking negativo y line-height 0.95–1.05. Poppins para todo lo demás, 400 y 600. En títulos Poppins, negrilla solo en la primera palabra."
        >
          <div className="flex flex-col gap-12">
            <div>
              <Etiqueta>H1 · Gluten Bold · clamp(3rem → 7rem) · 0.95 · −0.02em</Etiqueta>
              <p className="font-display text-h1 font-bold text-balance">
                Porque tu mascota lo merece <strong className="font-extrabold">TODO</strong>.
              </p>
            </div>
            <div>
              <Etiqueta>H2 · Gluten Bold · clamp(2.25rem → 4.5rem) · 1</Etiqueta>
              <p className="font-display text-h2 font-bold text-balance">
                Comida real, sin subproductos.
              </p>
            </div>
            <div>
              <Etiqueta>H3 · Gluten Bold · clamp(1.5rem → 2.5rem) · 1.05</Etiqueta>
              <p className="font-display text-h3 font-bold">Formulado con veterinarios en Bogotá</p>
            </div>

            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <Etiqueta>Lead · Poppins 400 · 18–22px · 1.5</Etiqueta>
                <p className="text-lead text-pretty">
                  Recetas con proteína real como primer ingrediente, sin colorantes ni
                  saborizantes artificiales. Llega a tu puerta en menos de 24 horas.
                </p>
              </div>
              <div>
                <Etiqueta>Cuerpo · Poppins 400 · 16px · 1.6</Etiqueta>
                <p className="leading-relaxed text-grafito text-pretty">
                  Cada lote se prueba en laboratorio antes de salir de la planta en Tocancipá.
                  Publicamos el análisis garantizado de cada receta para que sepas exactamente
                  qué hay en el plato. Si a tu mascota no le gusta, te devolvemos el dinero.
                </p>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <Etiqueta>Título Poppins · negrilla en la primera palabra</Etiqueta>
                <p className="text-xl leading-snug">
                  <strong className="font-semibold">Domicilio</strong> en 24 horas en Bogotá,
                  Medellín y Cali.
                </p>
              </div>
              <div>
                <Etiqueta>Eyebrow · Poppins 600 · 12px · +0.14em</Etiqueta>
                <p className="eyebrow">Nueva línea · Gatos</p>
                <p className="mt-3">
                  <span className="badge badge-ambar">Formulado con veterinarios</span>
                </p>
                <p className="mt-2 text-xs text-grafito">
                  Coral nunca en texto pequeño: no llega a AA sobre claros.
                </p>
              </div>
              <div>
                <Etiqueta>Precio · Poppins 600</Etiqueta>
                <p className="flex items-baseline gap-3">
                  <span className="text-2xl font-semibold">$189.000</span>
                  <span className="text-grafito">7 kg</span>
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card min-w-0 p-8 [overflow-wrap:anywhere]">
                <Etiqueta>Gluten · variable · display</Etiqueta>
                <p className="font-display text-[2.75rem] font-bold leading-none tracking-tight">
                  AaBbCc
                </p>
                <p className="mt-4 break-words font-display text-lg leading-snug text-grafito">
                  ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz 0123456789
                </p>
              </div>
              <div className="card min-w-0 p-8 [overflow-wrap:anywhere]">
                <Etiqueta>Poppins · 400 / 600 · cuerpo y UI</Etiqueta>
                <p className="text-[2.75rem] font-semibold leading-none tracking-tight">AaBbCc</p>
                <p className="mt-4 break-words text-lg leading-snug text-grafito">
                  ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz 0123456789
                </p>
              </div>
            </div>
          </div>
        </Seccion>

        {/* 03 Botones */}
        <Seccion
          id="botones"
          num="03 · Botones"
          titulo="Píldoras"
          descripcion="Radio 9999px, Poppins 600, altura 40 / 48 / 56. Coral solo para el CTA principal; el resto en tinta o fantasma."
        >
          <div className="flex flex-col gap-10">
            <div>
              <Etiqueta>Variantes</Etiqueta>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Comprar ahora</Button>
                <Button variant="tinta">Ver productos</Button>
                <Button variant="fantasma">Conocer más</Button>
                <Button variant="blanco">Añadir</Button>
                <Button variant="ambar">Suscribirme</Button>
                <Button disabled>Agotado</Button>
              </div>
            </div>

            <div>
              <Etiqueta>Tamaños e iconos</Etiqueta>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Pequeño</Button>
                <Button size="md">Mediano</Button>
                <Button size="lg">
                  Grande <Flecha />
                </Button>
                <Button variant="tinta" icono aria-label="Siguiente">
                  <Flecha />
                </Button>
                <Button variant="fantasma" icono size="sm" aria-label="Añadir">
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <Etiqueta>Sobre coral (hero, píldora de propósito)</Etiqueta>
              <div className="flex flex-wrap items-center gap-3 rounded-card-lg bg-coral p-8">
                <Button variant="blanco" size="lg">
                  Comprar ahora
                </Button>
                <Button variant="fantasma-blanco" size="lg">
                  Ver el video
                </Button>
              </div>
            </div>

            <div>
              <Etiqueta>Sobre tinta (video, footer)</Etiqueta>
              <div className="flex flex-wrap items-center gap-3 rounded-card-lg bg-tinta p-8">
                <Button size="lg">Comprar ahora</Button>
                <Button variant="fantasma-blanco" size="lg">
                  Ver el video
                </Button>
              </div>
            </div>
          </div>
        </Seccion>

        {/* 04 Chips */}
        <Seccion
          id="chips"
          num="04 · Chips y badges"
          titulo="Filtros"
          descripcion="Chips de filtro con estado aria-pressed. Activo en tinta, nunca en coral: el coral se reserva para la acción principal. Badges píldora pequeñas y silenciosas, nada de etiquetas tipo mercado."
        >
          <div className="flex flex-col gap-12">
            <ChipsDemo />
            <div>
              <Etiqueta>Badges</Etiqueta>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Nuevo</Badge>
                <Badge tono="hueso">Más vendido</Badge>
                <Badge tono="blanco">Sin granos</Badge>
                <Badge tono="tinta">Cachorro</Badge>
                <Badge tono="coral">Ahorra 15%</Badge>
              </div>
            </div>
          </div>
        </Seccion>

        {/* 05 Tarjetas */}
        <Seccion
          id="tarjetas"
          num="05 · Contenedores"
          titulo="Tarjetas"
          descripcion="Radio 24px en tarjetas, 40px en contenedores grandes. Fondo blanco sobre hueso, sin bordes ni sombras. Al pasar el cursor, levitan 4px con una sombra muy difusa."
        >
          <div className="flex flex-col gap-12">
            <div>
              <Etiqueta>Producto</Etiqueta>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ProductCard
                  nombre="Receta Salmón & Quinua para Adultos"
                  linea="Alimento · Perro"
                  gramaje="7 kg"
                  precio={189000}
                  badge={{ texto: "Más vendido", tono: "hueso" }}
                />
                <ProductCard
                  nombre="Pollo de Campo para Gatos Esterilizados"
                  linea="Alimento · Gato"
                  gramaje="3 kg"
                  precio={98000}
                  badge={{ texto: "Nuevo" }}
                  tono="ambar"
                />
                <ProductCard
                  nombre="Shampoo de Avena y Caléndula"
                  linea="Higiene"
                  gramaje="500 ml"
                  precio={54000}
                  tono="coral"
                />
              </div>
            </div>

            <div>
              <Etiqueta>Categoría · fondo plano rotando coral / ámbar / hueso</Etiqueta>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <CategoryCard nombre="Perro" conteo="24 productos" tono="coral" />
                <CategoryCard nombre="Gato" conteo="18 productos" tono="ambar" />
                <CategoryCard nombre="Aves" conteo="9 productos" tono="hueso" />
                <CategoryCard nombre="Peces" conteo="7 productos" tono="coral" />
                <CategoryCard nombre="Exóticos" conteo="6 productos" tono="ambar" />
              </div>
            </div>

            <div>
              <Etiqueta>Testimonio</Etiqueta>
              <div className="grid gap-4 md:grid-cols-2">
                <TestimonialCard
                  cita="Bruno dejó de rascarse a las dos semanas. No vuelvo a otra marca."
                  nombre="Laura Mejía"
                  ciudad="Medellín"
                  mascota="Bruno, golden retriever"
                />
                <TestimonialCard
                  cita="El pedido llegó el mismo día. Y a Mía le encantó desde el primer plato."
                  nombre="Andrés Cárdenas"
                  ciudad="Bogotá"
                  mascota="Mía, gata criolla"
                />
              </div>
            </div>
          </div>
        </Seccion>

        {/* 06 Elementos gráficos */}
        <section id="graficos" className="border-t border-tinta/10">
          <div className="contenedor pt-section">
            <span className="eyebrow text-grafito">06 · Elementos gráficos</span>
            <h2 className="mt-4 font-display text-h2 font-bold">Gestos de marca</h2>
            <p className="mt-5 max-w-lg text-grafito text-pretty">
              Las formas orgánicas de la portada del manual, la píldora coral sangrada desde el
              borde izquierdo, los trazos ámbar en pares y el recorte de foto sobre color plano.
              Son los elementos que hacen que una pieza se sienta Waffy.
            </p>
          </div>

          <div className="contenedor pt-16 md:pt-20">
            <Etiqueta>Formas orgánicas del manual · mancha, anillos y puntos</Etiqueta>
            <div className="relative isolate aspect-[16/9] overflow-hidden rounded-card-lg bg-coral">
              <FormaOrganica forma="anillosClaros" className="absolute -left-[3%] -top-[13%] w-[28%]" />
              <FormaOrganica forma="mancha" className="absolute -left-[12%] top-[40%] w-[78%]" />
              <FormaOrganica forma="puntos" className="absolute left-[10%] top-[32%] w-[13%]" />
              <FormaOrganica forma="anillos" className="absolute left-[84%] top-[39%] w-[23%]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Logo variant="blanco" height={168} className="max-md:scale-50" />
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              {(
                [
                  ["mancha", "Mancha · coral suave", "bg-coral"],
                  ["anillos", "Anillos · ámbar", "bg-hueso"],
                  ["anillosClaros", "Anillos · coral claro", "bg-coral"],
                  ["puntos", "Puntos · ámbar suave", "bg-blanco"],
                ] as const
              ).map(([forma, nombre, fondo]) => (
                <div key={forma} className={cn("flex aspect-square flex-col justify-between overflow-hidden rounded-card p-5", fondo, fondo === "bg-coral" ? "text-blanco" : "text-tinta", fondo === "bg-hueso" && "ring-1 ring-inset ring-tinta/10")}>
                  <span className="eyebrow opacity-80">{nombre}</span>
                  <FormaOrganica forma={forma} className="mx-auto max-h-[55%] w-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-16 md:pt-20">
            <Etiqueta>
              <span className="contenedor block">Contenedor píldora coral</span>
            </Etiqueta>
            <PildoraCoral>
              <p className="eyebrow text-blanco/80">Manifiesto</p>
              <h3 className="mt-6 max-w-[14ch] font-display text-h2 font-bold text-balance">
                Lo que comen, lo que sienten, lo que son.
              </h3>
              <p className="mt-6 max-w-lg text-lead text-pretty">
                Creemos que cuidar bien a una mascota es un acto de amor cotidiano. Por eso
                hacemos comida que se nota en el pelo, en la energía y en las ganas de jugar.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button variant="blanco" size="lg">
                  Conocer Waffy
                </Button>
                <Button variant="fantasma-blanco" size="lg">
                  Ver ingredientes
                </Button>
              </div>
            </PildoraCoral>
          </div>

          <div className="contenedor pb-section pt-16 md:pt-20">
            <Etiqueta>Trazos orgánicos ámbar + recorte de foto sobre color plano</Etiqueta>
            <div className="flex items-center justify-center gap-4 md:gap-10">
              <TrazoOrganico lado="izquierda" className="shrink-0" />
              <div className="w-full min-w-0 max-w-md">
                <MarcoFoto tono="ambar" aspect="4/5" etiqueta="Foto de mascota recortada" className="rounded-card-lg" />
              </div>
              <TrazoOrganico lado="derecha" delay={0.2} className="shrink-0" />
            </div>
          </div>
        </section>

        {/* 07 Movimiento */}
        <Seccion
          id="movimiento"
          num="07 · Movimiento"
          titulo="Ritmo"
          descripcion="Un solo easing en todo el sitio. Entradas escalonadas, desplazamientos cortos, y un rebote muy sutil solo donde la marca puede jugar."
          ancho
        >
          <MotionDemo />
        </Seccion>
      </main>

      <footer className="border-t border-tinta/10">
        <div className="contenedor flex flex-col gap-4 py-10 text-sm text-grafito sm:flex-row sm:items-center sm:justify-between">
          <Logo height={22} variant="negro" />
          <p>Sistema de diseño v0.1 · tokens en src/app/globals.css</p>
        </div>
      </footer>
    </>
  );
}
