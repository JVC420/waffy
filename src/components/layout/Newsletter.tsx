"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { IconoCheck } from "@/components/ui/Iconos";

/** Formulario visual: valida en cliente y muestra confirmación. No envía nada. */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "error" | "ok">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEstado("error");
      return;
    }
    setEstado("ok");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <label htmlFor={id} className="font-semibold">
        Novedades, recetas nuevas y descuentos. Sin spam.
      </label>
      {estado === "ok" ? (
        <p className="flex h-14 items-center gap-2 rounded-pill bg-hueso px-6 text-sm font-semibold" role="status">
          <IconoCheck size={18} /> Listo. Te escribimos pronto.
        </p>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (estado === "error") setEstado("idle");
            }}
            aria-invalid={estado === "error"}
            aria-describedby={estado === "error" ? `${id}-error` : undefined}
            className="h-14 flex-1 rounded-pill border border-tinta/15 bg-blanco px-6 text-base outline-none transition-[border-color] duration-300 ease-waffy placeholder:text-grafito/60 focus:border-tinta"
          />
          <Button type="submit" size="lg">
            Suscribirme
          </Button>
        </div>
      )}
      {estado === "error" && (
        <p id={`${id}-error`} className="text-sm font-semibold text-coral">
          Revisa el correo, parece incompleto.
        </p>
      )}
    </form>
  );
}
