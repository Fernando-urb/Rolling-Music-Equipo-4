import MainLayout from "../components/MainC/MainLayout";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center 
                    bg-gray-300 border border-gray-200 shadow-xs rounded-lg bg-linear-to-b 
                    dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 
                    text-gray-800 dark:text-gray-100 transition-colors duration-500"
    >
      <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-500 to-purple-600  dark:from-blue-500 to-purple-600 drop-shadow-[0_0_25px_rgba(139,92,246,0.8)]">
        404
      </h1>

      <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800 dark:text-white">
        Ups... página no encontrada
      </p>

      <p className="text-gray-800 dark:text-white mt-2 mb-8 max-w-md">
        Parece que te perdiste entre los acordes 🎵. No te preocupes, podés volver al inicio.
      </p>

      <Link
        to="/"
        className="px-4 py-3 text-center uppercase text-white rounded-lg shadow-lg block 
          bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 
          hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 
          transition duration-500 ease-in-out"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
