export type Testimonio = {
  id: string;
  nombre: string;
  ciudad: string;
  mascota: string;
  cita: string;
  /** Color plano del retrato mientras no hay foto. */
  tono: "coral" | "ambar" | "hueso" | "ambar-claro" | "coral-claro";
};

export const TESTIMONIOS: Testimonio[] = [
  {
    id: "laura-medellin",
    nombre: "Laura Mejía",
    ciudad: "Medellín",
    mascota: "Bruno, golden retriever",
    cita: "Bruno dejó de rascarse a las dos semanas. No vuelvo a otra marca.",
    tono: "ambar",
  },
  {
    id: "andres-bogota",
    nombre: "Andrés Cárdenas",
    ciudad: "Bogotá",
    mascota: "Mía, gata criolla",
    cita: "El pedido llegó el mismo día. Y a Mía le encantó desde el primer plato.",
    tono: "coral-claro",
  },
  {
    id: "valentina-cali",
    nombre: "Valentina Ríos",
    ciudad: "Cali",
    mascota: "Tomás, schnauzer",
    cita: "La suscripción me quitó una cosa de la cabeza. Llega antes de que se acabe.",
    tono: "ambar-claro",
  },
  {
    id: "camilo-barranquilla",
    nombre: "Camilo Ospina",
    ciudad: "Barranquilla",
    mascota: "Lola y Nino, periquitos",
    cita: "Se nota en las plumas. Y no hay tinte en el fondo de la jaula.",
    tono: "hueso",
  },
  {
    id: "daniela-bucaramanga",
    nombre: "Daniela Serrano",
    ciudad: "Bucaramanga",
    mascota: "Canela, conejo holandés",
    cita: "Por fin un pellet que no tiene semillas de relleno. Canela lo prefiere al heno.",
    tono: "coral",
  },
  {
    id: "santiago-pereira",
    nombre: "Santiago Botero",
    ciudad: "Pereira",
    mascota: "Simón, labrador senior",
    cita: "Con la receta senior volvió a subir las escaleras sin pensarlo.",
    tono: "ambar",
  },
];
