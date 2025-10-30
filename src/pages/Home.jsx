import { useState, useEffect } from "react";
import MainLayout from "../components/MainC/MainLayout";
import { getPopularTracks } from "../services/deezerApi";
import { useSearch } from "../hook/useAuth";
import { usePlayer } from "../hook/usePlayer";

function Home() {
  const { searchResults, isLoading, hasSearched } = useSearch();
  const [popularTracks, setPopularTracks] = useState([]);
  const [isPopularLoading, setIsPopularLoading] = useState(true);

  // 2. OBTENER playTrack DEL REPRODUCTOR
  const { playTrack } = usePlayer();

  useEffect(() => {
    (async () => {
      setIsPopularLoading(true);
      const tracks = await getPopularTracks();
      setPopularTracks(tracks);
      setIsPopularLoading(false);
    })();
  }, []);

  // Función para renderizar la lista de canciones (MODIFICADA)
  const renderTrackList = (tracks) => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <li
          key={track.id}
          className="flex items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={() => playTrack(track)} // 3. AÑADIR onClick para reproducir
        >
          <img
            src={track.album.images[2].url}
            alt={track.album.name}
            className="w-12 h-12 rounded-md mr-4"
          />
          <div className="overflow-hidden">
            <p className="font-semibold text-gray-800 dark:text-white truncate">{track.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {track.artists[0].name}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Explorar</h1>

        <div className="mt-8">
          {isLoading && <p className="text-gray-600 dark:text-gray-400">Buscando...</p>}

          {!isLoading && hasSearched && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Resultados de la búsqueda
              </h2>
              {searchResults.length > 0 ? (
                renderTrackList(searchResults)
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No se encontraron resultados.</p>
              )}
            </div>
          )}

          {!hasSearched && (
            <div>
              {isPopularLoading ? (
                <p className="text-gray-600 dark:text-gray-400">Cargando canciones populares...</p>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    Populares del momento
                  </h2>
                  {renderTrackList(popularTracks)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
