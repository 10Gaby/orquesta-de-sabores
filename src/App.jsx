import { useState } from 'react'
import './App.css'
import './Juego.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Mapa from './pages/Mapa';

import Inicio from './pages/Inicio';

import Andina from './pages/Andina/Andina';
import Antioquia from './pages/Andina/Antioquia';
import Santander from './pages/Andina/Santander';
import Cundinamarca from './pages/Andina/Cundinamarca';

import MusicPlayer from './componentes/MusicPlayer';
import { MusicProvider } from './context/MusicContext';

// Componente que envuelve las rutas y controla la visibilidad del MusicPlayer
function AppContent() {
  const location = useLocation();
  const excludedRoutes = ['/antioquia', '/santander', '/cundinamarca']; // Rutas a excluir
const showMusicPlayer = !excludedRoutes.some(route => location.pathname.startsWith(route));


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/andina" element={<Andina />} />
        <Route path="/antioquia" element={<Antioquia />} />
        <Route path="/santander" element={<Santander />} />
        <Route path="/cundinamarca" element={<Cundinamarca />} />
      </Routes>
      {showMusicPlayer && <MusicPlayer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <MusicProvider> {/* Envuelve toda la app con el provider */}
        <AppContent />
      </MusicProvider>
    </Router>
  );
}

export default App;