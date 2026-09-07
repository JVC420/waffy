"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** Línea del carrito visual. Solo estado local: nada se envía a ningún lado. */
export type ItemCarrito = {
  id: string;
  nombre: string;
  gramaje: string;
  precio: number;
  cantidad: number;
  tono?: "hueso" | "coral" | "ambar" | "amarillo" | "blanco";
};

type Ui = {
  /** true cuando existe el video del hero: el header flota en blanco sobre él. */
  heroConVideo: boolean;
  carritoAbierto: boolean;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  menuAbierto: boolean;
  abrirMenu: () => void;
  cerrarMenu: () => void;
  items: ItemCarrito[];
  agregar: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  quitar: (id: string) => void;
  totalUnidades: number;
  subtotal: number;
};

const UiContext = createContext<Ui | null>(null);

export function UiProvider({
  children,
  heroConVideo = false,
}: {
  children: ReactNode;
  heroConVideo?: boolean;
}) {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregar = useCallback<Ui["agregar"]>((item, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe) {
        return prev.map((i) => (i.id === item.id ? { ...i, cantidad: i.cantidad + cantidad } : i));
      }
      return [...prev, { ...item, cantidad }];
    });
    setCarritoAbierto(true);
  }, []);

  const cambiarCantidad = useCallback((id: string, cantidad: number) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, cantidad } : i)),
    );
  }, []);

  const quitar = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo<Ui>(
    () => ({
      heroConVideo,
      carritoAbierto,
      abrirCarrito: () => setCarritoAbierto(true),
      cerrarCarrito: () => setCarritoAbierto(false),
      menuAbierto,
      abrirMenu: () => setMenuAbierto(true),
      cerrarMenu: () => setMenuAbierto(false),
      items,
      agregar,
      cambiarCantidad,
      quitar,
      totalUnidades: items.reduce((n, i) => n + i.cantidad, 0),
      subtotal: items.reduce((n, i) => n + i.cantidad * i.precio, 0),
    }),
    [heroConVideo, carritoAbierto, menuAbierto, items, agregar, cambiarCantidad, quitar],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

const noop = () => {};

/** Fuera del sitio (p. ej. /estilos) devuelve un estado inerte en vez de fallar. */
const UI_INERTE: Ui = {
  heroConVideo: false,
  carritoAbierto: false,
  abrirCarrito: noop,
  cerrarCarrito: noop,
  menuAbierto: false,
  abrirMenu: noop,
  cerrarMenu: noop,
  items: [],
  agregar: noop,
  cambiarCantidad: noop,
  quitar: noop,
  totalUnidades: 0,
  subtotal: 0,
};

export function useUi() {
  return useContext(UiContext) ?? UI_INERTE;
}
