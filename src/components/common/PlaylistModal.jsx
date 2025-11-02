import { useState, useEffect, useCallback } from 'react';
import { X, Music, Search } from 'lucide-react';
import { usePlaylists } from '../../context/PlaylistContext';
import SongCard from './SongCard';

const PlaylistModal = ({ playlist, isOpen, onClose, onEdit }) => {
  const { removeSongFromPlaylist, loadPlaylist } = usePlaylists();
  const [playlistData, setPlaylistData] = useState(playlist);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar datos completos de la playlist cuando se abre el modal
  const loadPlaylistData = useCallback(async () => {
    if (!playlist?.id) return;
    
    setLoading(true);
    try {
      const fullPlaylist = await loadPlaylist(playlist.id);
      setPlaylistData(fullPlaylist || playlist);
    } catch (error) {
      console.error('Error loading playlist:', error);
      setPlaylistData(playlist);
    } finally {
      setLoading(false);
    }
  }, [playlist?.id, loadPlaylist, playlist]);

  useEffect(() => {
    if (isOpen && playlist?.id) {
      loadPlaylistData();
    }
  }, [isOpen, playlist?.id, loadPlaylistData]);

  const handleRemoveSong = async (songId) => {
    const confirmed = window.confirm('¿Eliminar esta canción de la playlist?');
    if (confirmed) {
      try {
        await removeSongFromPlaylist(playlist.id, songId);
        // Actualizar datos locales
        setPlaylistData(prev => ({
          ...prev,
          songs: prev.songs?.filter(song => song.id !== songId) || []
        }));
      } catch (error) {
        console.error('Error removing song:', error);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Fecha desconocida';
    
    // Manejar diferentes formatos de fecha
    let dateObj;
    if (date.seconds) {
      dateObj = new Date(date.seconds * 1000);
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (totalSeconds) => {
    if (!totalSeconds || isNaN(totalSeconds)) return '0:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    if (!playlistData?.songs) return 0;
    return playlistData.songs.reduce((total, song) => total + (song.duration || 0), 0);
  };

  // Filtrar canciones por búsqueda
  const filteredSongs = playlistData?.songs?.filter(song =>
    song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {playlistData?.name || 'Playlist'}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{playlistData?.songs?.length || 0} canciones</span>
                <span>{formatDuration(getTotalDuration())}</span>
                <span>Creada el {formatDate(playlistData?.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(playlistData)}
                className="p-2 text-gray-400 hover:text-purple-500 transition-colors"
                title="Editar playlist"
              >
                <Music className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Descripción */}
        {playlistData?.description && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              {playlistData.description}
            </p>
          </div>
        )}

        {/* Buscador */}
        {playlistData?.songs?.length > 0 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar en esta playlist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Lista de canciones */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Cargando canciones...</p>
              </div>
            </div>
          ) : filteredSongs.length > 0 ? (
            <div className="p-6 space-y-2">
              {filteredSongs.map((song, index) => (
                <div key={song.id || index} className="group relative">
                  <SongCard 
                    song={song} 
                    showArtist={true}
                    showAlbum={true}
                    onRemove={() => handleRemoveSong(song.id)}
                  />
                </div>
              ))}
            </div>
          ) : playlistData?.songs?.length === 0 ? (
            <div className="text-center py-16">
              <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Playlist vacía
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Agrega canciones a esta playlist desde cualquier página de música
              </p>
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
        </div>

        {/* Footer con estadísticas */}
        {playlistData?.songs?.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-purple-500">
                  {playlistData.songs.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Canciones</div>
              </div>
              <div>
                <div className="text-lg font-bold text-pink-500">
                  {Math.floor(getTotalDuration() / 60)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Minutos</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-500">
                  {new Set(playlistData.songs.map(song => song.artist)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Artistas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistModal;