import { useState, useEffect } from 'react';
import { Play, Pause, Heart, Plus, Music, MoreHorizontal } from 'lucide-react';
import { usePlayer, useAuth } from '../../hook/useAuth';
import { toast } from 'react-toastify';
import PlaylistSelector from './PlaylistSelector';

const SpotifyCard = ({ song }) => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPlaylistSelector, setShowPlaylistSelector] = useState(false);

  const isCurrentSong = currentTrack?.id === song.id;

  // Función para obtener las claves de localStorage específicas del usuario
  const getFavoritesKey = () => `favoritos_${user?.id || 'guest'}`;
  const getFavoritesDataKey = () => `favoriteSongsData_${user?.id || 'guest'}`;

  // Verificar si la canción está en favoritos
  useEffect(() => {
    if (user) {
      const favoritesKey = `favoritos_${user.id || 'guest'}`;
      const stored = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
      setIsFavorite(stored.includes(song.id));
    } else {
      setIsFavorite(false);
    }
  }, [song.id, user]);

  const handlePlayPause = () => {
    const trackData = {
      id: song.id,
      title: song.title,
      artist: song.artist?.name || 'Artista desconocido',
      preview_url: song.preview,
      cover: song.album?.cover_medium
    };
    playTrack(trackData);
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

  const toggleFavorite = () => {
    if (!user) {
      showAlert(
        'Iniciar Sesión Requerido',
        'Debes iniciar sesión para agregar canciones a favoritos',
        'warning'
      );
      return;
    }

    const favoritesKey = getFavoritesKey();
    const dataKey = getFavoritesDataKey();

    const stored = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
    const isFav = stored.includes(song.id);

    if (isFav) {
      // Eliminar de favoritos
      const updated = stored.filter((id) => id !== song.id);
      localStorage.setItem(favoritesKey, JSON.stringify(updated));

      // También eliminar de los datos completos
      const songsData = JSON.parse(localStorage.getItem(dataKey) || "[]");
      const updatedSongsData = songsData.filter((s) => s.id !== song.id);
      localStorage.setItem(dataKey, JSON.stringify(updatedSongsData));

      // Toast de eliminación
      toast.success('❤️ Eliminado de favoritos', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Agregar a favoritos
      const updated = [...stored, song.id];
      localStorage.setItem(favoritesKey, JSON.stringify(updated));

      // Guardar datos completos de la canción
      const songsData = JSON.parse(localStorage.getItem(dataKey) || "[]");
      const songExists = songsData.find((s) => s.id === song.id);

      if (!songExists) {
        const songData = {
          id: song.id,
          title: song.title,
          artist: song.artist?.name || "Artista desconocido",
          album: song.album,
          duration: song.duration,
          preview_url: song.preview,
          cover: song.album?.cover_medium,
          addedAt: new Date().toISOString()
        };

        songsData.unshift(songData);
        localStorage.setItem(dataKey, JSON.stringify(songsData));
      }

      // Toast de agregado
      toast.success('💖 Agregado a favoritos', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setIsFavorite(!isFav);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div
        className="group bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cover Image */}
        <div className="relative mb-4">
          {!imageError ? (
            <img
              src={song.album?.cover_medium || 'https://picsum.photos/250/250?random=' + song.id}
              alt={song.title}
              className="w-full aspect-square rounded-lg object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Music className="w-16 h-16 text-white" />
            </div>
          )}

          {/* Play Button Overlay */}
          <button
            onClick={handlePlayPause}
            className={`absolute bottom-2 right-2 w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered || (isCurrentSong && isPlaying) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            disabled={!song.preview}
            title={!song.preview ? 'Preview no disponible' : (isCurrentSong && isPlaying ? 'Pausar' : 'Reproducir')}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>

          {/* Rank Badge */}
          {song.rank && song.rank <= 10 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              #{song.rank}
            </div>
          )}

          {/* Explicit Badge */}
          {song.explicit_lyrics && (
            <div className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
              E
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="space-y-2">
          <h3 className={`font-bold text-lg truncate ${isCurrentSong ? 'text-pink-500' : 'text-gray-900 dark:text-white'
            }`}>
            {song.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
            {song.artist?.name || 'Artista desconocido'}
          </p>

          {song.album?.title && (
            <p className="text-gray-500 dark:text-gray-500 text-xs truncate">
              {song.album.title}
            </p>
          )}

          {/* Duration */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDuration(song.duration)}</span>
            {song.preview && (
              <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                Preview
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex items-center justify-between mt-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="flex items-center gap-2">
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="transition-colors"
              title={isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
            >
              {isFavorite ? (
                <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
              ) : (
                <Heart className="w-5 h-5 text-gray-400 hover:text-pink-500" />
              )}
            </button>

            {/* Playlist Button */}
            <button
              onClick={() => setShowPlaylistSelector(true)}
              className="text-gray-400 hover:text-purple-500 transition-colors"
              title="Agregar a playlist"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Más opciones"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Selector de Playlist */}
      <PlaylistSelector
        song={song}
        isOpen={showPlaylistSelector}
        onClose={() => setShowPlaylistSelector(false)}
      />
    </>
  );
};

export default SpotifyCard;