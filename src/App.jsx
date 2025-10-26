import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import SongDetail from "./pages/SongDetail";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import { ModalProvider } from "./context/ModalContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./hook/useAuth";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!user;
  const isLandingPage = location.pathname === "/";

  // Cerrar sidebar al cambiar de ruta
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Aplicar tema guardado al cargar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
      <ModalProvider>
      
        <Header onOpenSidebar={handleOpenSidebar} />

        <div className="flex flex-1 pt-16">
        
          {isAuthenticated && !isLandingPage && (
            <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
          )}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/songdetail/:id"
                element={
                  <ProtectedRoute>
                    <SongDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        {/* Modals */}
        <LoginModal />
        <RegisterModal />

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ModalProvider>
    </div>
  );
}

export default App;
