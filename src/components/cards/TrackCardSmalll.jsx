import { usePlayer } from "../../hook/usePlayer";
import { Play, Pause } from "lucide-react";

function TrackCardSmall({ track }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  if (!track || !track.album || !track.artists) {
    console.warn("TrackCardSmall: Se omitió un track por datos incompletos", track);
    return null;
  }

  const imageUrl = track.album.images?.[2]?.url || track.album.images?.[0]?.url || "";

  const baseClasses = `
    flex-shrink-0 w-72 sm:w-80 flex items-center p-3 
    rounded-lg shadow-sm cursor-pointer transition-all duration-300 relative
    bg-neutral-800 hover:bg-neutral-700 hover:shadow-lg
    ${isCurrentTrack ? "scale-[1.02] border-2 border-transparent" : ""} 
    `;

  const ActionIcon = isCurrentlyPlaying ? Pause : Play;

  return (
    <div
      className={baseClasses}
      onClick={() => playTrack(track)}
      title={`${track.name} - ${track.artists[0].name}`}
    >
      <div className="w-12 h-12 rounded-md mr-4 relative shrink-0">
        <img
          src={imageUrl}
          alt={track.album.name}
          className="w-full h-full rounded-md object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-md">
          <button
            className="bg-purple-500 hover:bg-purple-400 text-white rounded-full p-2 transition-transform transform hover:scale-110"
            aria-label={isCurrentlyPlaying ? "Pausar" : "Reproducir"}
            onClick={(e) => {
              e.stopPropagation();
              playTrack(track);
            }}
          >
            <ActionIcon size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <p className={`font-semibold text-white truncate`}>{track.name}</p>
        <p className="text-sm text-gray-400 truncate">{track.artists[0].name}</p>
      </div>

      {isCurrentlyPlaying && (
        <span className="absolute top-2 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>{" "}
          {/* Ping azulado */}
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>{" "}
          {/* Punto azulado */}
        </span>
      )}
    </div>
  );
}

export default TrackCardSmall;
