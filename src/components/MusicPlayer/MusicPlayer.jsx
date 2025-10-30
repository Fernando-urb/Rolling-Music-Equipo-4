import { Play, Pause, ChevronDown } from "lucide-react"; // Iconos
import { usePlayer } from "../../hook/usePlayer";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    seekTo,
    isPlayerVisible, // <-- Lo estabas recibiendo
    closePlayer, // <-- Lo estabas recibiendo
  } = usePlayer();

  // --- CORRECCIÓN 1: Comprobar ambos estados ---
  // Si no hay canción O no es visible, no se muestra el reproductor
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 p-3 sm:p-4 flex items-center justify-between text-white shadow-lg">
      {/* Sección Izquierda: Info (Sin cambios) */}
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

      {/* Sección Central: Controles (Sin cambios) */}
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

      {/* --- CORRECCIÓN 2: Añadir el botón de cerrar --- */}
      <div className="w-1/3 flex justify-end items-center gap-4">
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
