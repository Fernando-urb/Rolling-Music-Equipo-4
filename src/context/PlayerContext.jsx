import { useState, useRef, useEffect } from "react";
import { PlayerContext } from "../hook/usePlayer";

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef(new Audio());

  // Este useEffect maneja los eventos de 'carga' y 'final'
  useEffect(() => {
    const audio = audioRef.current;
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // --- ¡AQUÍ ESTÁ LA MAGIA! ---
  // Este useEffect maneja el progreso FLUIDO
  useEffect(() => {
    const audio = audioRef.current;
    let timerId = null;

    if (isPlaying) {
      // Si está sonando, inicia un bucle para actualizar el progreso
      timerId = setInterval(() => {
        // Asegúrate de no dividir por cero
        if (audio.duration > 0) {
          // Calcula el progreso como un porcentaje
          const percentage = (audio.currentTime / audio.duration) * 100;
          setProgress(percentage);
        }
      }, 250); // Actualiza 4 veces por segundo (muy fluido)
    } else {
      // Si se pausa, limpia el bucle
      clearInterval(timerId);
    }

    // Limpieza al desmontar o si 'isPlaying' cambia
    return () => {
      clearInterval(timerId);
    };
  }, [isPlaying]); // Este efecto solo depende de si está sonando o no

  // Este useEffect maneja el CAMBIO de canción
  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack && currentTrack.preview_url) {
      audio.src = currentTrack.preview_url;
      audio.play().catch((e) => console.error("Error al reproducir el audio:", e));
      setIsPlaying(true);
      setProgress(0); // Resetea el progreso al cambiar de canción
    } else {
      audio.pause();
      setIsPlaying(false);
      audio.src = "";
    }
  }, [currentTrack]);

  // --- LÓGICA DE 'playTrack' SIMPLIFICADA ---
  const playTrack = (track) => {
    console.log("Objeto 'track' recibido:", track);
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlayerVisible(true);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.error("Error al reproducir:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = "";
    setCurrentTrack(null);
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setProgress(0);
    setDuration(0);
  };

  const seekTo = (percentage) => {
    const audio = audioRef.current;

    if (isNaN(audio.duration) || audio.duration === 0) return;

    const newTime = (percentage / 100) * audio.duration;

    audio.currentTime = newTime;
    setProgress(percentage);
  };

  const value = {
    currentTrack,
    isPlaying,
    progress,
    duration,
    isPlayerVisible,
    playTrack,
    togglePlayPause,
    seekTo,
    closePlayer,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
