import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...rest }: P) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...rest,
  };
}

export const IconoCarrito = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-1 11H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconoMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const IconoCerrar = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconoMas = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconoMenos = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconoCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const IconoPlay = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const IconoPausa = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4" height="14" rx="1.5" />
    <rect x="14" y="5" width="4" height="14" rx="1.5" />
  </svg>
);

export const IconoChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c-4.7 0-8.5 3.4-8.5 7.6 0 2 .9 3.9 2.4 5.2L5 20.5l4.3-1.6c.9.2 1.8.3 2.7.3 4.7 0 8.5-3.4 8.5-7.6S16.7 3.5 12 3.5Z" />
    <path d="M9 9.5c.5 2.2 2.3 4 4.5 4.5l1.2-1.2-1.7-1-.9.6c-.6-.3-1.2-.9-1.5-1.5l.6-.9-1-1.7L9 9.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconoFlecha = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Sellos de confianza */
export const IconoHoja = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
    <path d="M5 19c3-4 6-7 10-10" />
  </svg>
);

export const IconoVeterinario = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8.5v7M8.5 12h7" />
  </svg>
);

export const IconoReloj = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconoSello = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l2.4 2 3.1-.3.8 3 2.7 1.6-1.3 2.8 1.3 2.8-2.7 1.6-.8 3-3.1-.3-2.4 2-2.4-2-3.1.3-.8-3-2.7-1.6L4.3 12 3 9.2l2.7-1.6.8-3 3.1.3L12 3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
