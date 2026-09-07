/** Formato COP determinista (evita diferencias de Intl entre servidor y cliente). */
export function formatCOP(valor: number): string {
  const entero = Math.round(valor).toString();
  return "$" + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatGramaje(kg: number): string {
  return kg < 1 ? `${Math.round(kg * 1000)} g` : `${kg} kg`;
}
