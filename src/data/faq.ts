export type Pregunta = { id: string; pregunta: string; respuesta: string };

export const FAQ: Pregunta[] = [
  {
    id: "cancelar",
    pregunta: "¿Puedo pausar o cancelar la suscripción cuando quiera?",
    respuesta:
      "Sí. Desde tu cuenta puedes pausar un envío, cambiar la fecha o cancelar sin penalidad. Si lo haces antes de las 6 p. m. del día anterior al despacho, el cambio aplica de inmediato.",
  },
  {
    id: "cambiar-receta",
    pregunta: "¿Qué pasa si mi mascota se aburre de la receta?",
    respuesta:
      "Cambias de receta sin costo en cualquier momento. Te sugerimos una transición de siete días mezclando la receta nueva con la anterior.",
  },
  {
    id: "ciudades",
    pregunta: "¿A qué ciudades llegan en 24 horas?",
    respuesta:
      "Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Pereira, Manizales y Armenia. Al resto del país llegamos en 2 a 4 días hábiles con envío gratis en suscripción.",
  },
  {
    id: "calculo",
    pregunta: "¿Cómo calculan la ración de mi mascota?",
    respuesta:
      "Con el peso, la edad y el nivel de actividad estimamos las calorías diarias y las convertimos a gramos de la receta elegida. Un veterinario revisa el plan personalizado antes del primer envío.",
  },
  {
    id: "pago",
    pregunta: "¿Cómo se cobra cada entrega?",
    respuesta:
      "Cobramos el día del despacho con el medio que elijas: PSE, Nequi, Daviplata, tarjeta débito o crédito. También puedes pagar contraentrega en las ciudades con entrega en 24 horas.",
  },
  {
    id: "garantia",
    pregunta: "¿Y si a mi mascota no le gusta?",
    respuesta:
      "Te devolvemos el dinero de la primera bolsa, sin preguntas. Escríbenos por WhatsApp con el número de pedido y listo.",
  },
  {
    id: "varias-mascotas",
    pregunta: "Tengo varias mascotas. ¿Puedo combinar recetas en un solo envío?",
    respuesta:
      "Sí. Un plan puede incluir varias recetas y accesorios; el ahorro aplica sobre todo el pedido y el envío sigue siendo gratis.",
  },
  {
    id: "empaque",
    pregunta: "¿Cómo viene empacado el alimento?",
    respuesta:
      "En bolsas con cierre hermético y válvula de desgasificación, dentro de una caja de cartón reciclado. Sin plásticos de un solo uso adicionales.",
  },
];
