import { cn } from "@/lib/cn";
import { contraste, luminancia, nivelAA } from "@/lib/contrast";

export type TokenColor =
  | "coral"
  | "ambar"
  | "amarillo"
  | "hueso"
  | "blanco"
  | "tinta"
  | "grafito"
  | "coral-suave"
  | "coral-claro"
  | "ambar-suave"
  | "ambar-claro";

const FONDOS: Record<TokenColor, string> = {
  coral: "bg-coral",
  ambar: "bg-ambar",
  amarillo: "bg-amarillo",
  hueso: "bg-hueso",
  blanco: "bg-blanco",
  tinta: "bg-tinta",
  grafito: "bg-grafito",
  "coral-suave": "bg-coral-suave",
  "coral-claro": "bg-coral-claro",
  "ambar-suave": "bg-ambar-suave",
  "ambar-claro": "bg-ambar-claro",
};

export function Swatch({
  nombre,
  token,
  hex,
  uso,
  className,
}: {
  nombre: string;
  token: TokenColor;
  hex: string;
  uso: string;
  className?: string;
}) {
  const oscuro = luminancia(hex) < 0.3;
  const cTinta = contraste(hex, "#1a1a1a");
  const cBlanco = contraste(hex, "#ffffff");

  return (
    <div
      className={cn(
        "flex min-h-[16rem] flex-col justify-between rounded-card-lg p-6 md:p-7",
        FONDOS[token],
        oscuro ? "text-blanco" : "text-tinta",
        (token === "blanco" || token === "hueso" || token.endsWith("-claro")) &&
          "border border-tinta/10",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="font-display text-[1.75rem] font-bold leading-none tracking-tight">{nombre}</span>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{hex}</span>
      </div>
      <div>
        <p className={cn("text-sm text-pretty", oscuro ? "text-blanco/80" : "text-grafito")}>
          {uso}
        </p>
        <p className="mt-2 text-xs opacity-60">--color-{token}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-pill bg-tinta px-3 py-1.5 text-blanco" title="Contraste con tinta">
            Aa {cTinta.toFixed(2)} · {nivelAA(cTinta)}
          </span>
          <span className="rounded-pill bg-blanco px-3 py-1.5 text-tinta" title="Contraste con blanco">
            Aa {cBlanco.toFixed(2)} · {nivelAA(cBlanco)}
          </span>
        </div>
      </div>
    </div>
  );
}
