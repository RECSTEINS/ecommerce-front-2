import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";


const Carrito = () => {
  const { carrito } = useContext(CartContext);

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  const stripePromise = loadStripe("pk_test_51R92sfFp99QLuYbuMAcnumXcyo5PqQI8nlCW3RY6Jp6zXnlBcp6hKEy5FJ58EwmnpthrKSXSaT9kyWIX7kofwW9600rkwDmaDT"); // Usa tu public key real

const handlePagar = async () => {
  const stripe = await stripePromise;

  const response = await fetch("https://ecommerce-back-production-e299.up.railway.app/crear-pago", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: carrito }),
  });

  const data = await response.json();

  if (data.id) {
    stripe.redirectToCheckout({ sessionId: data.id });
  } else {
    alert("Error al crear sesión de pago.");
  }
};

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} style={styles.item}>
              <img
                src={`https://ambar-bazar-studio.vercel.app/${item.imagen}`}
                alt={item.nombre}
                style={styles.image}
              />
              <div>
                <h3>{item.nombre}</h3>
                <p>${item.precio} x {item.cantidad}</p>
                <strong>Total: ${item.precio * item.cantidad}</strong>
              </div>
            </div>
          ))}<h2 style={styles.total}>Total general: ${calcularTotal().toFixed(2)}</h2>

          <button style={styles.payButton} onClick={handlePagar}>
            Pagar con Stripe
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  heading: {
    marginBottom: "1rem",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  total: {
    marginTop: "2rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  payButton: {
    marginTop: "2rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#635bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};

export default Carrito;
