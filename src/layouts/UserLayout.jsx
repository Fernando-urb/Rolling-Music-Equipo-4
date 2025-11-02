import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../hook/useAuth";
import { usePlayer } from "../hook/useAuth";

import { SearchProvider } from "../context/SearchContext";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { isPlayerVisible } = usePlayer();
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
    <SearchProvider>
      <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900 ${
        isAuthenticated && isPlayerVisible ? 'pb-[76px]' : ''
      }`}>
        <Header onOpenSidebar={handleOpenSidebar} />
        <div className="flex flex-1 pt-16">
          {isAuthenticated && <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />}
          <main className="flex-1">{children}</main>
        </div>
        {/* Reproductor de música */}
        {isAuthenticated && <MusicPlayer />}
      </div>
    </SearchProvider>
  );
}

export default UserLayout;
