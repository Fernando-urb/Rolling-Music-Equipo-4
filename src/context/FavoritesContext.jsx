import { useState } from "react";
import { FavoritesContext } from "../utils/FavoritesContext";

export const FavoritesProvider = ({ children }) => {
  const [isFavoritosOpen, setIsFavoritosOpen] = useState(false);
  const [isPlaylistsOpen, setIsPlaylistsOpen] = useState(false);
  const [isCrearPlaylistOpen, setIsCrearPlaylistOpen] = useState(false);

  const value = {
    isFavoritosOpen,
    isPlaylistsOpen,
    isCrearPlaylistOpen,
    showFavoritos: () => setIsFavoritosOpen(true),
    hideFavoritos: () => setIsFavoritosOpen(false),
    showPlaylists: () => setIsPlaylistsOpen(true),
    hidePlaylists: () => setIsPlaylistsOpen(false),
    showCrearPlaylist: () => setIsCrearPlaylistOpen(true),
    hideCrearPlaylist: () => setIsCrearPlaylistOpen(false),
    modalsState: {
      showFavoritos: isFavoritosOpen,
      showPlaylists: isPlaylistsOpen,
      showCrearPlaylist: isCrearPlaylistOpen,
    },
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
