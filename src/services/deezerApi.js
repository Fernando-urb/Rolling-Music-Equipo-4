const DEEZER_API = "https://api.deezer.com";
const CORS_PROXY = "https://corsproxy.io/?";



const transformTrack = (track) => ({
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
});



// Buscar música
export const searchMusic = async (query) => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/search?q=${encodeURIComponent(query)}&limit=10`)}`
    );
    const data = await response.json();
    console.log("Resultados de búsqueda:", data);

    return data.data?.map(transformTrack) || [];
  } catch (error) {
    console.error("Error al buscar:", error);
    return [];
  }
};

// Obtener canciones populares del chart
export const getPopularTracks = async () => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${DEEZER_API}/chart/0/tracks?limit=20`)}`
    );
    const data = await response.json();
    console.log("Canciones populares:", data);

    return data.data?.map(transformTrack) || [];
  } catch (error) {
    console.error("Error al obtener populares:", error);
    return [];
  }
};
