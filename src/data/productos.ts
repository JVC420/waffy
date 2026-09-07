import type { BadgeTono } from "@/components/ui/Chip";
import type { TonoFondo } from "@/components/ui/Card";

export type Especie = "perro" | "gato" | "aves" | "peces" | "exoticos";
export type Linea = "alimento" | "accesorios" | "higiene";
export type Edad = "cachorro" | "adulto" | "senior";
export type Tamano = "pequeno" | "mediano" | "grande";

export type Presentacion = {
  /** Texto que se muestra en la píldora: "7 kg", "500 ml", "Talla M". */
  etiqueta: string;
  /** Solo alimento: kilos de la bolsa, para la calculadora. */
  kg?: number;
  precio: number;
};

export type Analisis = {
  proteina: number;
  grasa: number;
  fibra: number;
  humedad: number;
  cenizas: number;
};

export type Producto = {
  slug: string;
  nombre: string;
  linea: Linea;
  especies: Especie[];
  edades: Edad[];
  tamanos: Tamano[];
  descripcion: string;
  beneficios: string[];
  ingredientes?: string[];
  analisis?: Analisis;
  presentaciones: Presentacion[];
  badge?: { texto: string; tono?: BadgeTono };
  tono: TonoFondo;
  destacado?: boolean;
  /** Objetivos que resuelve, para el quiz. */
  objetivos?: Objetivo[];
};

export type Objetivo = "pelo" | "digestion" | "peso" | "energia" | "sin-granos";

export const ESPECIES: Record<Especie, string> = {
  perro: "Perro",
  gato: "Gato",
  aves: "Aves",
  peces: "Peces",
  exoticos: "Exóticos",
};

export const LINEAS: Record<Linea, string> = {
  alimento: "Alimento",
  accesorios: "Accesorios",
  higiene: "Higiene y cuidado",
};

export const EDADES: Record<Edad, string> = {
  cachorro: "Cachorro",
  adulto: "Adulto",
  senior: "Senior",
};

export const TAMANOS: Record<Tamano, string> = {
  pequeno: "Pequeño",
  mediano: "Mediano",
  grande: "Grande",
};

export const OBJETIVOS: Record<Objetivo, string> = {
  pelo: "Pelo brillante",
  digestion: "Digestión tranquila",
  peso: "Peso ideal",
  energia: "Más energía",
  "sin-granos": "Sin granos",
};

const TODAS_EDADES: Edad[] = ["cachorro", "adulto", "senior"];
const TODOS_TAMANOS: Tamano[] = ["pequeno", "mediano", "grande"];

