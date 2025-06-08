import { Link } from "react-router-dom";
import Header from "../../componentes/header";

function Andina() {
  return (
    <main className="andina">

      <img src="/img/Región andina.svg" alt="" />
      <div>
        <Link to="/antioquia">
          <img src="/Andina/Antioquia.webp" alt="" />
          <b>Antioquia</b>
        </Link>

        <Link to="/santander">
          <img src="/Andina/Santander.webp" alt="" />
          <b>Santander</b>
        </Link>

        <Link to="">
          <img src="/Andina/Cundinamarca.webp" alt="" />
          <b>Cundinamarca</b>
        </Link>
      </div>
      <Header enlace="/mapa" />
    </main>
  );
}

export default Andina;