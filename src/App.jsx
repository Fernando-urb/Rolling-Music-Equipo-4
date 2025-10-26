import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

// Componentes principales
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Error403 from "./pages/Error403";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import { ModalProvider } from "./context/ModalContext";

// Rutas organizadas
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <ModalProvider>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Página de error 403 */}
          <Route path="/error/403" element={<Error403 />} />

          {/* Rutas de Admin (sin layout) */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Rutas de Usuario (con layout) - Debe ir al final */}
          <Route path="/*" element={<UserRoutes />} />
        </Routes>

        {/* Modals - Solo mostrar si no es página de admin */}
        {!isAdminPage && (
          <>
            <LoginModal />
            <RegisterModal />
          </>
        )}

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
