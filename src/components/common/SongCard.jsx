import React from "react";

/**
 * Componente de tarjeta de canción.
 * Recibe un objeto 'track' (con el formato transformado de tu deezerApi.js)
 * y una función 'onPlay'.
 */
function SongCard({ track, onPlay }) {
  // --- Adaptado a tu deezerApi.js ---
  // Asegurarnos de que 'track' y sus propiedades existen.
  if (!track || !track.album || !track.artists || track.artists.length === 0) {
    return null;
  }

  // Extraemos la información del objeto 'track' transformado
  // Usamos images[1] (cover_big) o images[2] (cover_medium)
  // Añadimos '?' (optional chaining) por si acaso la imagen no existe.
  const imageUrl = track.album.images[2]?.url || track.album.images[1]?.url || "";
  const title = track.name;
  const artistName = track.artists[0].name;
  // --- Fin de la adaptación ---

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(track);
    }
  };

  return (
    <div
      onClick={handlePlayClick}
      className="flex items-center p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors duration-200"
    >
      {/* Imagen de la carátula */}
      <img
        src={imageUrl}
        alt={`Carátula de ${title}`}
        className="w-12 h-12 rounded-md object-cover mr-4"
      />

      {/* Información de la canción */}
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{artistName}</p>
      </div>
    </div>
  );
}

export default SongCard;
