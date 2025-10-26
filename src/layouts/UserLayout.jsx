import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../hook/useAuth";

function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;

  // Cerrar sidebar al cambiar de ruta
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
      <Header onOpenSidebar={handleOpenSidebar} />

      <div className="flex flex-1 pt-16">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default UserLayout;
