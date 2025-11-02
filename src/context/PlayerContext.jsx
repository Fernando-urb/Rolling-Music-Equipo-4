import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hook/useAuth"; // <-- 2. CORREGIR LA RUTA DE useAuth
import { logSongPlay } from "../services/userService";
import { PlayerContext } from "../hook/usePlayer";

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef(new Audio());
  const { user } = useAuth();

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
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

  const playTrack = (track) => {
    console.log("Objeto 'track' recibido:", track);
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlayerVisible(true);

      const artistId = track?.artistId;

      console.log("Datos para registrar:", {
        usuario: user,
        idCancion: track?.id,
        idArtista: artistId,
      });

      if (user && track?.id && artistId) {
        logSongPlay(user.uid, track.id, artistId);
      } else {
        console.warn("No se pudo registrar la canción: falta user.uid, track.id o artistId");
      }
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

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
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

  // El Provider usa el PlayerContext que creamos arriba
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
