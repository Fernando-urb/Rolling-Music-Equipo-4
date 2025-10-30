function AlbumCard({ album, onClick }) {
  if (!album) return null;

  return (
    <div
      onClick={() => onClick(album.id)} // Pasa el ID del álbum al hacer clic
      className="flex flex-col p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <img
        src={album.image}
        alt={album.name}
        className="w-full h-auto rounded-md mb-3" // Carátula cuadrada
        style={{ aspectRatio: "1 / 1" }} // Mantiene la proporción 1:1
      />
      <div className="overflow-hidden">
        <p className="font-semibold text-gray-800 dark:text-white truncate">{album.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{album.artistName}</p>
      </div>
    </div>
  );
}

export default AlbumCard;
