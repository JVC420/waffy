import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNAS, MEDIOS_DE_PAGO, REDES } from "@/data/navegacion";
import { Newsletter } from "./Newsletter";
import { Subrayado } from "@/components/ui/Subrayado";

export function Footer() {
  return (
    <footer className="bg-blanco text-tinta">
      <div className="contenedor py-section">
        {/* Cierre de marca + newsletter */}
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-20">
          <p className="max-w-[13ch] font-display text-h1 font-bold text-balance">
            Porque tu mascota lo merece{" "}
            <strong className="font-extrabold">
              <Subrayado>TODO</Subrayado>
            </strong>
            .
          </p>
          <Newsletter />
        </div>

        {/* Navegación */}
        <div className="mt-20 grid gap-12 border-t border-tinta/10 pt-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16 lg:grid-cols-[auto_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col gap-6">
            <Logo height={104} />
            <p className="max-w-[16rem] text-sm text-grafito">
              Alimentos premium, accesorios y cuidado para mascotas. Formulado con veterinarios,
              hecho en Colombia.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-3">
            {FOOTER_COLUMNAS.map((col) => (
              <nav key={col.titulo} aria-label={col.titulo}>
                <p className="eyebrow mb-5 text-grafito">{col.titulo}</p>
                <ul className="flex flex-col gap-3">
                  {col.enlaces.map((e) => (
                    <li key={e.label}>
                      {e.href.startsWith("http") ? (
                        <a
                          href={e.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-link text-sm"
                        >
                          {e.label}
                        </a>
                      ) : (
                        <Link href={e.href} className="nav-link text-sm">
                          {e.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Medios de pago y legal */}
        <div className="mt-14 flex flex-col gap-8 border-t border-tinta/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Medios de pago">
            {MEDIOS_DE_PAGO.map((m) => (
              <li key={m} className="badge badge-hueso">
                {m}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-6" aria-label="Redes sociales">
            {REDES.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-sm"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-col gap-2 text-xs text-grafito sm:flex-row sm:justify-between">
          <p>© 2026 Waffy · Bogotá, Colombia · waffy.com.co</p>
          <p className="flex gap-4">
            <Link href="/suscripcion#faq" className="hover:text-tinta">
              Términos
            </Link>
            <Link href="/suscripcion#faq" className="hover:text-tinta">
              Privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
