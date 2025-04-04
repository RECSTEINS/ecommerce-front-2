import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });

    setMensaje(`${producto.nombre} agregado al carrito ✅`);
  };

  useEffect(() => {
    if (mensaje) {
      const timeout = setTimeout(() => setMensaje(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [mensaje]);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito,mensaje }}>
      {children}
    </CartContext.Provider>
  );
};
