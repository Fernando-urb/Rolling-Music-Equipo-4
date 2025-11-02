import { Play, Pause, ChevronDown } from "lucide-react"; // Iconos
import { usePlayer } from "../../hook/useAuth";

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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 border-t border-gray-700 p-3 sm:p-4 flex items-center justify-between text-white shadow-2xl backdrop-blur-lg">
      {/* Sección Izquierda: Info de la canción */}
      <div className="flex items-center gap-3 w-1/3">
        <img
          src={currentTrack.cover || '/default-cover.jpg'}
          alt={currentTrack.title}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-lg"
        />
        <div className="flex flex-col overflow-hidden">
          <p className="font-semibold text-sm truncate text-white">
            {currentTrack.title}
          </p>
          <p className="text-xs text-gray-300 truncate">
            {currentTrack.artist || "Artista desconocido"}
          </p>
        </div>
      </div>

      {/* Sección Central: Controles de reproducción */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={togglePlayPause}
            disabled={!currentTrack.preview_url}
            className={`rounded-full p-3 transition-all duration-300 transform hover:scale-110 shadow-lg ${
              !currentTrack.preview_url 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
            } text-white`}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            title={!currentTrack.preview_url ? "Preview no disponible" : (isPlaying ? "Pausar" : "Reproducir")}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </button>
        </div>
        {!currentTrack.preview_url && (
          <p className="text-xs text-gray-400 mb-1">Preview no disponible</p>
        )}
        <div className="flex items-center w-full max-w-sm gap-2 text-xs text-gray-300">
          <span className="min-w-[35px] text-right">
            {formatTime((progress / 100) * duration)}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #8b5cf6 ${progress}%, #374151 ${progress}%, #374151 100%)`
              }}
            />
          </div>
          <span className="min-w-[35px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Sección Derecha: Controles adicionales */}
      <div className="w-1/3 flex justify-end items-center gap-4">
        <button
          onClick={closePlayer}
          className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50"
          aria-label="Cerrar reproductor"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
