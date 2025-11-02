// src/context/useFavorites.js
import { useContext } from "react";
import { FavoritesContext } from "./FavoritesProvider";

export const useFavorites = () => useContext(FavoritesContext);
