import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("pago") === "exitoso") {
      setPagoExitoso(true);
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    fetch("https://ecommerce-back-production-e299.up.railway.app/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, [location.search]);

  return (
    <div style={styles.container}>
      {pagoExitoso && (
        <div style={styles.alerta}>
          ✅ ¡Gracias por tu compra! Tu pedido fue procesado correctamente.
        </div>
      )}
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "2rem",
  },
  alerta: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Home;