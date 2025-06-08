// components/MusicPlayer.jsx
import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import audioSrc from '../assets/Audios/Fondo.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause(); // Limpia el audio al desmontar el componente
    };
  }, [isPlaying]);

  return (
    <button
      className="music-toggle"
      onClick={() => setIsPlaying(!isPlaying)}
      aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
      <FaVolumeUp className="volume-icon" />
    </button>
  );
};

export default MusicPlayer;