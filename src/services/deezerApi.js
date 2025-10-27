// Servicio para interactuar con la API de Deezer (no requiere autenticación)
const DEEZER_API = "https://api.deezer.com";
const CORS_PROXY = "https://corsproxy.io/?";

// Buscar música
export const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=10`)}`
    );

    const data = await response.json();
    console.log("Resultados de búsqueda:", data);

    if (!data.data) {
      return [];
    }

    // Transformar datos de Deezer al formato que usamos
    return data.data.map((track) => ({
      id: track.id.toString(),
      name: track.title,
      artists: [{ name: track.artist.name }],
      album: {
        name: track.album.title,
        images: [
          { url: track.album.cover_xl || track.album.cover_big },
          { url: track.album.cover_big },
          { url: track.album.cover_medium },
        ],
      },
      preview_url: track.preview,
      external_url: track.link,
    }));
  } catch (error) {
    console.error("Error al buscar:", error);
    return [];
  }
};

// Obtener canciones populares del chart
export const getPopularTracks = async () => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/chart/0/tracks?limit=12`)}`
    );

    const data = await response.json();
    console.log("Canciones populares:", data);

    if (!data.data) {
      return [];
    }

    // Transformar datos de Deezer al formato que usamos
    return data.data.map((track) => ({
      id: track.id.toString(),
      name: track.title,
      artists: [{ name: track.artist.name }],
      album: {
        name: track.album.title,
        images: [
          { url: track.album.cover_xl || track.album.cover_big },
          { url: track.album.cover_big },
          { url: track.album.cover_medium },
        ],
      },
      preview_url: track.preview,
      external_url: track.link,
    }));
  } catch (error) {
    console.error("Error al obtener populares:", error);
    return [];
  }
};
