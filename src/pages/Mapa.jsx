import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../componentes/header";

function Mapa() {
  return (
    <main className="mapa">
        <img src="/img/Decoración 2.svg" alt="" className="dec" />
        <Header enlace="/" />
        <div>
            <h3>Orquesta de Sabores</h3>
            <h1>Mapa</h1>
            <p>Haz clic en un punto del mapa para ver más información.</p>
        </div>

        <div className="map">
            <img src="/img/Mapa.svg" alt="Mapa de Colombia"/>
            <Link to="" className="link-icon i1"><FaMapMarkerAlt className="icon" />Caribe</Link>
            <Link to="/andina" className="link-icon i2"><FaMapMarkerAlt className="icon" />Andina</Link>
            <Link to="" className="link-icon i3"><FaMapMarkerAlt className="icon" />Orinoquía</Link>
            <Link to="" className="link-icon i4"><FaMapMarkerAlt className="icon" />Amazonas</Link>
            <Link to="" className="link-icon i5"><FaMapMarkerAlt className="icon" />Pacífico</Link>
            <Link to="" className="link-icon i6"><FaMapMarkerAlt className="icon" />Insular</Link>
        </div>

    </main>
  );
}

export default Mapa;