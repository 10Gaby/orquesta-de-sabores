import { Link } from "react-router-dom";
import useScore from "../store/useScore";

function Inicio() {

      const score = useScore();

        const total = useScore((state) =>
        (state.puntaje.Antioquia || 0) +
        (state.puntaje.Cundinamarca || 0) +
        (state.puntaje.Santander || 0)
        );

  return (
    <main className="inicio">
        <h3>Orquesta de Sabores</h3>
        <h1>Orquesta de Sabores</h1>
        <Link to="/mapa" className="btn1">Iniciar</Link>
        <img src="/img/Decoración Inicio.svg" alt="" />
        <p>{total}</p>
    </main>
  );
} 

export default Inicio;