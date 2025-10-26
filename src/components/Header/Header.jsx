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
            <div className="flex-1 max-w-xs sm:max-w-md md:max-w-2xl">
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
                  className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="relative">
                    <img
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover border-2 border-gradient-to-r from-pink-400 to-purple-500 shadow-md"
                      src={user?.photoURL || "https://i.blogs.es/dc6737/unnamed/1366_2000.png"}
                      alt="Foto de perfil"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  </div>
                  <FiChevronDown
                    className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-600 dark:text-gray-400 transition-all duration-300 ${isUserMenuOpen ? "rotate-180 text-pink-600 dark:text-pink-400" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Overlay para cerrar al hacer click fuera */}
                    <div className="fixed inset-0 z-40" onClick={closeUserMenu}></div>

                    {/* Menu Content */}
                    <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="relative">
                            <img
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-pink-400 shadow-lg"
                              src={user?.photoURL || "https://i.blogs.es/dc6737/unnamed/1366_2000.png"}
                              alt="Foto de perfil"
                            />
                            <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                              {user?.userName || "Usuario"}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                              {user?.email}
                            </p>
                            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                              En línea
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Theme Selector */}
                      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex justify-between items-center gap-2 mb-2 sm:mb-3">
                          <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Apariencia</span>
                        </div>
                        <div className="flex gap-1 sm:gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                          <button
                            onClick={() => handleThemeChange("light")}
                            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${theme === "light"
                                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                                : "text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
                              }`}
                            title="Modo claro"
                          >
                            <FiSun className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span className="hidden sm:inline">Claro</span>
                          </button>
                          <button
                            onClick={() => handleThemeChange("dark")}
                            className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${theme === "dark"
                                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                                : "text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400"
                              }`}
                            title="Modo oscuro"
                          >
                            <FiMoon className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span className="hidden sm:inline">Oscuro</span>
                          </button>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2 sm:p-3">
                        <button
                          onClick={closeUserMenu}
                          className="w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50"
                        >
                          <FiUser className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span>Mi Perfil</span>
                        </button>
                        <button
                          onClick={closeUserMenu}
                          className="w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50"
                        >
                          <FiSettings className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span>Configuración</span>
                        </button>
                        <div className="my-2 border-t border-gray-200/50 dark:border-gray-700/50"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-red-200/50 dark:hover:border-red-700/50"
                        >
                          <FiLogOut className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span>{CERRAR_SESION}</span>
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
