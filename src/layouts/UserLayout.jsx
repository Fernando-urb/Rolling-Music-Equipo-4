import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../hook/useAuth";

import { SearchProvider } from "../context/SearchContext";
// 1. IMPORTAR EL PLAYERPROVIDER Y MUSICPLAYER
import { PlayerProvider } from "../context/PlayerContext";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer"; // Ajusta la ruta si es diferente

function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    // 2. ENVOLVER TODO CON AMBOS PROVIDERS
    <SearchProvider>
      <PlayerProvider>
        {" "}
        {/* <--- AHORA ENVOLVEMOS CON PLAYERPROVIDER */}
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 pb-[76px]">
          {" "}
          {/* Añade padding-bottom para el reproductor */}
          <Header onOpenSidebar={handleOpenSidebar} />
          <div className="flex flex-1 pt-16">
            {isAuthenticated && <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />}

            <main className="flex-1">{children}</main>
          </div>
          {/* 3. AÑADIR EL REPRODUCTOR AL FINAL DEL LAYOUT */}
          {isAuthenticated && <MusicPlayer />}
        </div>
      </PlayerProvider>
    </SearchProvider>
  );
}

export default UserLayout;
