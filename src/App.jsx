import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";

// --- ¡CORRECCIÓN AQUÍ! ---
// La ruta estaba incorrecta, probablemente era "./" en lugar de "../src/"
import { PlayerProvider } from "./context/PlayerContext";

// Componentes que se cargan inmediatamente (críticos)
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import { ModalProvider } from "./context/ModalContext";

// Lazy loading para componentes no críticos
const Landing = lazy(() => import("./pages/Landing"));
const Error403 = lazy(() => import("./pages/Error403"));
const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

// Componente de loading global
const GlobalLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gradient-to-r from-pink-600 to-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando Sound-Music...</p>
    </div>
  </div>
);

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
        {/* Tu provider está en el lugar correcto, envolviendo las rutas */}
        <PlayerProvider>
          <Suspense fallback={<GlobalLoadingSpinner />}>
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
          </Suspense>
        </PlayerProvider>

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