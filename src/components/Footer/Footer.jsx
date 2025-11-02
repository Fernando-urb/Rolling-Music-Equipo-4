import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
function Footer() {
  return (
    <footer className="bg-linear-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Línea separadora con degradado */}
      <div className="w-full h-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-70"></div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6 gap-4">
        {/* Derechos */}
        <p className="text-sm text-center md:text-left">
          © 2025 <span className="font-semibold">Sound-Music</span> — Todos los derechos reservados
        </p>

        {/* Link About */}
        <Link
          to="/about"
          className="relative text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
        >
          Sobre Nosotros
        </Link>

        {/* Redes sociales */}
        <div className="flex space-x-5">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 hover:scale-110 transition-all"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 hover:scale-110 transition-all"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-500 hover:scale-110 transition-all"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
