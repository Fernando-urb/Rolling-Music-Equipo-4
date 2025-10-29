import { useEffect } from "react";
import Button from "../common/Button";
import { PAGES_NAVIGATE, PAGES_MUSICA, getFooterLinks } from "../../constants/NavLinkConst";
import { useAuth, useModals } from "../../hook/useAuth";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const { openLogin } = useModals();

  // Cerrar sidebar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const NavLinks = (items) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            onClick={onClose}
            className="group flex items-center p-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-[1.02] hover:shadow-md border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50"
          >
            <item.icon className="w-5 h-5 mr-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300" />
            <span className="font-medium">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sound-Music
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-200 hover:scale-105"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {/* Login Button (no autenticado) */}
            {!isAuthenticated && (
              <div className="mb-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl border border-pink-200/50 dark:border-pink-700/50">
                <Button
                  onClick={openLogin}
                  fullWidth
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Iniciar Sesión
                </Button>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
                  Navegación
                </span>
              </div>
              {NavLinks(PAGES_NAVIGATE)}
            </div>

            {isAuthenticated && (
              <div className="mb-8 pt-6 border-t border-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800">
                <div className="flex items-center mb-4">
                  <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full">
                    Tu Música
                  </span>
                </div>
                {NavLinks(PAGES_MUSICA)}
              </div>
            )}
          </nav>

          <footer className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50 to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20">
            <div className="mb-3">
              <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
                {isAdmin() ? "Admin & Info" : "Información"}
              </span>
            </div>
            {NavLinks(getFooterLinks(isAdmin()))}
          </footer>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
