import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "coral"
  | "tinta"
  | "blanco"
  | "ambar"
  | "fantasma"
  | "fantasma-blanco";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Botón circular solo con icono. */
  icono?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "coral",
    size = "md",
    icono = false,
    className,
    children,
    ...rest
  } = props;

  const clases = cn(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    icono && "btn-icono",
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchor } = rest as ButtonAsLink;
    return (
      <Link href={href} className={clases} {...anchor}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...button } = rest as ButtonAsButton;
  return (
    <button type={type} className={clases} {...button}>
      {children}
    </button>
  );
}

/** Flecha fina para CTAs. */
export function Flecha({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
