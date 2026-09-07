export type Enlace = { label: string; href: string };

export const NAV_PRINCIPAL: Enlace[] = [
  { label: "Productos", href: "/productos" },
  { label: "Suscripción", href: "/suscripcion" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Encuentra su alimento", href: "/#quiz" },
];

export const FOOTER_COLUMNAS: Array<{ titulo: string; enlaces: Enlace[] }> = [
  {
    titulo: "Tienda",
    enlaces: [
      { label: "Perro", href: "/productos?especie=perro" },
      { label: "Gato", href: "/productos?especie=gato" },
      { label: "Aves", href: "/productos?especie=aves" },
      { label: "Peces", href: "/productos?especie=peces" },
      { label: "Exóticos", href: "/productos?especie=exoticos" },
      { label: "Accesorios", href: "/productos?linea=accesorios" },
      { label: "Higiene y cuidado", href: "/productos?linea=higiene" },
    ],
  },
  {
    titulo: "Waffy",
    enlaces: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Suscripción", href: "/suscripcion" },
      { label: "Qué hay adentro", href: "/#ingredientes" },
      { label: "Encuentra su alimento", href: "/#quiz" },
      { label: "Sistema de diseño", href: "/estilos" },
    ],
  },
  {
    titulo: "Ayuda",
    enlaces: [
      { label: "Envíos y domicilios", href: "/suscripcion#faq" },
      { label: "Cambios y devoluciones", href: "/suscripcion#faq" },
      { label: "Preguntas frecuentes", href: "/suscripcion#faq" },
      { label: "WhatsApp", href: "https://wa.me/573000000000" },
    ],
  },
];

export const MEDIOS_DE_PAGO = ["PSE", "Nequi", "Daviplata", "Visa", "Mastercard", "Contraentrega"];

export const REDES: Enlace[] = [
  { label: "Instagram", href: "https://instagram.com/waffy.co" },
  { label: "TikTok", href: "https://tiktok.com/@waffy.co" },
  { label: "Facebook", href: "https://facebook.com/waffy.co" },
];

export const WHATSAPP_URL = "https://wa.me/573000000000";
