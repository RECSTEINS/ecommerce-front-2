import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const ProductCard = ({ producto }) => {

  const { agregarAlCarrito } = useContext(CartContext);

  const { nombre, descripcion, precio, imagen, imagenes } = producto;

  // Obtener la ruta principal (de imagenes[] o fallback a imagen)
  const imagenPrincipal = imagenes?.[0]?.src || imagen;
  const urlImagen = `http://localhost:3001${imagenPrincipal.startsWith("/") ? "" : "/"}${imagenPrincipal}`;

  return (
    <div style={styles.card}>
      <img src={urlImagen} alt={nombre} style={styles.image} />
      <h2 style={styles.title}>{nombre}</h2>
      <p style={styles.description}>{descripcion}</p>
      <p style={styles.price}>${precio.toFixed(2)}</p>
      <button style={styles.button} onClick={() => agregarAlCarrito(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
};

const styles = {
  card: {
    width: "280px",
    margin: "1rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.2rem",
    marginTop: "0.5rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555",
    margin: "0.5rem 0",
  },
  price: {
    fontSize: "1rem",
    color: "#000",
    fontWeight: "600",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProductCard;