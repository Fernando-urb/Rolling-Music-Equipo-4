import { useState } from "react";
import Buscador from "./Buscador";
import Button from "./Button";
import { useModals } from "../../hook/useAuth";
import { useAuth } from "../../hook/useAuth";
import { FiChevronDown, FiUser, FiSettings, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { LOGO_VMUSIC } from "../../constants/imagenes";

const logo = LOGO_VMUSIC[0];
const INICIO_SESION = "Iniciar Sesión";
const REGISTRARSE = "Registrarse";
const CERRAR_SESION = "Cerrar Sesión";

function Header({ onOpenSidebar }) {
  const { openLogin, openRegister } = useModals();
  const { isAuthenticated, user, logout } = useAuth();

  // Estados locales
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    closeUserMenu();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-zinc-100 text-sm py-4 dark:bg-black ">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="w-full flex items-center gap-x-4">
          {/* Logo y Menu Button */}
          <div className="flex items-center  gap-1">
            <button
              onClick={onOpenSidebar}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Abrir menú"
            >
              <img src={logo.src} alt={logo.alt} width={35} />
            </button>

            {/* Logo - Agregar tu logo aquí */}
            <div className="flex items-center gap-1">
              <span className="text-xl md:text-2xl font-bold px-1 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Sound-Music
              </span>
            </div>
          </div>

          {/* Buscador (solo si está autenticado) */}
          {isAuthenticated && (
            <div className="flex-1 max-w-2xl hidden md:block">
              <Buscador />
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 ml-auto">
            {!isAuthenticated ? (
              // Usuario NO autenticado
              <>
                <Button onClick={openLogin} className="hidden lg:inline-flex">
                  {INICIO_SESION}
                </Button>
                <Button
                  onClick={openRegister}
                  variant="primary"
                  className="hidden lg:inline-flex  "
                >
                  {REGISTRARSE}
                </Button>
              </>
            ) : (
              // Usuario autenticado
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-600"
                    src={user?.photoURL || "https://i.blogs.es/dc6737/unnamed/1366_2000.png"}
                    alt="Foto de perfil"
                  />
                  <FiChevronDown
                    className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Overlay para cerrar al hacer click fuera */}
                    <div className="fixed inset-0 z-40" onClick={closeUserMenu}></div>

                    {/* Menu Content */}
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-xl z-50">
                      {/* User Info */}
                      <div className="py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                        <span className="block font-medium text-gray-800 dark:text-neutral-300">
                          {user?.userName || "Usuario"}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-neutral-500">{user?.email}</p>
                      </div>

                      {/* Theme Selector */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
                        <div className="flex justify-between items-center gap-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-neutral-400">Tema</span>
                        </div>
                        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                          <button
                            onClick={() => handleThemeChange("light")}
                            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm transition-colors ${
                              theme === "light"
                                ? "bg-white dark:bg-neutral-700 shadow-sm"
                                : "hover:bg-gray-200 dark:hover:bg-neutral-700"
                            }`}
                            title="Modo claro"
                          >
                            <FiSun className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleThemeChange("dark")}
                            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm transition-colors ${
                              theme === "dark"
                                ? "bg-white dark:bg-neutral-700 shadow-sm"
                                : "hover:bg-gray-200 dark:hover:bg-neutral-700"
                            }`}
                            title="Modo oscuro"
                          >
                            <FiMoon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1">
                        <button
                          onClick={closeUserMenu}
                          className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <FiUser className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={closeUserMenu}
                          className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <FiSettings className="w-4 h-4" />
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          {CERRAR_SESION}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
