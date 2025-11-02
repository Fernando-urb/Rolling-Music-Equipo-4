import { useState, useEffect } from "react";
import MainLayout from "../components/MainC/MainLayout";
import { getPopularTracks, getPopularAlbums, getGenres } from "../services/deezerApi";
import { useSearch } from "../hook/useAuth";
import { usePlayer } from "../hook/usePlayer";
import HomeSection from "../components/common/HomeSection";
import GenreCard from "../components/common/GenreCard";
import AlbumCard from "../components/common/AlbumCard";
import TrackCardSmall from "../components/cards/TrackCardSmalll";

function Home() {
  const { searchResults, isLoading, hasSearched } = useSearch();
  const { playTrack } = usePlayer();

  // --- 3. ESTADOS ACTUALIZADOS ---
  const [popularTracks, setPopularTracks] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [genres, setGenres] = useState([]); // <-- ¡AQUÍ ESTÁ EL ERROR! Faltaba esta línea.
  const [isLoadingData, setIsLoadingData] = useState(true);

  // --- 4. USEEFFECT (Sin cambios, ahora funciona) ---
  useEffect(() => {
    if (!hasSearched) {
      const loadHomeData = async () => {
        setIsLoadingData(true);
        try {
          const [tracksData, albumsData, genresData] = await Promise.all([
            getPopularTracks(),
            getPopularAlbums(),
            getGenres(),
          ]);

          setPopularTracks(tracksData);
          setPopularAlbums(albumsData);
          setGenres(genresData); // <-- Esta línea ahora es válida
        } catch (error) {
          console.error("Error al cargar datos del Home:", error);
        } finally {
          setIsLoadingData(false);
        }
      };

      loadHomeData();
    }
  }, [hasSearched]);

  // --- 5. FUNCIÓN DE RENDER PARA BÚSQUEDA (Sin cambios) ---
  const renderTrackList = (tracks) => (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <li
          key={track.id}
          className="flex items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
          onClick={() => playTrack(track)}
        >
          <img
            src={track.album.images[2].url} // Cuidado: esto puede fallar si no hay imagen [2]
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

  // --- 6. RETURN (Sin cambios, ahora funciona) ---
  return (
    <MainLayout>
      <div className="pt-4 sm:pt-6">
        {/* --- SECCIÓN DE BÚSQUEDA --- */}
        {isLoading && <p className="text-gray-600 dark:text-gray-400 px-4 sm:px-6">Buscando...</p>}

        {!isLoading && hasSearched && (
          <div className="px-4 sm:px-6">
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

        {/* --- SECCIÓN HOME (Ahora debería funcionar) --- */}
        {!hasSearched && (
          <div>
            {isLoadingData ? (
              <p className="text-gray-600 dark:text-gray-400 px-4 sm:px-6">Cargando...</p>
            ) : (
              <div>
                {/* Nueva Sección: Géneros (Círculos) */}
                <HomeSection title="Explorar Géneros">
                  {genres.map(
                    (
                      genre // <-- Esta línea ahora es válida
                    ) => (
                      <GenreCard key={genre.id} genre={genre} />
                    )
                  )}
                </HomeSection>

                {/* Carrusel de Populares del momento */}
                <HomeSection title="Populares del momento">
                  {popularTracks.map((track) => (
                    <TrackCardSmall key={track.id} track={track} />
                  ))}
                </HomeSection>

                {/* Carrusel de Álbumes Populares */}
                <HomeSection title="Álbumes Populares">
                  {popularAlbums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                  ))}
                </HomeSection>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
