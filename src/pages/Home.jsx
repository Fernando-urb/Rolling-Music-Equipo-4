import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularTracks, getPopularAlbums, getGenres } from "../services/deezerApi";
import { useSearch } from "../hook/useAuth";
import HomeSection from "../components/Ui/HomeSection";
import GenreCard from "../components/Ui/GenreCard";
import AlbumCardHome from "../components/cards/AlbumCardHome";
import TrackCardSmalll from "../components/cards/TrackCardSmalll";
import { gradientStyles } from "../constants/NavLinkConst";
import PageHeader from "../components/Ui/PageSection";

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

          const styledGenres = genresData.map((genre, index) => ({
            ...genre,
            linear: gradientStyles[index % gradientStyles.length],
          }));

          setPopularTracks(tracksData);
          setPopularAlbums(albumsData);
          setGenres(styledGenres);
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
              <PageHeader title="Explora por género" />
              <HomeSection title="" href="/generos">
                {genres.map((genre) => (
                  <GenreCard
                    key={genre.id}
                    genre={genre}
                    onClick={() => navigate(`/generos/${genre.id}`)}
                  />
                ))}
              </HomeSection>
              <PageHeader title="Populares del momento" />

              {/* Carrusel de Populares del momento - Sin cambios */}
              <HomeSection title="">
                {popularTracks.map((track) => (
                  <TrackCardSmalll key={track.id} track={track} />
                ))}
              </HomeSection>

              {/* Carrusel de Álbumes Populares - USANDO AlbumCardHome */}
              <PageHeader title="Álbumes Populares" />

              <HomeSection title="" href="/albumes">
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
