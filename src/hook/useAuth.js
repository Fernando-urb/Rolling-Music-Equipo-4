// src/hook/useAuth.js
import { createContext, useContext } from "react";

// --- Autenticación ---
export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

// --- Modales ---
export const ModalContext = createContext();
export const useModals = () => {
  return useContext(ModalContext);
};

// --- Búsqueda (NUEVO) ---
export const SearchContext = createContext();
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  }
  return context;
};

// --- Reproductor (NUEVO) ---
export const PlayerContext = createContext();
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer debe ser usado dentro de un PlayerProvider");
  }
  return context;
};
