import { useState, useRef, useEffect } from "react";
// 1. IMPORTA EL CONTEXTO DESDE TU ARCHIVO DE HOOKS
import { PlayerContext } from "../hook/useAuth";

// 2. Este archivo ahora SOLO exporta el componente
export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef(new Audio());

  // ... (useEffect para los eventos de audio, sin cambios) ...
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack && currentTrack.preview_url) {
      audio.src = currentTrack.preview_url;
      audio.play().catch((e) => console.error("Error al reproducir el audio:", e));
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
      audio.src = "";
    }
  }, [currentTrack]);

  // ... (Funciones playTrack, togglePlayPause, closePlayer, seekTo, sin cambios) ...
  const playTrack = (track) => {
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
      audio.play().catch((e) => console.error("Error al reproducir el audio:", e));
    }
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = "";
    setCurrentTrack(null);
    setIsPlayerVisible(false);
    setProgress(0);
    setDuration(0);
  };

  const seekTo = (newProgress) => {
    const audio = audioRef.current;
    const newTime = (newProgress / 100) * audio.duration;
    audio.currentTime = newTime;
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
