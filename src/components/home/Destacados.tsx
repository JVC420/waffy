import Link from "next/link";
import { BotonAgregar } from "@/components/cart/BotonAgregar";
import { Button, Flecha } from "@/components/ui/Button";
import { MarcoFoto, tonoCarrito } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Chip";
import { Encabezado } from "@/components/ui/Encabezado";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { lineaCorta, presentacionPrincipal, productosDestacados, type Producto } from "@/data/productos";
import { formatCOP } from "@/lib/format";
import { cn } from "@/lib/cn";

function ProductoDestacado({ producto: p }: { producto: Producto }) {
  const pres = presentacionPrincipal(p);
  return (
    <article className="card card-hover group flex h-full flex-col p-3">
      <Link href={`/producto/${p.slug}`} aria-label={p.nombre} className="relative block">
        <MarcoFoto tono={p.tono} aspect="4/5" etiqueta="Foto producto" />
        {p.badge && (
          <Badge tono={p.badge.tono ?? "ambar"} className="pointer-events-none absolute left-4 top-4">
            {p.badge.texto}
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-5">
        <span className="eyebrow text-grafito">{lineaCorta(p)}</span>
        <h3 className="text-xl font-semibold leading-snug">
          <Link href={`/producto/${p.slug}`}>{p.nombre}</Link>
        </h3>
        <p className="text-sm text-grafito text-pretty">{p.descripcion}</p>
        <ul className="mt-1 flex flex-wrap gap-2" aria-label="Presentaciones">
          {p.presentaciones.map((x) => (
            <li key={x.etiqueta} className={cn("badge", x === pres ? "badge-tinta" : "badge-hueso")}>
              {x.etiqueta}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="flex flex-col">
            <span className="text-lg font-semibold">{formatCOP(pres.precio)}</span>
            <span className="text-xs text-grafito">{pres.etiqueta}</span>
          </p>
          <BotonAgregar
            compacto
            variant="tinta"
            producto={{
              id: `${p.slug}-${pres.etiqueta}`,
              nombre: p.nombre,
              gramaje: pres.etiqueta,
              precio: pres.precio,
              tono: tonoCarrito(p.tono),
            }}
          />
        </div>
      </div>
    </article>
  );
}

export function Destacados() {
  const productos = productosDestacados();
  return (
    <section id="destacados" className="bg-blanco py-section">
      <div className="contenedor flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Encabezado
          eyebrow="Los tres de siempre"
          titulo="Lo que más se repite en los pedidos."
          texto="Dos recetas y una cama. Lo que la gente vuelve a pedir sin pensarlo."
        />
        <Button href="/productos" variant="fantasma" className="shrink-0">
          Ver la tienda <Flecha />
        </Button>
      </div>

      <Reveal
        as="ul"
        amount={0.1}
        className="carrusel sangria-contenedor mt-12 pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible"
      >
        {productos.map((p) => (
          <RevealItem as="li" key={p.slug} className="w-[78vw] sm:w-[22rem] md:w-auto">
            <ProductoDestacado producto={p} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