export const PRODUCTOS: Producto[] = [
  /* ───────── Alimento · Perro ───────── */
  {
    slug: "salmon-quinua-adulto",
    nombre: "Salmón & Quinua para Adultos",
    linea: "alimento",
    especies: ["perro"],
    edades: ["adulto"],
    tamanos: TODOS_TAMANOS,
    descripcion:
      "Salmón fresco del Pacífico como primer ingrediente, quinua andina y batata. Pelo brillante y digestión ligera en perros adultos de cualquier tamaño.",
    beneficios: ["Omega 3 y 6 para piel y pelo", "Sin subproductos ni harinas de carne", "Fibra de batata y arveja"],
    ingredientes: ["Salmón fresco (32 %)", "Quinua", "Batata", "Arveja", "Aceite de salmón", "Arándanos", "Zanahoria", "Vitaminas y minerales"],
    analisis: { proteina: 28, grasa: 15, fibra: 4, humedad: 10, cenizas: 7 },
    presentaciones: [
      { etiqueta: "3 kg", kg: 3, precio: 98000 },
      { etiqueta: "7 kg", kg: 7, precio: 189000 },
      { etiqueta: "15 kg", kg: 15, precio: 320000 },
    ],
    badge: { texto: "Más vendido", tono: "hueso" },
    tono: "hueso",
    destacado: true,
    objetivos: ["pelo", "digestion"],
  },
  {
    slug: "pollo-de-campo-cachorro",
    nombre: "Pollo de Campo para Cachorros",
    linea: "alimento",
    especies: ["perro"],
    edades: ["cachorro"],
    tamanos: TODOS_TAMANOS,
    descripcion:
      "Croqueta pequeña y blanda con pollo de campo, DHA de aceite de pescado y calcio para huesos que crecen rápido.",
    beneficios: ["DHA para el desarrollo cerebral", "Calcio y fósforo balanceados", "Croqueta fácil de masticar"],
    ingredientes: ["Pollo de campo (34 %)", "Arroz integral", "Huevo", "Aceite de pescado", "Calabaza", "Leche de cabra en polvo", "Vitaminas y minerales"],
    analisis: { proteina: 30, grasa: 18, fibra: 3, humedad: 10, cenizas: 7 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 52000 },
      { etiqueta: "3 kg", kg: 3, precio: 118000 },
      { etiqueta: "7 kg", kg: 7, precio: 235000 },
    ],
    badge: { texto: "Cachorro", tono: "tinta" },
    tono: "ambar",
    objetivos: ["energia"],
  },
  {
    slug: "cordero-batata-senior",
    nombre: "Cordero & Batata para Senior",
    linea: "alimento",
    especies: ["perro"],
    edades: ["senior"],
    tamanos: TODOS_TAMANOS,
    descripcion:
      "Menos calorías, más glucosamina. Cordero magro y batata para perros mayores que quieren seguir saliendo a caminar.",
    beneficios: ["Glucosamina y condroitina", "Bajo en grasa", "Antioxidantes de arándano"],
    ingredientes: ["Cordero (30 %)", "Batata", "Avena", "Arveja", "Aceite de linaza", "Arándanos", "Cúrcuma", "Vitaminas y minerales"],
    analisis: { proteina: 25, grasa: 11, fibra: 5, humedad: 10, cenizas: 7 },
    presentaciones: [
      { etiqueta: "3 kg", kg: 3, precio: 105000 },
      { etiqueta: "7 kg", kg: 7, precio: 199000 },
    ],
    tono: "hueso",
    objetivos: ["peso", "digestion"],
  },
  {
    slug: "pavo-arroz-razas-pequenas",
    nombre: "Pavo & Arroz Integral Razas Pequeñas",
    linea: "alimento",
    especies: ["perro"],
    edades: ["adulto"],
    tamanos: ["pequeno"],
    descripcion:
      "Croqueta mini con pavo y arroz integral, pensada para bocas pequeñas y metabolismos rápidos.",
    beneficios: ["Croqueta mini", "Alta densidad energética", "Cuidado dental con textura crujiente"],
    ingredientes: ["Pavo (33 %)", "Arroz integral", "Avena", "Aceite de pollo", "Manzana", "Espinaca", "Vitaminas y minerales"],
    analisis: { proteina: 27, grasa: 16, fibra: 3.5, humedad: 10, cenizas: 6.5 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 48000 },
      { etiqueta: "3 kg", kg: 3, precio: 112000 },
    ],
    tono: "blanco",
    objetivos: ["energia"],
  },
  {
    slug: "res-calabaza-razas-grandes",
    nombre: "Res & Calabaza Razas Grandes",
    linea: "alimento",
    especies: ["perro"],
    edades: ["adulto"],
    tamanos: ["grande"],
    descripcion:
      "Res colombiana y calabaza en una croqueta grande que obliga a masticar. Con glucosamina para articulaciones que cargan peso.",
    beneficios: ["Glucosamina natural", "Croqueta grande", "Proteína magra de res"],
    ingredientes: ["Res (31 %)", "Calabaza", "Cebada", "Arveja", "Aceite de salmón", "Zanahoria", "Vitaminas y minerales"],
    analisis: { proteina: 26, grasa: 13, fibra: 4.5, humedad: 10, cenizas: 7 },
    presentaciones: [
      { etiqueta: "7 kg", kg: 7, precio: 185000 },
      { etiqueta: "15 kg", kg: 15, precio: 310000 },
    ],
    tono: "hueso",
    objetivos: ["peso", "energia"],
  },
  {
    slug: "pato-lenteja-sin-granos",
    nombre: "Pato & Lenteja Sin Granos",
    linea: "alimento",
    especies: ["perro"],
    edades: ["adulto", "senior"],
    tamanos: TODOS_TAMANOS,
    descripcion:
      "Receta sin cereales para estómagos sensibles: pato, lenteja y garbanzo. Una sola proteína animal.",
    beneficios: ["Sin granos ni gluten", "Proteína única", "Prebióticos naturales"],
    ingredientes: ["Pato (35 %)", "Lenteja", "Garbanzo", "Aceite de coco", "Semilla de chía", "Vitaminas y minerales"],
    analisis: { proteina: 29, grasa: 14, fibra: 5, humedad: 10, cenizas: 7.5 },
    presentaciones: [
      { etiqueta: "3 kg", kg: 3, precio: 115000 },
      { etiqueta: "7 kg", kg: 7, precio: 215000 },
    ],
    badge: { texto: "Sin granos", tono: "blanco" },
    tono: "ambar",
    objetivos: ["sin-granos", "digestion"],
  },

  /* ───────── Alimento · Gato ───────── */
  {
    slug: "pollo-de-campo-gato-esterilizado",
    nombre: "Pollo de Campo para Gatos Esterilizados",
    linea: "alimento",
    especies: ["gato"],
    edades: ["adulto"],
    tamanos: TODOS_TAMANOS,
    descripcion:
      "Alta en proteína y baja en grasa para gatos esterilizados. Con arándano para el tracto urinario y fibra para el control de bolas de pelo.",
    beneficios: ["Control de peso", "Salud urinaria", "Menos bolas de pelo"],
    ingredientes: ["Pollo de campo (38 %)", "Arveja", "Batata", "Aceite de salmón", "Arándano", "Fibra de remolacha", "Taurina", "Vitaminas y minerales"],
    analisis: { proteina: 36, grasa: 11, fibra: 5, humedad: 8, cenizas: 7.5 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 45000 },
      { etiqueta: "3 kg", kg: 3, precio: 98000 },
      { etiqueta: "7 kg", kg: 7, precio: 195000 },
    ],
    badge: { texto: "Nuevo" },
    tono: "ambar",
    destacado: true,
    objetivos: ["peso", "digestion"],
  },
  {
    slug: "salmon-gato-adulto",
    nombre: "Salmón para Gatos Adultos",
    linea: "alimento",
    especies: ["gato"],
    edades: ["adulto"],
    tamanos: TODOS_TAMANOS,
    descripcion: "Salmón fresco y taurina en una croqueta crujiente que hasta los gatos exigentes terminan.",
    beneficios: ["Omega 3 para el pelo", "Taurina para el corazón", "Alta palatabilidad"],
    ingredientes: ["Salmón (36 %)", "Arveja", "Aceite de salmón", "Calabaza", "Taurina", "Vitaminas y minerales"],
    analisis: { proteina: 34, grasa: 14, fibra: 3.5, humedad: 8, cenizas: 7.5 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 49000 },
      { etiqueta: "3 kg", kg: 3, precio: 105000 },
    ],
    tono: "hueso",
    objetivos: ["pelo"],
  },
  {
    slug: "kitten-pollo-leche-de-cabra",
    nombre: "Kitten Pollo & Leche de Cabra",
    linea: "alimento",
    especies: ["gato"],
    edades: ["cachorro"],
    tamanos: TODOS_TAMANOS,
    descripcion: "Croqueta diminuta y muy nutritiva para gatitos desde el destete hasta los 12 meses.",
    beneficios: ["DHA para el desarrollo", "Croqueta diminuta", "Calcio biodisponible"],
    ingredientes: ["Pollo (40 %)", "Huevo", "Leche de cabra en polvo", "Arroz", "Aceite de pescado", "Taurina", "Vitaminas y minerales"],
    analisis: { proteina: 38, grasa: 18, fibra: 3, humedad: 8, cenizas: 7 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 52000 },
      { etiqueta: "3 kg", kg: 3, precio: 110000 },
    ],
    badge: { texto: "Kitten", tono: "tinta" },
    tono: "blanco",
    objetivos: ["energia"],
  },
  {
    slug: "atun-arroz-gato-senior",
    nombre: "Atún & Arroz para Gatos Senior",
    linea: "alimento",
    especies: ["gato"],
    edades: ["senior"],
    tamanos: TODOS_TAMANOS,
    descripcion: "Fósforo controlado y antioxidantes para riñones que llevan años trabajando.",
    beneficios: ["Fósforo controlado", "Antioxidantes", "Textura suave"],
    ingredientes: ["Atún (34 %)", "Arroz", "Aceite de salmón", "Arándano", "Taurina", "Vitaminas y minerales"],
    analisis: { proteina: 32, grasa: 12, fibra: 4, humedad: 8, cenizas: 6.5 },
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 47000 },
      { etiqueta: "3 kg", kg: 3, precio: 99000 },
    ],
    tono: "hueso",
    objetivos: ["digestion", "peso"],
  },

  /* ───────── Alimento · Aves, peces y exóticos ───────── */
  {
    slug: "mezcla-semillas-aves-pequenas",
    nombre: "Mezcla de Semillas para Aves Pequeñas",
    linea: "alimento",
    especies: ["aves"],
    edades: TODAS_EDADES,
    tamanos: ["pequeno"],
    descripcion: "Mijo, alpiste y avena con un toque de fruta deshidratada para canarios, periquitos y diamantes.",
    beneficios: ["Sin colorantes", "Semillas enteras", "Con calcio de concha de ostra"],
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 45000 },
      { etiqueta: "3 kg", kg: 3, precio: 95000 },
    ],
    tono: "hueso",
    objetivos: ["energia"],
  },
  {
    slug: "pellets-frutales-loros",
    nombre: "Pellets Frutales para Loros y Cotorras",
    linea: "alimento",
    especies: ["aves"],
    edades: TODAS_EDADES,
    tamanos: ["mediano", "grande"],
    descripcion: "Pellet extruido con mango, papaya y maíz, sin colorantes. Evita que escojan solo lo que les gusta.",
    beneficios: ["Nutrición completa", "Fruta real", "Sin colorantes"],
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 58000 },
      { etiqueta: "3 kg", kg: 3, precio: 128000 },
    ],
    tono: "ambar",
    objetivos: ["pelo", "energia"],
  },
  {
    slug: "hojuelas-tropicales-agua-dulce",
    nombre: "Hojuelas Tropicales para Peces de Agua Dulce",
    linea: "alimento",
    especies: ["peces"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Hojuelas con espirulina y krill que realzan el color y no enturbian el agua.",
    beneficios: ["Realza el color", "No enturbia el agua", "Con espirulina"],
    presentaciones: [
      { etiqueta: "250 g", precio: 45000 },
      { etiqueta: "1 kg", kg: 1, precio: 96000 },
    ],
    tono: "hueso",
    objetivos: ["pelo"],
  },
  {
    slug: "granulos-alfalfa-conejos-cuyes",
    nombre: "Gránulos de Alfalfa para Conejos y Cuyes",
    linea: "alimento",
    especies: ["exoticos"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Alfalfa y heno de timothy prensados, con vitamina C estabilizada para cuyes.",
    beneficios: ["Vitamina C estabilizada", "Alta fibra", "Desgaste dental natural"],
    presentaciones: [
      { etiqueta: "1 kg", kg: 1, precio: 46000 },
      { etiqueta: "3 kg", kg: 3, precio: 98000 },
    ],
    tono: "ambar",
    objetivos: ["digestion"],
  },
  {
    slug: "mix-hamster-jerbo",
    nombre: "Mix para Hámster y Jerbo",
    linea: "alimento",
    especies: ["exoticos"],
    edades: TODAS_EDADES,
    tamanos: ["pequeno"],
    descripcion: "Semillas, cereales inflados y guisante deshidratado en la proporción que un roedor pequeño necesita.",
    beneficios: ["Baja en grasa", "Sin azúcar añadida", "Piezas para roer"],
    presentaciones: [{ etiqueta: "1 kg", kg: 1, precio: 45000 }],
    tono: "hueso",
    objetivos: ["peso"],
  },

  /* ───────── Accesorios ───────── */
  {
    slug: "comedero-doble-ceramica",
    nombre: "Comedero Doble de Cerámica",
    linea: "accesorios",
    especies: ["perro", "gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Cerámica esmaltada hecha en Carmen de Viboral, con base antideslizante de corcho.",
    beneficios: ["Apto para lavavajillas", "Base de corcho", "Hecho en Colombia"],
    presentaciones: [{ etiqueta: "Unidad", precio: 89000 }],
    tono: "blanco",
  },
  {
    slug: "collar-cuero-vegetal",
    nombre: "Collar de Cuero Vegetal",
    linea: "accesorios",
    especies: ["perro"],
    edades: ["adulto", "senior"],
    tamanos: TODOS_TAMANOS,
    descripcion: "Cuero vegetal de cactus, herrajes de latón y placa grabable. Envejece bien.",
    beneficios: ["Cuero vegetal", "Herrajes de latón", "Placa grabable"],
    presentaciones: [
      { etiqueta: "Talla S", precio: 75000 },
      { etiqueta: "Talla M", precio: 79000 },
      { etiqueta: "Talla L", precio: 85000 },
    ],
    tono: "hueso",
  },
  {
    slug: "cama-nube-lavable",
    nombre: "Cama Nube Lavable",
    linea: "accesorios",
    especies: ["perro", "gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Relleno de fibra reciclada y funda de lino lavable. Borde alto para apoyar la cabeza.",
    beneficios: ["Funda lavable", "Fibra reciclada", "Borde alto"],
    presentaciones: [
      { etiqueta: "Mediana", precio: 220000 },
      { etiqueta: "Grande", precio: 280000 },
    ],
    badge: { texto: "Favorita", tono: "hueso" },
    tono: "ambar",
    destacado: true,
  },
  {
    slug: "rascador-torre-sisal",
    nombre: "Rascador Torre de Sisal",
    linea: "accesorios",
    especies: ["gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Torre de sisal natural con plataforma de lana. Estable, alta y sin colores estridentes.",
    beneficios: ["Sisal natural", "Base pesada", "Plataforma de lana"],
    presentaciones: [{ etiqueta: "Unidad", precio: 195000 }],
    tono: "hueso",
  },
  {
    slug: "juguete-cuerda-trenzada",
    nombre: "Juguete de Cuerda Trenzada",
    linea: "accesorios",
    especies: ["perro"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Algodón trenzado a mano, sin tintes. Limpia los dientes mientras juega.",
    beneficios: ["Algodón sin tintes", "Trenzado a mano", "Limpieza dental"],
    presentaciones: [{ etiqueta: "Unidad", precio: 45000 }],
    tono: "blanco",
  },

  /* ───────── Higiene y cuidado ───────── */
  {
    slug: "shampoo-avena-calendula",
    nombre: "Shampoo de Avena y Caléndula",
    linea: "higiene",
    especies: ["perro", "gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "pH neutro para piel de mascota, con avena coloidal y caléndula. Sin sulfatos ni fragancias sintéticas.",
    beneficios: ["Sin sulfatos", "Calma la picazón", "Fragancia natural"],
    presentaciones: [{ etiqueta: "500 ml", precio: 54000 }],
    tono: "hueso",
  },
  {
    slug: "toallitas-limpieza-sin-alcohol",
    nombre: "Toallitas de Limpieza sin Alcohol",
    linea: "higiene",
    especies: ["perro", "gato", "exoticos"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Toallitas biodegradables con aloe para patas, hocico y ojos. Sin alcohol ni parabenos.",
    beneficios: ["Biodegradables", "Con aloe", "Sin alcohol"],
    presentaciones: [{ etiqueta: "80 unidades", precio: 45000 }],
    tono: "blanco",
  },
  {
    slug: "cepillo-deslanador-suave",
    nombre: "Cepillo Deslanador Suave",
    linea: "higiene",
    especies: ["perro", "gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Púas de acero con punta redondeada y mango de madera de guayacán. Retira el pelo muerto sin irritar.",
    beneficios: ["Puntas redondeadas", "Mango de madera", "Fácil de limpiar"],
    presentaciones: [{ etiqueta: "Unidad", precio: 68000 }],
    tono: "hueso",
  },
  {
    slug: "arena-aglomerante-bentonita",
    nombre: "Arena Aglomerante de Bentonita",
    linea: "higiene",
    especies: ["gato"],
    edades: TODAS_EDADES,
    tamanos: TODOS_TAMANOS,
    descripcion: "Bentonita de grano fino, sin perfume, con carbón activado para controlar olores.",
    beneficios: ["Sin perfume", "Carbón activado", "Bajo polvo"],
    presentaciones: [{ etiqueta: "10 kg", precio: 62000 }],
    tono: "ambar",
  },
  {
    slug: "solucion-dental-en-agua",
    nombre: "Solución Dental en Agua",
    linea: "higiene",
    especies: ["perro", "gato"],
    edades: ["adulto", "senior"],
    tamanos: TODOS_TAMANOS,
    descripcion: "Unas gotas en el agua de cada día para reducir sarro y mal aliento. Sin sabor.",
    beneficios: ["Sin sabor", "Reduce el sarro", "Uso diario"],
    presentaciones: [{ etiqueta: "250 ml", precio: 58000 }],
    tono: "blanco",
  },
];

/* ───────── Helpers ───────── */

export const precioDesde = (p: Producto) => Math.min(...p.presentaciones.map((x) => x.precio));

export const presentacionPrincipal = (p: Producto) =>
  p.presentaciones.find((x) => x.kg === 7) ?? p.presentaciones[Math.floor(p.presentaciones.length / 2)];

export const productoPorSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);

export const productosDestacados = () => PRODUCTOS.filter((p) => p.destacado).slice(0, 3);

export const conteoPorEspecie = (especie: Especie) =>
  PRODUCTOS.filter((p) => p.especies.includes(especie)).length;

export const lineaCorta = (p: Producto) =>
  p.linea === "alimento"
    ? `Alimento · ${p.especies.map((e) => ESPECIES[e]).join(" y ")}`
    : LINEAS[p.linea];

/** Recomendación mock para el quiz. */
export function recomendar(opts: {
  especie: Especie;
  edad: Edad;
  pesoKg: number;
  objetivo: Objetivo;
}): Producto {
  const tamano: Tamano = opts.pesoKg < 10 ? "pequeno" : opts.pesoKg <= 25 ? "mediano" : "grande";
  const base = PRODUCTOS.filter((p) => p.linea === "alimento" && p.especies.includes(opts.especie));
  const puntuar = (p: Producto) =>
    (p.edades.includes(opts.edad) ? 4 : 0) +
    (p.tamanos.includes(tamano) ? 2 : 0) +
    (p.objetivos?.includes(opts.objetivo) ? 3 : 0) +
    (p.destacado ? 1 : 0);
  return [...base].sort((a, b) => puntuar(b) - puntuar(a))[0] ?? PRODUCTOS[0];
}
