import { useContext } from "react";
import { FavoritesContext } from "../utils/FavoritesContext";
export const useModalFav = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useModalFav debe ser usado dentro de FavoritesProvider");
  }
  return context;
};
