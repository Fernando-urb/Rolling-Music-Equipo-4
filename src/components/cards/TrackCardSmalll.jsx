import { usePlayer } from "../../hook/usePlayer";

function TrackCardSmall({ track }) {
  // Obtenemos la función para reproducir del hook
  const { playTrack } = usePlayer();

  // Asegurarnos de que el track tiene los datos mínimos
  if (!track || !track.album || !track.artists) {
    console.warn("TrackCardSmall: Se omitió un track por datos incompletos", track);
    return null; // No renderizar si el track está incompleto
  }

  // Fallback para la imagen (si no existe la imagen [2], usa la [0])
  const imageUrl = track.album.images?.[2]?.url || track.album.images?.[0]?.url || "";

  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 flex items-center p-3 
                 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-sm 
                 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 
                 transition-colors"
      onClick={() => playTrack(track)}
      title={`${track.name} - ${track.artists[0].name}`}
    >
      {/* Imagen */}
      <img
        src={imageUrl}
        alt={track.album.name}
        className="w-12 h-12 rounded-md mr-4 object-cover"
      />

      {/* Información */}
      <div className="overflow-hidden">
        <p className="font-semibold text-gray-800 dark:text-white truncate">{track.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{track.artists[0].name}</p>
      </div>
    </div>
  );
}

export default TrackCardSmall;
