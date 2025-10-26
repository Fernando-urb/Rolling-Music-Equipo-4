import { useEffect } from "react";
import Button from "../Header/Button";
import { PAGES_NAVIGATE, PAGES_MUSICA, FOOTER_LINKS } from "../../constants/NavLinkConst";
import { useAuth } from "../../hook/useAuth";
import { useModals } from "../../hook/useAuth";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const { isAuthenticated } = useAuth();
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

  // ...existing code...

  const NavLinks = (items) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            onClick={onClose}
            className="flex items-center p-3 text-sm font-medium text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  // ...existing code...

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menú</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Cerrar menú"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Login Button (no autenticado) */}
            {!isAuthenticated && (
              <div className="mb-4">
                <Button onClick={openLogin} fullWidth>
                  Iniciar Sesión
                </Button>
              </div>
            )}

            {/* Pages Section */}
            <div className="mb-6">
              <span className="block px-3 mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-neutral-500">
                Pages
              </span>
              {NavLinks(PAGES_NAVIGATE)}
            </div>

            {/* Tu Música Section (solo si está autenticado) */}
            {isAuthenticated && (
              <div className="mb-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                <span className="block px-3 mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-neutral-500">
                  Tu Música
                </span>
                {NavLinks(PAGES_MUSICA)}
              </div>
            )}
          </nav>

          {/* Footer Links */}
          <footer className="p-4 border-t border-gray-200 dark:border-neutral-700">
            {NavLinks(FOOTER_LINKS)}
          </footer>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
