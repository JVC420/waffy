/** Desglose de la receta estrella (Salmón & Quinua para Adultos) para "Qué hay adentro". */
export type Ingrediente = {
  id: string;
  nombre: string;
  porcentaje: number;
  para: string;
  /** Variable CSS del color en el diagrama. */
  color: string;
};

export const INGREDIENTES: Ingrediente[] = [
  { id: "salmon", nombre: "Salmón fresco", porcentaje: 32, para: "Proteína completa y omega 3 para piel y pelo.", color: "var(--color-coral)" },
  { id: "quinua", nombre: "Quinua andina", porcentaje: 18, para: "Carbohidrato de absorción lenta, sin gluten.", color: "var(--color-ambar)" },
  { id: "batata", nombre: "Batata", porcentaje: 15, para: "Fibra suave y betacaroteno.", color: "var(--color-ambar-suave)" },
  { id: "arveja", nombre: "Arveja y zanahoria", porcentaje: 14, para: "Fibra, vitaminas y textura.", color: "var(--color-coral-suave)" },
  { id: "aceite", nombre: "Aceite de salmón", porcentaje: 8, para: "Grasa buena que mantiene el pelo brillante.", color: "var(--color-amarillo)" },
  { id: "frutos", nombre: "Arándanos y cúrcuma", porcentaje: 6, para: "Antioxidantes naturales.", color: "var(--color-coral-claro)" },
  { id: "vitaminas", nombre: "Vitaminas y minerales", porcentaje: 7, para: "Lo que completa la receta: calcio, zinc, vitamina E.", color: "var(--color-grafito)" },
];

export const ANALISIS_ESTRELLA = { proteina: 28, grasa: 15, fibra: 4, humedad: 10, cenizas: 7, kcalPor100g: 365 };

export const LO_QUE_NO_LLEVA = ["Subproductos", "Harinas de carne", "Colorantes", "Saborizantes artificiales", "Soya", "Maíz"];
