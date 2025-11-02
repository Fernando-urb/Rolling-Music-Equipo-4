import { useState } from 'react';
import { Plus, Music, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { usePlaylists } from '../context/PlaylistContext';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal';
import PlaylistModal from '../components/common/PlaylistModal';

const Playlists = () => {
  const { playlists, loading, createPlaylist, deletePlaylist } = usePlaylists();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: false
  });

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await createPlaylist(formData);
      setFormData({ name: '', description: '', isPublic: false });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDeletePlaylist = async () => {
    if (selectedPlaylist) {
      await deletePlaylist(selectedPlaylist.id);
      setShowDeleteModal(false);
      setSelectedPlaylist(null);
    }
  };

  const handleViewPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowPlaylistModal(true);
    setShowMenu(null);
  };

  const handleEditPlaylist = (playlist) => {
    // Por ahora solo cerramos el modal, luego se puede implementar edición
    console.log('Editar playlist:', playlist);
    setShowPlaylistModal(false);
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tus Playlists
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {playlists.length} {playlists.length === 1 ? 'playlist' : 'playlists'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nueva Playlist
          </button>
        </div>

        {/* Grid de playlists */}
        {playlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                {/* Cover de la playlist */}
                <div className="relative mb-4">
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Music className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Menú de opciones */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => setShowMenu(showMenu === playlist.id ? null : playlist.id)}
                      className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                    
                    {showMenu === playlist.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                        <Link
                          to={`/playlist/${playlist.id}/edit`}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedPlaylist(playlist);
                            setShowDeleteModal(true);
                            setShowMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Información de la playlist */}
                <button 
                  onClick={() => handleViewPlaylist(playlist)}
                  className="block w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
                    {playlist.name}
                  </h3>
                  {playlist.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {playlist.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{playlist.songs?.length || 0} canciones</span>
                    <span>{formatDate(playlist.createdAt)}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No tienes playlists aún
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Crea tu primera playlist para organizar tu música favorita
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Crear Playlist
            </button>
          </div>
        )}
      </div>

      {/* Modal para crear playlist */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nueva Playlist"
      >
        <form onSubmit={handleCreatePlaylist} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre de la playlist *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Mi playlist favorita"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Describe tu playlist..."
              rows="3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700 dark:text-gray-300">
              Hacer pública esta playlist
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Crear Playlist
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Eliminar Playlist"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que quieres eliminar la playlist "{selectedPlaylist?.name}"?
            Esta acción no se puede deshacer.
          </p>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDeletePlaylist}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para ver playlist */}
      <PlaylistModal
        playlist={selectedPlaylist}
        isOpen={showPlaylistModal}
        onClose={() => {
          setShowPlaylistModal(false);
          setSelectedPlaylist(null);
        }}
        onEdit={handleEditPlaylist}
      />
    </>
  );
};

export default Playlists;