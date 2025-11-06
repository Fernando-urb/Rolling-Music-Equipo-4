import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularTracks, getPopularAlbums, getGenres } from "../services/deezerApi";
import { useSearch } from "../hook/useAuth";
import HomeSection from "../components/common/HomeSection";
import GenreCard from "../components/common/GenreCard";
import AlbumCardHome from "../components/cards/AlbumCardHome";
import TrackCardSmalll from "../components/cards/TrackCardSmalll";

function Home() {
  const { searchResults, isLoading, hasSearched } = useSearch();
  const [popularTracks, setPopularTracks] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const navigate = useNavigate();

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
          setGenres(genresData);
        } catch (error) {
          console.error("Error al cargar datos del Home:", error);
        } finally {
          setIsLoadingData(false);
        }
      };

      loadHomeData();
    }
  }, [hasSearched]);

  const renderTrackList = (tracks) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <div key={track.id} className="flex justify-center">
          <TrackCardSmalll track={track} />
        </div>
      ))}
    </div>
  );

  return (
    // <MainLayout>
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

      {!hasSearched && (
        <div>
          {isLoadingData ? (
            <p className="text-gray-600 dark:text-gray-400 px-4 sm:px-6">Cargando...</p>
          ) : (
            <div>
              {/* Carrusel de Géneros - Sin cambios */}
              <HomeSection title="Explorar Géneros" href="/generos">
                {genres.map((genre) => (
                  <GenreCard
                    key={genre.id}
                    genre={genre}
                    // Ahora navega a la página de lista de géneros.
                    onClick={() => navigate("/generos")}
                  />
                ))}
              </HomeSection>

              {/* Carrusel de Populares del momento - Sin cambios */}
              <HomeSection title="Populares del momento">
                {popularTracks.map((track) => (
                  <TrackCardSmalll key={track.id} track={track} />
                ))}
              </HomeSection>

              {/* Carrusel de Álbumes Populares - USANDO AlbumCardHome */}
              <HomeSection title="Álbumes Populares" href="/albumes">
                {popularAlbums.map((album) => (
                  <AlbumCardHome // <--- USAMOS AlbumCardHome
                    key={album.id}
                    album={album}
                  />
                ))}
              </HomeSection>
            </div>
          )}
        </div>
      )}
    </div>
    // </MainLayout>
  );
}

export default Home;
