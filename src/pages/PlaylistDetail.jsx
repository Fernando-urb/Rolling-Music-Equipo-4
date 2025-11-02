import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Music, ArrowLeft, Play, Shuffle, Edit } from 'lucide-react';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../hook/useAuth';
import SongCard from '../components/common/SongCard';

const PlaylistDetail = () => {
  const { id } = useParams();
  const { loadPlaylist, removeSongFromPlaylist } = usePlaylists();
  const { playTrack } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const playlistData = await loadPlaylist(id);
        setPlaylist(playlistData);
      } catch (error) {
        console.error('Error loading playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlaylist();
    }
  }, [id, loadPlaylist]);

  const handlePlayAll = () => {
    if (playlist?.songs?.length > 0) {
      const firstSong = playlist.songs[0];
      const trackData = {
        id: firstSong.id,
        title: firstSong.title,
        artist: firstSong.artist,
        preview_url: firstSong.preview,
        cover: firstSong.cover
      };
      playTrack(trackData);
    }
  };

  const handleShuffle = () => {
    if (playlist?.songs?.length > 0) {
      const randomIndex = Math.floor(Math.random() * playlist.songs.length);
      const randomSong = playlist.songs[randomIndex];
      const trackData = {
        id: randomSong.id,
        title: randomSong.title,
        artist: randomSong.artist,
        preview_url: randomSong.preview,
        cover: randomSong.cover
      };
      playTrack(trackData);
    }
  };

  const handleRemoveSong = async (songId) => {
    await removeSongFromPlaylist(id, songId);
    // Actualizar la playlist local
    setPlaylist(prev => ({
      ...prev,
      songs: prev.songs.filter(song => song.id !== songId)
    }));
  };

  const formatDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalDuration = () => {
    if (!playlist?.songs) return 0;
    return playlist.songs.reduce((total, song) => total + (song.duration || 0), 0);
  };

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando playlist...</p>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-16">
        <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Playlist no encontrada
        </h3>
        <Link
          to="/playlists"
          className="text-purple-600 hover:text-purple-700 transition-colors"
        >
          Volver a playlists
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Botón de volver */}
      <Link
        to="/playlists"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a playlists
      </Link>

      {/* Header de la playlist */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Cover */}
        <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Music className="w-24 h-24 text-white" />
        </div>

        {/* Información */}
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            PLAYLIST
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {playlist.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{playlist.songs?.length || 0} canciones</span>
            <span>•</span>
            <span>{formatTotalDuration(getTotalDuration())}</span>
            <span>•</span>
            <span>Creada el {formatDate(playlist.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handlePlayAll}
          disabled={!playlist.songs?.length}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-6 h-6 text-white ml-1" />
        </button>
        
        <button
          onClick={handleShuffle}
          disabled={!playlist.songs?.length}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-6 h-6" />
        </button>

        <Link
          to={`/playlist/${id}/edit`}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <Edit className="w-6 h-6" />
        </Link>
      </div>

      {/* Lista de canciones */}
      {playlist.songs?.length > 0 ? (
        <div className="space-y-2">
          {playlist.songs.map((song, index) => (
            <div key={`${song.id}-${index}`} className="flex items-center gap-4">
              <span className="w-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {index + 1}
              </span>
              <div className="flex-1">
                <SongCard
                  song={song}
                  onRemove={handleRemoveSong}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Esta playlist está vacía
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Busca música y agrégala a esta playlist
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Explorar Música
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;