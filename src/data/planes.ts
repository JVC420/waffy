export type Plan = {
  id: "mensual" | "bimestral" | "personalizado";
  nombre: string;
  frecuencia: string;
  ahorro: number;
  resumen: string;
  beneficios: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    id: "mensual",
    nombre: "Mensual",
    frecuencia: "Cada 30 días",
    ahorro: 10,
    resumen: "La bolsa que ya compras, sin tener que acordarte.",
    beneficios: ["10 % de ahorro en cada entrega", "Envío gratis siempre", "Pausa o cancela cuando quieras"],
  },
  {
    id: "bimestral",
    nombre: "Bimestral",
    frecuencia: "Cada 60 días",
    ahorro: 15,
    resumen: "Para bolsas grandes y hogares con más de una mascota.",
    beneficios: ["15 % de ahorro en cada entrega", "Envío gratis siempre", "Snack de regalo en cada caja", "Pausa o cancela cuando quieras"],
    destacado: true,
  },
  {
    id: "personalizado",
    nombre: "Personalizado",
    frecuencia: "Tú eliges el ritmo",
    ahorro: 20,
    resumen: "Calculamos la ración y ajustamos la frecuencia al peso real de tu mascota.",
    beneficios: ["Hasta 20 % de ahorro", "Ración calculada con veterinario", "Cambia de receta sin costo", "Recordatorio antes de cada envío"],
  },
];

/* ───────── Calculadora de ración (cálculo local, aproximado) ───────── */

export type EspecieCalculadora = "perro" | "gato";

/** g/día ≈ k · kg^0.75 con croqueta de ~3,6 kcal/g. Valores orientativos. */
const FACTOR: Record<EspecieCalculadora, number> = { perro: 26.5, gato: 19.5 };

/** Precio por kilo de referencia (bolsa de 7 kg de la receta estrella). */
export const PRECIO_KG: Record<EspecieCalculadora, number> = { perro: 27000, gato: 32600 };

export const RANGO_PESO: Record<EspecieCalculadora, { min: number; max: number; inicial: number }> = {
  perro: { min: 1, max: 60, inicial: 12 },
  gato: { min: 1, max: 12, inicial: 4 },
};

export const BOLSAS_KG = [3, 7, 15];

export type Racion = {
  gramosDia: number;
  kgMes: number;
  bolsaKg: number;
  bolsasMes: number;
  costoMes: number;
};

export function calcularRacion(especie: EspecieCalculadora, pesoKg: number): Racion {
  const gramosDia = Math.round(FACTOR[especie] * Math.pow(Math.max(0.5, pesoKg), 0.75));
  const kgMes = Math.round((gramosDia * 30) / 100) / 10;
  const bolsaKg = BOLSAS_KG.find((b) => b >= kgMes) ?? 15;
  const bolsasMes = Math.max(1, Math.ceil(kgMes / bolsaKg));
  const costoMes = Math.round((kgMes * PRECIO_KG[especie]) / 1000) * 1000;
  return { gramosDia, kgMes, bolsaKg, bolsasMes, costoMes };
}

export const conAhorro = (valor: number, ahorro: number) => Math.round((valor * (100 - ahorro)) / 100 / 1000) * 1000;
