import type { Especie } from "./productos";

export type Categoria = {
  slug: Especie;
  nombre: string;
  descripcion: string;
  /** Fondo plano de la tarjeta. Rota entre coral, ámbar y hueso. */
  tono: "coral" | "ambar" | "hueso";
  /** Ocupa el doble de espacio en la retícula. */
  grande?: boolean;
};

export const CATEGORIAS: Categoria[] = [
  { slug: "perro", nombre: "Perro", descripcion: "Alimento por edad y tamaño, accesorios y cuidado.", tono: "hueso", grande: true },
  { slug: "gato", nombre: "Gato", descripcion: "Recetas altas en proteína, arena y rascadores.", tono: "coral" },
  { slug: "aves", nombre: "Aves", descripcion: "Semillas y pellets sin colorantes.", tono: "ambar" },
  { slug: "peces", nombre: "Peces", descripcion: "Hojuelas que no enturbian el agua.", tono: "hueso" },
  { slug: "exoticos", nombre: "Exóticos", descripcion: "Conejos, cuyes, hámsters y jerbos.", tono: "hueso" },
];
