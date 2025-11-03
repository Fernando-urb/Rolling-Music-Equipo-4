import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import { getGenres } from "../services/deezerApi";
import GenreCard from "../components/common/GenreCard";

function Generos() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      const genreData = await getGenres();
      setGenres(genreData);
      setIsLoading(false);
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    console.log("📍 Navegando a género ID:", genreId);
    navigate(`/genero/${genreId}`);
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Géneros</h1>

        {isLoading ? (
          <p className="text-gray-400">Cargando géneros...</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <li key={genre.id}>
                <GenreCard genre={genre} onClick={handleGenreClick} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}

export default Generos;
