import { useState, useEffect } from "react";
import { getFavorites, toggleFavorite } from "../utils/favoritos";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos al montar el componente
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Función para alternar favorito
  const handleToggleFavorite = (trackId) => {
    const newFavorites = toggleFavorite(trackId);
    setFavorites(newFavorites);
    return newFavorites;
  };

  // Función para verificar si es favorito
  const checkIsFavorite = (trackId) => {
    return favorites.includes(trackId);
  };

  // Función para obtener cantidad de favoritos
  const getFavoritesCount = () => {
    return favorites.length;
  };

  // Función para refrescar favoritos
  const refreshFavorites = () => {
    setFavorites(getFavorites());
  };

  return {
    favorites,
    toggleFavorite: handleToggleFavorite,
    isFavorite: checkIsFavorite,
    favoritesCount: getFavoritesCount(),
    refreshFavorites,
  };
};

export default useFavorites;
