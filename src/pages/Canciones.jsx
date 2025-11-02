import { useState, useEffect } from 'react';
import { Search, Music, Shuffle, Grid, List } from 'lucide-react';
import MainLayout from "../components/common/MainLayout";
import SongCard from '../components/common/SongCard';
import SpotifyCard from '../components/common/SpotifyCard';
import { getPopularTracks, searchMusic } from '../services/deezerApi';


function Canciones() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Datos de fallback si la API falla
  const getFallbackSongs = () => [
    {
      id: '1',
      name: 'Flowers',
      title: 'Flowers',
      artists: [{ name: 'Miley Cyrus' }],
      album: {
        name: 'Endless Summer Vacation',
        title: 'Endless Summer Vacation',
        images: [
          { url: 'https://picsum.photos/640/640?random=1' },
          { url: 'https://picsum.photos/300/300?random=1' },
          { url: 'https://picsum.photos/64/64?random=1' }
        ]
      },
      duration: 200,
      preview_url: null
    },
    {
      id: '2',
      name: 'Anti-Hero',
      title: 'Anti-Hero',
      artists: [{ name: 'Taylor Swift' }],
      album: {
        name: 'Midnights',
        title: 'Midnights',
        images: [
          { url: 'https://picsum.photos/640/640?random=2' },
          { url: 'https://picsum.photos/300/300?random=2' },
          { url: 'https://picsum.photos/64/64?random=2' }
        ]
      },
      duration: 201,
      preview_url: null
    },
    {
      id: '3',
      name: 'As It Was',
      title: 'As It Was',
      artists: [{ name: 'Harry Styles' }],
      album: {
        name: "Harry's House",
        title: "Harry's House",
        images: [
          { url: 'https://picsum.photos/640/640?random=3' },
          { url: 'https://picsum.photos/300/300?random=3' },
          { url: 'https://picsum.photos/64/64?random=3' }
        ]
      },
      duration: 167,
      preview_url: null
    },
    {
      id: '4',
      name: 'Unholy',
      title: 'Unholy',
      artists: [{ name: 'Sam Smith ft. Kim Petras' }],
      album: {
        name: 'Gloria',
        title: 'Gloria',
        images: [
          { url: 'https://picsum.photos/640/640?random=4' },
          { url: 'https://picsum.photos/300/300?random=4' },
          { url: 'https://picsum.photos/64/64?random=4' }
        ]
      },
      duration: 156,
      preview_url: null
    },
    {
      id: '5',
      name: 'Bad Habit',
      title: 'Bad Habit',
      artists: [{ name: 'Steve Lacy' }],
      album: {
        name: 'Gemini Rights',
        title: 'Gemini Rights',
        images: [
          { url: 'https://picsum.photos/640/640?random=5' },
          { url: 'https://picsum.photos/300/300?random=5' },
          { url: 'https://picsum.photos/64/64?random=5' }
        ]
      },
      duration: 221,
      preview_url: null
    }
  ];

  // Cargar canciones populares al iniciar
  useEffect(() => {
    loadPopularSongs();
  }, []);

  const loadPopularSongs = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Cargando canciones populares...');
      const tracks = await getPopularTracks();

      if (tracks && tracks.length > 0) {
        setSongs(tracks);
        console.log('Canciones cargadas desde API:', tracks.length);
      } else {
        console.log('API no devolvió canciones, usando fallback');
        setSongs(getFallbackSongs());
      }
    } catch (error) {
      console.error('Error al cargar canciones:', error);
      setError('Error al cargar canciones desde la API');
      setSongs(getFallbackSongs());
    } finally {
      setLoading(false);
    }
  };

  // Buscar canciones cuando cambie el término de búsqueda
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        setError(null);
        try {
          console.log('Buscando:', searchTerm);
          const results = await searchMusic(searchTerm);

          if (results && results.length > 0) {
            setSongs(results);
            console.log('Resultados de búsqueda:', results.length);
          } else {
            // Buscar en fallback si la API no devuelve resultados
            const fallbackSongs = getFallbackSongs();
            const filteredFallback = fallbackSongs.filter(song =>
              song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              song.artists[0].name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSongs(filteredFallback);
            console.log('Usando búsqueda en fallback:', filteredFallback.length);
          }
        } catch (error) {
          console.error('Error en búsqueda:', error);
          setError('Error al buscar canciones');
          // Buscar en fallback
          const fallbackSongs = getFallbackSongs();
          const filteredFallback = fallbackSongs.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artists[0].name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSongs(filteredFallback);
        } finally {
          setIsSearching(false);
        }
      } else {
        // Si no hay término de búsqueda, cargar canciones populares
        loadPopularSongs();
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);


  const handleAddToPlaylist = (song) => {
    console.log('Agregar a playlist:', song);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {searchTerm ? 'Resultados de búsqueda' : 'Canciones Populares'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? `Buscando: "${searchTerm}"` : 'Las mejores canciones del momento'}
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              title="Vista en cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-pink-500 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              title="Vista en lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar canciones, artistas o álbumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          {(loading || isSearching) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
            </div>
          )}
        </div>

        {/* <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200/50 dark:border-pink-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {error ? 'Modo Offline' : 'Conectado con Deezer API'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {error ? 'Mostrando canciones de ejemplo. ' + error : 'Mostrando canciones reales desde Deezer. Algunas pueden tener preview de 30 segundos disponible.'}
              </p>
            </div>
          </div>
        </div> */}

        {/* Controles adicionales */}
        {!loading && !isSearching && songs.length > 0 && (
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => {
                const shuffled = [...songs].sort(() => Math.random() - 0.5);
                setSongs(shuffled);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              Mezclar
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {songs.length} canciones encontradas
            </div>
          </div>
        )}

        {/* Lista/Grid de canciones */}
        {loading || isSearching ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                {isSearching ? 'Buscando canciones...' : 'Cargando canciones populares...'}
              </p>
            </div>
          </div>
        ) : songs.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {songs.map((song) => (
                <SpotifyCard
                  key={song.id}
                  song={{
                    ...song,
                    title: song.title || song.name,
                    artist: song.artists?.[0] || { name: song.artists?.[0]?.name || 'Artista desconocido' },
                    album: {
                      ...song.album,
                      title: song.album?.title || song.album?.name,
                      cover_medium: song.album?.images?.[1]?.url || song.album?.images?.[0]?.url
                    },
                    preview: song.preview_url,
                    duration: song.duration || 180
                  }}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={{
                    ...song,
                    title: song.title || song.name,
                    artists: song.artists || [{ name: 'Artista desconocido' }],
                    album: {
                      ...song.album,
                      images: song.album?.images || [{ url: 'https://picsum.photos/300/300?random=' + song.id }]
                    },
                    preview_url: song.preview_url,
                    duration: song.duration || 180
                  }}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {searchTerm ? 'No se encontraron canciones' : 'No hay canciones disponibles'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Las canciones aparecerán aquí cuando estén disponibles'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Canciones;
