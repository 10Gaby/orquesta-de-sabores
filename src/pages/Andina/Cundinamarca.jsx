import { useState, useEffect, useRef } from 'react';
import Correcto from '../../assets/Audios/Correcto.mp3';
import Incorrecto from '../../assets/Audios/Incorrecto.mp3';
import MusicaFondo from '../../assets/Audios/Partida.mp3';
import Gano from '../../assets/Audios/Gano.mp3';
import Perdio from '../../assets/Audios/Perdio.mp3';
import { useNavigate } from 'react-router-dom';
import Header from '../../componentes/Header';

import useScore from '../../store/useScore';

function Cundinamarca() {
    const score = useScore();
    const navigate = useNavigate();
  // INGREDIENTES CORRECTOS (EN ORDEN ESPECÍFICO)
  const ingredientesEnOrden = [
    { nombre: "Agua", imagen: "/Agua.svg" },
    { nombre: "Leche", imagen: "/Leche.svg" },
    { nombre: "Huevos", imagen: "/huevos.svg" },
    { nombre: "Cabezas de ajo", imagen: "/Cabezas de ajo.svg" },
    { nombre: "Queso Doble Crema", imagen: "/Queso.svg" },
    { nombre: "Cebolla Larga", imagen: "/Cebolla Larga.svg" },
    { nombre: "Cilantro", imagen: "/Cilantro.svg" },
    { nombre: "Tostado", imagen: "/Tostado.svg" },
  ];

  // INGREDIENTES INCORRECTOS (para mezclar)
  const ingredientesIncorrectos = [
    { nombre: "Arroz de Coco", imagen: "Arroz de coco.svg" },
    { nombre: "Cebolla", imagen: "Cebolla.svg" },
    { nombre: "Sal y Pimienta", imagen: "Sal y pimienta.svg" },
    { nombre: "Pimentón rojo", imagen: "Pimentón rojo.svg" },
    { nombre: "Comino", imagen: "Comino.svg" },
    { nombre: "Carne en polvo", imagen: "Carne en polvo.svg" },
    { nombre: "Cerveza", imagen: "Cerveza.svg" },
    { nombre: "Aguacate", imagen: "Aguacate.svg" },
    { nombre: "Tomate", imagen: "Tomate.svg" },
    { nombre: "Platano Maduro", imagen: "Platano Maduro.svg" },
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
  
  const [mostrarPopup, setMostrarPopup] = useState(true);
const [iniciarJuego, setIniciarJuego] = useState(false);

  // Refs para audio
  const audioFondo = useRef(null);
  const audioCorrecto = useRef(null);
  const audioIncorrecto = useRef(null);
  const audioGano = useRef(null);
  const audioPerdio = useRef(null);

  // Inicializar audios
  useEffect(() => {
    audioFondo.current = new Audio(MusicaFondo);
    audioFondo.current.loop = true;
    audioFondo.current.volume = volumen;
    
    audioCorrecto.current = new Audio(Correcto);
    audioIncorrecto.current = new Audio(Incorrecto);

    audioGano.current = new Audio(Gano);
    audioGano.current.loop = true;

    audioPerdio.current = new Audio(Perdio);
    audioPerdio.current.loop = true;
    
    score.reset('Cundinamarca');

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
    if (audioGano.current) {
    audioGano.current.volume = volumen;
    }
    if (audioPerdio.current) {
        audioPerdio.current.volume = volumen;
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

  useEffect(()=>{
    if (score.puntaje.Cundinamarca > 0) {
      score.puntaje.Cundinamarca = 0; // Reiniciar puntaje al entrar
    }
  }, [navigate]);

  // Temporizador para el popup inicial
useEffect(() => {
  if (mostrarPopup) {
    const timer = setTimeout(() => {
      setMostrarPopup(false);
      setIniciarJuego(true);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }
}, [mostrarPopup]);

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
  if (juegoTerminado || !iniciarJuego) return; // No inicia si el popup está visible

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
}, [tiempoRestante, juegoTerminado, iniciarJuego]);

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
      score.sumar('Cundinamarca', 1);
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

const reiniciarJuego = () => {
  // Detener todos los sonidos de resultado
  audioGano.current.pause();
  audioGano.current.currentTime = 0;
  audioPerdio.current.pause();
  audioPerdio.current.currentTime = 0;
  
  // Reiniciar estados del juego
  setIndiceActual(0);
  setIngredientesSeleccionados([]);
  setPuntaje(0);
  score.reset('Cundinamarca');
  setJuegoTerminado(false);

  setMostrarPopup(true);
    setIniciarJuego(false);

  setMensaje("");
  
  // Reiniciar música de fondo
  if (audioFondo.current) {
    audioFondo.current.currentTime = 0;
    audioFondo.current.play().catch(e => console.log("Error al reiniciar música:", e));
  }
  
  // Mostrar popup de ingredientes nuevamente
  setMostrarPopup(true);
  setIniciarJuego(false);
};

  // Efecto para sonidos de fin de juego
useEffect(() => {
  if (juegoTerminado) {
    // Detener música de fondo
    if (audioFondo.current) {
      audioFondo.current.pause();
      audioFondo.current.currentTime = 0;
    }
    
    // Reproducir sonido según el resultado en bucle
    if (score.puntaje.Cundinamarca > 3) {
      audioGano.current.currentTime = 0;
      audioGano.current.play().catch(e => console.log("Error al reproducir sonido de victoria:", e));
      
      // Asegurarse de detener sonido de derrota si estaba sonando
      audioPerdio.current.pause();
      audioPerdio.current.currentTime = 0;
    } else {
      audioPerdio.current.currentTime = 0;
      audioPerdio.current.play().catch(e => console.log("Error al reproducir sonido de derrota:", e));
      
      // Asegurarse de detener sonido de victoria si estaba sonando
      audioGano.current.pause();
      audioGano.current.currentTime = 0;
    }
  }
}, [juegoTerminado]);

  return (
    <main className={`juego antioquia ${juegoTerminado ? 'fondo3' : 'fondo2'}`} onClick={iniciarMusica}>
        <Header enlace="/andina" />
        {mostrarPopup && (
      <div className="popup-ingredientes">
        <div className="popup-contenido">
          <div>
            <img src="/Andina/Cundinamarca.webp" alt="" />
            <h3>Cundinamarca</h3>
          </div>
          <div>
                <p>Tienes 5 segundos para recordar los ingredientes</p>
                <h2>Ingredientes Changua</h2>
                <ul>
                    <li>Agua</li>
                    <li>Leche</li>
                    <li>Huevos</li>
                    <li>Cabezas de ajo</li>
                    <li>Queso Doble Crema</li>
                    <li>Cebolla larga</li>
                    <li>Cilantro</li>
                    <li>Tostado</li>
                </ul>
                <button 
                    className="btn2"
                    onClick={() => {
                    setMostrarPopup(false);
                    setIniciarJuego(true);
                    }}
                >
                    Saltar
                </button>
          </div>
        </div>
      </div>
    )}


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
                src={`/Andina/Cundinamarca/${ingrediente.imagen}`} 
                alt={ingrediente.nombre}
                className={`ingrediente ing-cundinamarca ${
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
        score.puntaje.Cundinamarca > 3 ? (
            <div className="resultado-final">
            <h1>Ganaste</h1>
            <p>Puntaje final: {useScore.getState().puntaje.Cundinamarca} de {ingredientesEnOrden.length}</p>
            <button onClick={reiniciarJuego}>Jugar de nuevo</button>
            </div>
        ) : (
            <div className="resultado-final">
            <h1>Perdiste</h1>
            <p>Puntaje final: {useScore.getState().puntaje.Cundinamarca} de {ingredientesEnOrden.length}</p>
            <button onClick={reiniciarJuego}>Jugar de nuevo</button>
            </div>
        )
        )}
      </div>

      <div>

        {!juegoTerminado ? (
            <img src={imagenCliente} alt="Cliente" />
        ) : (
        score.puntaje.Cundinamarca > 3 ? (
            <img src="/img/Cliente 1.svg" alt="Cliente" />
        ) : (
            <img src="/img/Cliente 1 - Error.svg" alt="Cliente" />
        )
        )}
      </div>

    </main>
  );
}

export default Cundinamarca;