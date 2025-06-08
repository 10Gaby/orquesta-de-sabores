import { Link } from "react-router-dom";

function Andina() {
  return (
    <main className="andina">
      <img src="/img/Región andina.svg" alt="" />
      <div>
        <Link to="/antioquia">
          <img src="/Andina/Antioquia.webp" alt="" />
          <b>Antioquia</b>
        </Link>

        <Link to="">
          <img src="/Andina/Santander.webp" alt="" />
          <b>Santander</b>
        </Link>

        <Link to="">
          <img src="/Andina/Cundinamarca.webp" alt="" />
          <b>Cundinamarca</b>
        </Link>
      </div>
    </main>
  );
}

export default Andina;