import { useState, useEffect } from "react";
import { usePlayer } from "../../hook/usePlayer";
import { toggleFavorite, isFavorite as checkIsFavorite } from "../../utils/favoritos";
import { Play, Pause, HeartPlus, HeartMinus, CirclePlus } from "lucide-react";

function TrackCardSmall({ track, onAddToPlaylist }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false);

  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;
  const imageUrl = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || "";

  useEffect(() => {
    setIsFavorite(checkIsFavorite(track.id));
  }, [track.id]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(track.id);
    setIsFavorite((prev) => !prev);
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    onAddToPlaylist?.(track.id);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    playTrack(track);
  };

  if (!track || !track.album || !track.artists) {
    console.warn("TrackCardSmall: Se omitió un track por datos incompletos", track);
    return null;
  }

  return (
    <div
      className={`flex-shrink-0 w-48 h-[220px] flex flex-col justify-between p-3 
             rounded-lg shadow-sm cursor-pointer transition-all duration-300 
             bg-black/50 hover:bg-black/70 hover:shadow-lg ${isCurrentTrack ? "scale-[1.02] border-2 border-transparent" : ""}`}
      onClick={() => playTrack(track)}
      title={`${track.name} - ${track.artists[0].name}`}
    >
      {/* Imagen + Ping */}
      <div className="relative w-full h-24 mb-2">
        <img
          src={imageUrl}
          alt={track.album.name}
          className="w-full h-full rounded-md object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/270x270/f0f0f0/999999?text=♪";
          }}
        />
        {isCurrentlyPlaying && (
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="overflow-hidden text-center mb-2">
        <p className="font-semibold text-white truncate">{track.name}</p>
        <p className="text-sm text-gray-400 truncate">{track.artists[0].name}</p>
        {track.album?.name && <p className="text-xs text-gray-500 truncate">{track.album.name}</p>}
      </div>

      {/* Botones */}
      <div className="flex gap-2 justify-center ">
        <button
          className={`text-xl transition-all duration-200 hover:scale-110 ${
            isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-500"
          }`}
          onClick={handleToggleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? <HeartMinus /> : <HeartPlus />}
        </button>
        <button
          className="text-blue-300 hover:text-blue-500 text-xl transition-all duration-200 hover:scale-110"
          onClick={handleAddToPlaylist}
          title="Agregar a playlist"
        >
          <CirclePlus />
        </button>
        <button
          className="text-pink-300 hover:text-pink-500 text-xl transition-all duration-200 hover:scale-110"
          onClick={handlePlay}
          title={isCurrentlyPlaying ? "Pausar" : "Reproducir"}
        >
          {isCurrentlyPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
}

export default TrackCardSmall;
