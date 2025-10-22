import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID; // Debe tener valor
const clientSecret = import.meta.env.VITE_CLIENT_SECRET; // Debe tener valor

const Buscador = () => {
  const [buscadorInput, setBuscadorInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const credentials = btoa(`${clientId}:${clientSecret}`);

    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // El formato es 'Basic ' seguido de la cadena Base64
        Authorization: `Basic ${credentials}`,
      },
      // Solo necesitas el grant_type en el body si usas el Header Basic
      // o Client ID y Secret si no usas Basic. Usaremos Basic, por simplicidad.
      body: "grant_type=client_credentials",
    };

    // NOTA: Tu endpoint original usaba el cuerpo de la petición para las credenciales,
    // que es la segunda forma. Aquí corregimos para usar el Header Authorization (más estándar).
    // También, tu grant_type estaba mal escrito: "client_credencial" -> "client_credentials"
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        if (data.access_token) {
          setAccessToken(data.access_token);
          setError(null);
        } else {
          console.error("Error al obtener el token:", data);
          setError("No se pudo obtener el token de acceso. Revisa tus credenciales.");
        }
      })
      .catch((err) => {
        console.error("Error de red al obtener el token:", err);
        setError("Error de red al conectar con Spotify para la autenticación.");
      });
  }, []);

  async function buscar(event) {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    if (event) {
      event.preventDefault();
    }

    // Asegurar que hay token y texto de búsqueda
    if (!accessToken) {
      setError("El token de acceso no está disponible. Intenta refrescar.");
      return;
    }
    if (!buscadorInput.trim()) {
      alert("Por favor, introduce un término de búsqueda.");
      return;
    }

    // El endpoint correcto para buscar es /search, no para obtener solo el artista ID
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(buscadorInput)}&type=track&limit=10`;

    let searchParams = {
      method: "GET",
      headers: {
        // "content-type": "application/json" no es necesario en una petición GET
        // La clave de autorización estaba mal escrita: "Authorrization" -> "Authorization"
        Authorization: `Bearer ${accessToken}`, // Concatenar sin espacio extra
      },
    };

    try {
      const response = await fetch(searchEndpoint, searchParams);
      const data = await response.json();

      if (data.tracks && data.tracks.items) {
        setResultados(data.tracks.items); // Guardar el array de canciones
        setError(null);
        console.log("Resultados de búsqueda:", data.tracks.items);
      } else if (data.error) {
        setError(`Error de la API: ${data.error.message}`);
        setResultados([]);
      } else {
        setResultados([]);
        setError("No se encontraron resultados o la respuesta no es válida.");
      }
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      setError("Ocurrió un error al buscar canciones.");
    }
  }

  return (
    <form onSubmit={buscar} className="relative max-w-sm">
      <label htmlFor="icon" className="sr-only">
        Buscar
      </label>
      <div className="relative">
        {/* ... (Tu código SVG y estilo visual) ... */}
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <svg
            className="shrink-0 size-4 text-gray-400 dark:text-neutral-500"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="search"
          id="icon"
          name="search"
          // Eliminamos el onKeyDown y usamos onSubmit en el form para simplicidad
          // Si quieres mantener el Enter, asegúrate que llame a buscar
          onChange={(event) => setBuscadorInput(event.target.value)}
          className="py-2.5 ps-10 pe-4 block w-full rounded-lg text-sm disabled:pointer-events-none bg-white border border-gray-200 text-gray-600 shadow-xs hover:border-gray-300 focus:outline-hidden focus:border-gray-300 disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
          placeholder="Buscar canciones o artistas..."
        />
        {/* Usar type="submit" para que funcione con onSubmit del form */}
        <button type="submit" className="ml-2 px-3 py-2 bg-green-500 text-white rounded-lg">
          Buscar
        </button>
      </div>

      {/* Visualización de errores */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Visualización de resultados (básica) */}
      <div className="mt-4">
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((track) => (
              <li key={track.id} className="border-b py-2">
                <strong>{track.name}</strong> - {track.artists.map((a) => a.name).join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          buscadorInput.trim() && !error && <p>No hay canciones para mostrar.</p>
        )}
      </div>
    </form>
  );
};

export default Buscador;
