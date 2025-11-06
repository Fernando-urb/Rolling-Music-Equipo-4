import { useState, useEffect } from "react";
import { toggleFavorite, isFavorite as checkIsFavorite } from "../../utils/favoritos";
import { HeartPlus, HeartMinus, CirclePlus, Play } from "lucide-react";
import { usePlayer } from "../../hook/usePlayer";
import { toast } from "react-toastify";

export default function TrackCard({ track, onAddToPlaylist }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { playTrack } = usePlayer();

  useEffect(() => {
    setIsFavorite(checkIsFavorite(track.id));
  }, [track.id]);

  const handleToggleFavorite = () => {
    toggleFavorite(track.id);
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    toast[newFavoriteState ? "success" : "info"](
      `"${track.name}" ${newFavoriteState ? "agregada a favoritos ❤️" : "removida de favoritos"}`,
      { position: "bottom-right", autoClose: 2000 }
    );
  };

  return (
    <div className="bg-black/50 rounded-xl shadow-lg p-4 w-full h-[220px] lg:w-[200px] lg:h-[220px] flex flex-col justify-between text-white">
      {/* Imagen */}
      <img
        src={track.album?.images?.[0]?.url || track.cover || "https://via.placeholder.com/270"}
        alt={track.name || "Track"}
        className="rounded-xl w-full h-24 object-cover mb-2"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/270x270/f0f0f0/999999?text=♪";
        }}
      />

      {/* Contenido */}
      <div className="text-center mb-2 flex-grow overflow-hidden">
        <h4 className="text-sm font-bold truncate">{track.name || track.title}</h4>
        <p className="text-xs text-gray-200 truncate">
          {track.artists?.map((a) => a.name).join(", ") || track.artist || "Artista desconocido"}
        </p>
        {track.album?.name && <p className="text-xs text-gray-300 truncate">{track.album.name}</p>}
      </div>

      {/* Botones */}
      <div className="flex gap-3 justify-center">
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
          onClick={() => onAddToPlaylist && onAddToPlaylist(track.id)}
          title="Agregar a playlist"
        >
          <CirclePlus />
        </button>
        {track.preview_url && (
          <button
            className="text-pink-300 hover:text-pink-500 text-xl transition-all duration-200 hover:scale-110"
            onClick={() => playTrack(track)}
            title="Escuchar preview"
          >
            <Play />
          </button>
        )}
      </div>
    </div>
  );
}
