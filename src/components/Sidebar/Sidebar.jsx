import Button from "../Header/Button";
import { PAGES_NAVIGATE, PAGES_MUSICA, FOOTER_LINKS } from "../../constants/NavLinkConst";
import { useAuth } from "../../hook/useAuth"; // 1. IMPORTAR useAuth
import { useModals } from "../../hook/useAuth"; // 2. IMPORTAR useModals (para el botón de login móvil)

function Sidebar() {
  // 3. OBTENER ESTADOS
  const { isAuthenticated } = useAuth();
  const { openLogin } = useModals();

  // 4. ELIMINAMOS handleLogin y INICIO_SESION
  // const handleLogin = () => { ... };
  // const INICIO_SESION = "Iniciar Sesión";

  const NavLinks = (items) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            className="flex items-center p-2 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      id="hs-pro-sidebar"
      className="hs-overlay [--body-scroll:true] lg:[--overlay-backdrop:false] [--is-layout-affect:true] [--opened:lg] [--auto-close:lg]
hs-overlay-open:translate-x-0 lg:hs-overlay-layout-open:translate-x-0
-translate-x-full transition-all duration-300 transform
w-60
hidden
fixed inset-y-0 lg:inset-y-5 z-60 start-0
bg-zinc-100
lg:block lg:-translate-x-full lg:end-auto lg:bottom-0
dark:bg-neutral-900"
      role="dialog"
      tabIndex="-1" // <-- Corregí el 'tabindex' a 'tabIndex'
      aria-label="Sidebar"
    >
      <div className="lg:pt-13 relative flex flex-col h-full max-h-full">
        <nav className="p-3 size-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="lg:hidden mb-2 flex items-center justify-between">
            {/* 5. Conectamos el botón de login móvil */}
            {!isAuthenticated && <Button onClick={openLogin}>Iniciar Sesión</Button>}

            <button
              type="button"
              className="p-1.5 size-7.5 inline-flex items-center gap-x-1 text-xs rounded-md text-gray-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden dark:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-pro-sidebar"
              data-hs-overlay="#hs-pro-sidebar"
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Sidebar Toggle</span>
            </button>
          </div>

          <div className="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
            <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500 dark:text-neutral-500">
              Pages
            </span>

            {NavLinks(PAGES_NAVIGATE)}
          </div>

          {/* 6. RENDERIZADO CONDICIONAL DE "TU MUSICA" */}
          {isAuthenticated && (
            <div className="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
              <span className="block ps-2.5 mb-2 font-medium text-xs uppercase text-gray-500 dark:text-neutral-500">
                TU MUSICA
              </span>

              {NavLinks(PAGES_MUSICA)}
            </div>
          )}
        </nav>

        <footer className="mt-auto p-3 flex flex-col">{NavLinks(FOOTER_LINKS)}</footer>
      </div>
    </div>
  );
}

export default Sidebar;
