import type { Metadata, Viewport } from "next";
import { gluten, poppins } from "@/lib/fonts";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://waffy.com.co"),
  title: {
    default: "Waffy · Porque tu mascota lo merece todo",
    template: "%s · Waffy",
  },
  description:
    "Alimentos premium, accesorios y cuidado para mascotas. Formulado con veterinarios, hecho en Colombia.",
  openGraph: {
    siteName: "Waffy",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#EDE9E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${gluten.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-hueso font-sans text-tinta antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
