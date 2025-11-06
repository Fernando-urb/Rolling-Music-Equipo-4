import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/deezerApi";
import GenreCard from "../components/Ui/GenreCard";
import { gradientStyles } from "../constants/NavLinkConst";
import PageHeader from "../components/Ui/PageSection";

function Generos() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      const genreData = await getGenres();
      const styledGenres = genreData.map((genre, index) => ({
        ...genre,
        linear: gradientStyles[index % gradientStyles.length],
      }));

      setGenres(styledGenres); // ✅ Usamos los géneros con estilos
      setIsLoading(false);
    };
    fetchGenres();
  }, []);

  // MODIFICADO: Ahora navega directamente a la página 404
  const handleGenreClick = (genreId) => {
    console.log("📍 Redirigiendo a 404 por género ID:", genreId);
    navigate(`/404`); // <--- CAMBIO AQUÍ
  };

  return (
    <div className="p-4 sm:p-6">
      <PageHeader title="Géneros" />

      {isLoading ? (
        <p className="text-gray-400">Cargando géneros...</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <li key={genre.id}>
              <GenreCard
                genre={genre}
                onClick={handleGenreClick}
                className={`bg-gradient-to-br ${genre.linear}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Generos;
