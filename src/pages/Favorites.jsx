import { useState, useEffect, useCallback } from 'react';
import { Heart, Music, Trash2, Search } from 'lucide-react';
import MainLayout from "../components/common/MainLayout";
import SongCard from '../components/common/SongCard';
import { useAuth } from '../hook/useAuth';
import { toast } from 'react-toastify';

function Favorites() {
    const { user } = useAuth();
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Cargar canciones favoritas desde localStorage
    useEffect(() => {
        if (user) {
            loadFavorites();
        } else {
            setFavoriteSongs([]);
            setLoading(false);
        }
    }, [user, loadFavorites]);

    const loadFavorites = useCallback(() => {
        setLoading(true);
        try {
            if (!user) {
                setFavoriteSongs([]);
                return;
            }

            const favoritesKey = `favoritos_${user.id || 'guest'}`;
            const dataKey = `favoriteSongsData_${user.id || 'guest'}`;
            
            // Obtener IDs de favoritos del usuario actual
            const favoriteIds = JSON.parse(localStorage.getItem(favoritesKey) || "[]");

            // Obtener datos completos de las canciones favoritas del usuario actual
            const favoriteSongsData = JSON.parse(localStorage.getItem(dataKey) || "[]");

            // Filtrar solo las canciones que están en favoritos
            const currentFavorites = favoriteSongsData.filter(song =>
                favoriteIds.includes(song.id)
            );

            setFavoriteSongs(currentFavorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
            setFavoriteSongs([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Escuchar cambios en localStorage para actualizar la lista
    useEffect(() => {
        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);

        // También escuchar cambios locales
        const interval = setInterval(loadFavorites, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [loadFavorites]);

    // Eliminar canción de favoritos
    const removeFavorite = (songId) => {
        try {
            if (!user) return;

            const favoritesKey = `favoritos_${user.id || 'guest'}`;
            const dataKey = `favoriteSongsData_${user.id || 'guest'}`;
            
            const favoriteIds = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
            const updatedIds = favoriteIds.filter(id => id !== songId);
            localStorage.setItem(favoritesKey, JSON.stringify(updatedIds));

            // También eliminar de los datos completos
            const songsData = JSON.parse(localStorage.getItem(dataKey) || "[]");
            const updatedSongsData = songsData.filter((s) => s.id !== songId);
            localStorage.setItem(dataKey, JSON.stringify(updatedSongsData));

            // Actualizar la lista local
            setFavoriteSongs(prev => prev.filter(song => song.id !== songId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    // Función para mostrar SweetAlert (simulado con confirm por ahora)
    const showAlert = (title, text, icon = 'info') => {
        // Por ahora usamos confirm nativo, luego se puede reemplazar con SweetAlert2
        if (icon === 'warning') {
            return window.confirm(`${title}\n${text}`);
        } else {
            alert(`${title}\n${text}`);
            return true;
        }
    };

    // Limpiar todos los favoritos
    const clearAllFavorites = () => {
        if (!user) return;
        
        const confirmed = showAlert(
            '¿Eliminar todos los favoritos?',
            'Esta acción no se puede deshacer. Se eliminarán todas tus canciones favoritas.',
            'warning'
        );
        
        if (confirmed) {
            const favoritesKey = `favoritos_${user.id || 'guest'}`;
            const dataKey = `favoriteSongsData_${user.id || 'guest'}`;
            
            localStorage.setItem(favoritesKey, JSON.stringify([]));
            localStorage.setItem(dataKey, JSON.stringify([]));
            setFavoriteSongs([]);
            
            toast.success('🗑️ Todos los favoritos eliminados', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    // Filtrar canciones por búsqueda
    const filteredSongs = favoriteSongs.filter(song =>
        song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.artists && song.artists[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Si no hay usuario logueado, mostrar mensaje
    if (!user) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center py-16">
                        <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Inicia sesión para ver tus favoritos
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Necesitas estar logueado para guardar y ver tus canciones favoritas
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            <Heart className="w-5 h-5" />
                            Iniciar Sesión
                        </a>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Heart className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Mis Favoritos
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {favoriteSongs.length} {favoriteSongs.length === 1 ? 'canción favorita' : 'canciones favoritas'}
                            </p>
                        </div>
                    </div>

                    {/* Botón limpiar favoritos */}
                    {favoriteSongs.length > 0 && (
                        <button
                            onClick={clearAllFavorites}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Limpiar todos los favoritos"
                        >
                            <Trash2 className="w-4 h-4" />
                            Limpiar todo
                        </button>
                    )}
                </div>

                {/* Buscador */}
                {favoriteSongs.length > 0 && (
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar en favoritos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>
                )}

             

                {/* Lista de favoritos */}
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Cargando favoritos...</p>
                        </div>
                    </div>
                ) : filteredSongs.length > 0 ? (
                    <div className="space-y-2">
                        {filteredSongs.map((song) => (
                            <div key={song.id} className="group relative">
                                <SongCard song={song} />

                                {/* Botón eliminar individual */}
                                <button
                                    onClick={() => removeFavorite(song.id)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                                    title="Eliminar de favoritos"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : favoriteSongs.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            No tienes canciones favoritas
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Explora música y haz clic en el corazón para agregar canciones a tus favoritos
                        </p>
                        <a
                            href="/canciones"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                        >
                            <Music className="w-5 h-5" />
                            Explorar Música
                        </a>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            No se encontraron canciones
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Intenta con otros términos de búsqueda
                        </p>
                    </div>
                )}

                {/* Estadísticas de favoritos */}
                {favoriteSongs.length > 0 && (
                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-pink-500">{favoriteSongs.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Canciones</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-500">
                                    {new Set(favoriteSongs.map(song => song.artists?.[0]?.name || song.artist)).size}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Artistas</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-500">
                                    {Math.floor(favoriteSongs.reduce((total, song) => total + (song.duration || 0), 0) / 60)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Minutos</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-500">
                                    {favoriteSongs.filter(song => song.preview_url || song.preview).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Con Preview</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Favorites;