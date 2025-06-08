import { useNavigate } from "react-router-dom";
import useScore from "../store/useScore";

function Header({enlace}) {
    const Navigate = useNavigate();
    const score = useScore();

    const total = useScore((state) =>
        (state.puntaje.Antioquia || 0) +
        (state.puntaje.Cundinamarca || 0) +
        (state.puntaje.Santander || 0)
        );

  return (
    <header>
      <a className="btn1" href={enlace}>Regresar</a>
      <p>Puntaje Total: {total}</p>
    </header>
  );
}  

export default Header;