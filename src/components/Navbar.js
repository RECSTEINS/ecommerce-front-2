import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">E-Shop</div>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="/">Inicio</a>
        <a href="#productos">Productos</a>
        <a href="#contacto">Contacto</a>
        <Link to="/carrito">Carrito</Link>
      </div>
      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
