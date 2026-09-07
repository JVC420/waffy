"use client";

import { IconoChat } from "@/components/ui/Iconos";
import { WHATSAPP_URL } from "@/data/navegacion";
import { cn } from "@/lib/cn";
import { useUi } from "./UiProvider";

/** Botón flotante de WhatsApp. Se esconde cuando hay un drawer o el menú abierto. */
export function WhatsAppFlotante() {
  const { carritoAbierto, menuAbierto } = useUi();
  const oculto = carritoAbierto || menuAbierto;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={cn(
        "btn btn-tinta btn-md fixed bottom-5 right-5 z-40 gap-2 pl-4 pr-5 shadow-[0_18px_40px_-18px_rgb(26_26_26/0.4)] md:bottom-8 md:right-8",
        "transition-[opacity,transform,background-color] duration-500 ease-waffy",
        oculto && "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <IconoChat />
      <span>WhatsApp</span>
    </a>
  );
}
