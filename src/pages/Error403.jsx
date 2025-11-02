import { useNavigate } from "react-router-dom";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

function Error403() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-to from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <ShieldX className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-6xl font-bold bg-gradient-t from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
          403
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceso Denegado</h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          No tienes permisos de administrador para acceder a esta página. Si crees que esto es un
          error, contacta al administrador del sistema.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Home className="w-4 h-4" />
            Ir al Inicio
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-400">
            <strong>Código de error:</strong> 403 - Forbidden
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error403;
