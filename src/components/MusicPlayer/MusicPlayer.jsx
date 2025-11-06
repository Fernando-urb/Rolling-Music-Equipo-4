import { Play, Pause, ChevronDown, Volume2, Volume1, VolumeX } from "lucide-react";
import { usePlayer } from "../../hook/usePlayer";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    seekTo,
    isPlayerVisible,
    closePlayer,
    volume,
    setVolume,
  } = usePlayer();

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  // Formatear el tiempo de segundos a "MM:SS"
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Componente que renderiza el icono de volumen (silenciado, bajo, alto)
  const VolumeIcon = ({ size, className }) => {
    let Icon;
    if (volume === 0) Icon = VolumeX;
    else if (volume < 50) Icon = Volume1;
    else Icon = Volume2;

    return <Icon size={size} className={className} />;
  };

  // Manejador del slider de volumen
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 p-3 sm:p-4 flex items-center justify-between text-white shadow-lg">
      {/* Sección Izquierda: Info */}
      <div className="flex items-center gap-3 w-1/3">
        {currentTrack.album && currentTrack.album.images[2] && (
          <img
            src={currentTrack.album.images[2].url}
            alt={currentTrack.album.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
          />
        )}
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold text-sm truncate">{currentTrack.name}</p>
          <p className="text-xs text-gray-400 truncate">
            {currentTrack.artists[0]?.name || "Artista desconocido"}
          </p>
        </div>
      </div>

      {/* Sección Central: Controles de Reproducción y Progreso */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-4 mb-1">
          <button
            onClick={togglePlayPause}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-all duration-300 transform hover:scale-110"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>
        </div>
        <div className="flex items-center w-full max-w-sm gap-2 text-xs text-gray-400">
          <span>{formatTime((progress / 100) * duration)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Sección Derecha: Slider de Volumen y Cerrar Reproductor  */}
      <div className="w-1/3 flex justify-end items-center gap-4">
        {/* Slider de Volumen  */}
        <div className="flex items-center gap-2">
          <VolumeIcon size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            // Ajustado el ancho para mejor estética si es necesario
            className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Botón Cerrar Reproductor */}
        <button
          onClick={closePlayer}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-700"
          aria-label="Cerrar reproductor"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
