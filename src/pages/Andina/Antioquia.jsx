import { useState, useEffect, useRef } from 'react';
import Correcto from '../../assets/Audios/Correcto.mp3';
import Incorrecto from '../../assets/Audios/Incorrecto.mp3';
import MusicaFondo from '../../assets/Audios/Partida.mp3';
import useScore from '../../store/useScore';

function Antioquia() {
    const score = useScore();
  // INGREDIENTES CORRECTOS (EN ORDEN ESPECÍFICO)
  const ingredientesEnOrden = [
    { nombre: "Arroz Blanco", imagen: "/Arroz Blanco.svg" },
    { nombre: "Frijoles", imagen: "/Frijoles.svg" },
    { nombre: "Carne en polvo", imagen: "/Carne en polvo.svg" },
    { nombre: "Platano Maduro", imagen: "/Platano Maduro.svg" },
    { nombre: "Chorizo", imagen: "/Chorizo.svg" },
    { nombre: "Arepa", imagen: "/Arepa.svg" },
    { nombre: "Chicharron", imagen: "/Chicharron.svg" },
    { nombre: "Aguacate", imagen: "/Aguacate.svg" },
    { nombre: "Huevo", imagen: "/Huevo.svg" },
  ];

  // INGREDIENTES INCORRECTOS (para mezclar)
  const ingredientesIncorrectos = [
    { nombre: "Arroz de Coco", imagen: "Arroz de coco.svg" },
    { nombre: "Cebolla", imagen: "Cebolla.svg" },
    { nombre: "Cilantro", imagen: "Cilantro.svg" },
    { nombre: "Orégano", imagen: "Orégano.svg" },
    { nombre: "Queso", imagen: "Queso.svg" },
    { nombre: "Leche", imagen: "Leche.svg" },
  ];

 // Estados
  const [indiceActual, setIndiceActual] = useState(0);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [opcionesActuales, setOpcionesActuales] = useState([]);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(5);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [volumen, setVolumen] = useState(0.5);
  const [musicaIniciada, setMusicaIniciada] = useState(false);

  const [imagenCliente, setImagenCliente] = useState("/img/Cliente 1.svg");
  
  // Refs para audio
  const audioFondo = useRef(null);
  const audioCorrecto = useRef(null);
  const audioIncorrecto = useRef(null);

  // Inicializar audios
  useEffect(() => {
    audioFondo.current = new Audio(MusicaFondo);
    audioFondo.current.loop = true;
    audioFondo.current.volume = volumen;
    
    audioCorrecto.current = new Audio(Correcto);
    audioIncorrecto.current = new Audio(Incorrecto);
    score.reset('Antioquia');

    return () => {
      audioFondo.current.pause();
    };
  }, []);

  // Control de volumen
  useEffect(() => {
    if (audioFondo.current) {
      audioFondo.current.volume = volumen;
    }
    if (audioCorrecto.current) {
      audioCorrecto.current.volume = volumen;
    }
    if (audioIncorrecto.current) {
      audioIncorrecto.current.volume = volumen;
    }
  }, [volumen]);

  // Iniciar música al primer click
  const iniciarMusica = () => {
    if (!musicaIniciada && audioFondo.current) {
      audioFondo.current.play()
        .then(() => setMusicaIniciada(true))
        .catch(e => console.log("Error al iniciar música:", e));
    }
  };

  // Generar opciones
  const generarOpciones = () => {
    if (indiceActual >= ingredientesEnOrden.length) {
      setJuegoTerminado(true);
      if (audioFondo.current) {
        audioFondo.current.pause();
        audioFondo.current.currentTime = 0;
      }
      return;
    }

    const correcta = ingredientesEnOrden[indiceActual];
    const opcionesIncorrectas = [...ingredientesIncorrectos]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setOpcionesActuales([correcta, ...opcionesIncorrectas].sort(() => 0.5 - Math.random()));
    setTiempoRestante(5);
  };

  // Temporizador
  useEffect(() => {
    if (juegoTerminado) return;

    const timer = tiempoRestante > 0 && setInterval(() => {
      setTiempoRestante(tiempoRestante - 1);
    }, 1000);

    if (tiempoRestante === 0) {
      setMensaje("¡Tiempo agotado!");
      setTimeout(() => {
        setMensaje("");
        setIndiceActual(indiceActual + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [tiempoRestante, juegoTerminado]);

  // Cambiar opciones al avanzar
  useEffect(() => {
    generarOpciones();
  }, [indiceActual]);

  // Manejar selección
  const handleSeleccion = (opcionSeleccionada) => {
    const esCorrecta = opcionSeleccionada.nombre === ingredientesEnOrden[indiceActual].nombre;

    if (esCorrecta) {
      audioCorrecto.current.currentTime = 0;
      audioCorrecto.current.play();
      setIngredientesSeleccionados([...ingredientesSeleccionados, opcionSeleccionada]);
      setPuntaje(puntaje + 1);
      score.sumar('Antioquia', 1);
      setMensaje("¡Correcto!");
      setImagenCliente("/img/Cliente 1.svg");
    } else {
      audioIncorrecto.current.currentTime = 0;
      audioIncorrecto.current.play();
      setMensaje("Error");
      setImagenCliente("/img/Cliente 1 - Error.svg");
    }

    setTimeout(() => {
      setMensaje("");
      setIndiceActual(indiceActual + 1);
      setImagenCliente("/img/Cliente 1.svg");
    }, 1000);
  };

  // Reiniciar juego
  const reiniciarJuego = () => {
    setIndiceActual(0);
    setIngredientesSeleccionados([]);
    setPuntaje(0);
    score.reset('Antioquia');
    setJuegoTerminado(false);
    setMensaje("");
    if (audioFondo.current) {
      audioFondo.current.currentTime = 0;
      audioFondo.current.play();
    }
  };

  return (
    <main className={`juego antioquia ${juegoTerminado ? 'fondo3' : 'fondo2'}`} onClick={iniciarMusica}>
         <div className="controles-volumen">
        <label>Volumen:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volumen}
          onChange={(e) => setVolumen(parseFloat(e.target.value))}
        />
      </div>

      {/* Mensaje de iniciar música (solo para móviles) */}
      {!musicaIniciada && (
        <div className="mensaje-iniciar">
          <p>Toca la pantalla para iniciar la música</p>
        </div>
      )}
      <div>
        <div className={`plato ${juegoTerminado ? 'final' : 'normal'}`}>
          <img src="/img/Plato.svg" alt="Plato vacío" className="plato-img"/>
          <div className="ingredientes-plato">
            {ingredientesEnOrden.map((ingrediente, index) => (
              <img 
                key={index}
                src={`/Andina/${ingrediente.imagen}`} 
                alt={ingrediente.nombre}
                className={`ingrediente ${
                  ingredientesSeleccionados.some(ing => ing.nombre === ingrediente.nombre) 
                    ? 'visible' 
                    : 'hidden'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mensaje de feedback */}
        {mensaje && (
          <div className={`mensaje ${mensaje === "Error" ? 'error' : 'correcto'}`}>
            {mensaje}
          </div>
        )}

        {/* Temporizador */}
        <div className="temporizador">
          Tiempo: {tiempoRestante}s
        </div>

        {/* Opciones */}
        {!juegoTerminado ? (
        <div className="ingredientes">
            {opcionesActuales.map((opcion, index) => (
            <button
                key={index}
                onClick={() => handleSeleccion(opcion)}
                disabled={mensaje !== ""}
            >
                <img src={`/Ingredientes/${opcion.imagen}`} alt={opcion.nombre} />
                <p>{opcion.nombre}</p>
            </button>
            ))}
        </div>
        ) : (
        score.puntaje.Antioquia > 4 ? (
            <div className="resultado-final">
            <h1>Ganaste</h1>
            <p>Puntaje final: {useScore.getState().puntaje.Antioquia} de {ingredientesEnOrden.length}</p>
            <button onClick={reiniciarJuego}>Jugar de nuevo</button>
            </div>
        ) : (
            <div className="resultado-final">
            <h1>Perdiste</h1>
            <p>Puntaje final: {useScore.getState().puntaje.Antioquia} de {ingredientesEnOrden.length}</p>
            <button onClick={reiniciarJuego}>Jugar de nuevo</button>
            </div>
        )
        )}
      </div>

      <div>

        {!juegoTerminado ? (
            <img src={imagenCliente} alt="Cliente" />
        ) : (
        score.puntaje.Antioquia > 4 ? (
            <img src="/img/Cliente 1.svg" alt="Cliente" />
        ) : (
            <img src="/img/Cliente 1 - Error.svg" alt="Cliente" />
        )
        )}
      </div>
    </main>
  );
}

export default Antioquia;