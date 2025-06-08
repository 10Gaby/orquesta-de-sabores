import { useState } from 'react'
import './App.css'
import './Juego.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mapa from './pages/Mapa';

import Inicio from './pages/Inicio';
import Andina from './pages/Andina/Andina';
import Antioquia from './pages/Andina/Antioquia';

function App() {

  return (
      <div className="App">
            <Router>
            {/* Coloca Componentes aquí para que esté disponible en todas las rutas */}

              {/* Usa solo un Router que envuelva las rutas */}
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/mapa" element={<Mapa />} />
                  <Route path="/andina" element={<Andina />} />
                  <Route path="/antioquia" element={<Antioquia />} />
                </Routes>


            </Router>

          </div>
  )
}

export default App;
