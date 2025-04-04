import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import { CartContext } from "./context/CartContext";

function App() {
  const { mensaje } = useContext(CartContext);

  return (
    <Router>
      {/* 🟢 Notificación si hay mensaje */}
      {mensaje && <div style={styles.toast}>{mensaje}</div>}

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </Router>
  );
}

const styles = {
  toast: {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    fontWeight: "bold",
  },
};

export default App;