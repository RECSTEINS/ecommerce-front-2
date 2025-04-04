import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} E-Shop. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="#privacidad">Política de privacidad</a>
        <a href="#terminos">Términos y condiciones</a>
      </div>
    </footer>
  );
}

export default Footer;
