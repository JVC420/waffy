import { Gluten, Poppins } from "next/font/google";

/**
 * Gluten → display (H1, H2, titulares). Fuente variable; en el sitio usamos 700–800.
 * Poppins → cuerpo, UI, navegación, precios. Regular 400 y SemiBold 600.
 */
export const gluten = Gluten({
  subsets: ["latin"],
  variable: "--font-gluten",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});
