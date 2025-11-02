function AlbumCard({ album }) {
  // Manejador para cuando se hace clic en el álbum
  const handlePlayAlbum = () => {
    console.log("Reproducir álbum (próximamente):", album.id);
    // Aquí, en el futuro, llamarías a una función de tu PlayerContext
    // que busque las canciones de este álbum y empiece a reproducirlas.
  };

  return (
    <div
      className="flex-shrink-0 w-40 sm:w-48 cursor-pointer group"
      onClick={handlePlayAlbum}
      title={`${album.name} - ${album.artistName}`}
    >
      {/* Imagen del Álbum */}
      <img
        src={album.image}
        alt={album.name}
        className="w-full h-40 sm:h-48 rounded-lg object-cover shadow-lg 
                   group-hover:opacity-80 transition-opacity"
      />

      {/* Información del Álbum */}
      <p className="font-semibold text-gray-800 dark:text-white truncate mt-2">{album.name}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{album.artistName}</p>
    </div>
  );
}

export default AlbumCard;
