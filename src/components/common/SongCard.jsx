import { useState, useEffect } from "react";
import { Play, Pause, Music, Heart, Plus, MoreVertical } from "lucide-react";
import { usePlayer, useAuth } from "../../hook/useAuth";
import { toast } from 'react-toastify';
import PlaylistSelector from './PlaylistSelector';




const SongCard = ({ song, showArtist = true, showAlbum = true, onRemove = null }) => {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [showPlaylistSelector, setShowPlaylistSelector] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isCurrentSong = currentTrack?.id === song.id;

  const handlePlayPause = () => {
    const trackData = {
      id: song.id,
      title: song.title,
      artist: song.artists?.[0]?.name || "Artista desconocido",
      preview_url: song.preview_url,
      cover: song.album?.images?.[1]?.url || song.cover,
    };
    playTrack(trackData);
  };

  const formatDuration = (duration) => {
    if (!duration || isNaN(duration)) return "00:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

const [isFavorite, setIsFavorite] = useState(false);
  
  // Función para obtener las claves de localStorage específicas del usuario
  const getFavoritesKey = () => `favoritos_${user?.id || 'guest'}`;
  const getFavoritesDataKey = () => `favoriteSongsData_${user?.id || 'guest'}`;
  
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
          artist: song.artists?.[0]?.name || song.artist?.name || "Artista desconocido",
          artists: song.artists,
          album: song.album,
          duration: song.duration,
          preview_url: song.preview_url || song.preview,
          cover: song.album?.images?.[1]?.url || song.album?.cover_medium || song.cover,
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

  useEffect(() => {
    if (user) {
      const favoritesKey = `favoritos_${user.id || 'guest'}`;
      const stored = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
      setIsFavorite(stored.includes(song.id));
    } else {
      setIsFavorite(false);
    }
  }, [song.id, user]);

  return (
    <>
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
      {/* Portada */}
      <div className="relative">
        {!imageError ? (
          <img
            src={song.album?.images?.[1]?.url}
            alt={song.title}
            className="w-12 h-12 rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
        )}

        {/* Botón de play */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          disabled={!song.preview_url}
          title={
            !song.preview_url
              ? "Preview no disponible"
              : isCurrentSong && isPlaying
                ? "Pausar"
                : "Reproducir"
          }
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium truncate ${isCurrentSong ? "text-pink-500" : "text-gray-900 dark:text-white"}`}
        >
          {song.title}
        </h4>
        {showArtist && (
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {song.artists?.[0]?.name || song.artist?.name || "Artista desconocido"}
          </p>
        )}
        {showAlbum && song.album && (
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {typeof song.album === 'string' ? song.album : song.album?.title || ''}
          </p>
        )}
      </div>

      {/* Duración */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {formatDuration(song.duration)}
      </div>

      {/* Controles */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Botón de favoritos */}
        <button 
          onClick={toggleFavorite} 
          title={isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
          className="transition-colors"
        >
          {isFavorite ? (
            <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
          ) : (
            <Heart className="w-4 h-4 text-gray-400 hover:text-pink-500" />
          )}
        </button>
        
        {/* Botón agregar a playlist */}
        <button
          onClick={() => setShowPlaylistSelector(true)}
          className="text-gray-400 hover:text-purple-400 transition-colors"
          title="Agregar a playlist"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Menú de opciones */}
        {onRemove && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <button
                  onClick={() => {
                    onRemove(song.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
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

export default SongCard;
