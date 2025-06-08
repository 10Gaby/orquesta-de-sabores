import { Link } from "react-router-dom";

function Inicio() {

  return (
    <main className="inicio">
        <h3>Orquesta de Sabores</h3>
        <h1>Orquesta de Sabores</h1>
        <Link to="/mapa" className="btn1">Iniciar</Link>
        <img src="/img/Decoración Inicio.svg" alt="" />
    </main>
  );
} 

export default Inicio;