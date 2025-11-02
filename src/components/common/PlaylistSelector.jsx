import { useState, useEffect } from 'react';
import { X, Plus, Music, ChevronDown } from 'lucide-react';
import { usePlaylists } from '../../context/PlaylistContext';
import { toast } from 'react-toastify';

const PlaylistSelector = ({ song, isOpen, onClose }) => {
  const { playlists, addSongToPlaylist, createPlaylist } = usePlaylists();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Resetear formulario cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setShowCreateForm(false);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
    }
  }, [isOpen]);

  const handleAddToPlaylist = async (playlistId) => {
    try {
      setLoading(true);
      await addSongToPlaylist(playlistId, song);
      onClose();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    
    if (!newPlaylistName.trim()) {
      toast.error('El nombre de la playlist es requerido');
      return;
    }

    try {
      setLoading(true);
      const playlistId = await createPlaylist({
        name: newPlaylistName.trim(),
        description: newPlaylistDescription.trim(),
        isPublic: false
      });
      
      // Agregar la canción a la nueva playlist
      await addSongToPlaylist(playlistId, song);
      onClose();
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Agregar a Playlist
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Song Info */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white truncate">
              {song.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {song.artist?.name || song.artists?.[0]?.name || 'Artista desconocido'}
            </p>
          </div>
        </div>

        {/* Create New Playlist Button */}
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full flex items-center gap-3 p-3 mb-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-pink-400 dark:hover:border-pink-500 transition-colors"
          disabled={loading}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-gray-900 dark:text-white">
              Crear nueva playlist
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Crear y agregar canción
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCreateForm ? 'rotate-180' : ''}`} />
        </button>

        {/* Create Playlist Form */}
        {showCreateForm && (
          <form onSubmit={handleCreatePlaylist} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la playlist *
              </label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Mi nueva playlist"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                placeholder="Descripción de la playlist..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading || !newPlaylistName.trim()}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando...' : 'Crear y Agregar'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Existing Playlists */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Mis Playlists ({playlists.length})
          </h4>
          
          {playlists.length === 0 ? (
            <div className="text-center py-8">
              <Music className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No tienes playlists aún
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">
                Crea tu primera playlist arriba
              </p>
            </div>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                disabled={loading}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {playlist.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {playlist.songs?.length || 0} canciones
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 flex items-center justify-center rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Procesando...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistSelector;