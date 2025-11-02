import React, { createContext, useState, useEffect, useCallback } from 'react';
import { playlistService } from '../services/playlistService';
import { useAuth } from '../hook/useAuth';
import { toast } from 'react-toastify';

const PlaylistContext = createContext();

export const usePlaylists = () => {
  const context = React.useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
};

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Cargar playlists del usuario
  const loadPlaylists = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const userPlaylists = await playlistService.getUserPlaylists(user.id);
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error('Error loading playlists:', error);
      toast.error('Error al cargar playlists');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Crear nueva playlist
  const createPlaylist = useCallback(async (playlistData) => {
    if (!user?.id) {
      toast.error('Debes iniciar sesión para crear playlists');
      return;
    }

    try {
      const playlistId = await playlistService.createPlaylist(user.id, playlistData);
      
      const newPlaylist = {
        id: playlistId,
        userId: user.id,
        ...playlistData,
        songs: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setPlaylists(prev => [newPlaylist, ...prev]);
      toast.success('Playlist creada exitosamente');
      return playlistId;
    } catch (error) {
      console.error('Error creating playlist:', error);
      toast.error('Error al crear playlist');
      throw error;
    }
  }, [user?.id]);

  // Actualizar playlist
  const updatePlaylist = useCallback(async (playlistId, updates) => {
    try {
      await playlistService.updatePlaylist(playlistId, updates);
      
      setPlaylists(prev => 
        prev.map(playlist => 
          playlist.id === playlistId 
            ? { ...playlist, ...updates, updatedAt: new Date() }
            : playlist
        )
      );
      
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(prev => ({ ...prev, ...updates }));
      }
      
      toast.success('Playlist actualizada');
    } catch (error) {
      console.error('Error updating playlist:', error);
      toast.error('Error al actualizar playlist');
    }
  }, [currentPlaylist?.id]);

  // Eliminar playlist
  const deletePlaylist = useCallback(async (playlistId) => {
    try {
      await playlistService.deletePlaylist(playlistId);
      setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
      
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(null);
      }
      
      toast.success('Playlist eliminada');
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast.error('Error al eliminar playlist');
    }
  }, [currentPlaylist?.id]);

  // Cargar playlist específica
  const loadPlaylist = useCallback(async (playlistId) => {
    try {
      const playlist = await playlistService.getPlaylistById(playlistId);
      setCurrentPlaylist(playlist);
      return playlist;
    } catch (error) {
      console.error('Error loading playlist:', error);
      toast.error('Error al cargar playlist');
    }
  }, []);

  // Agregar canción a playlist
  const addSongToPlaylist = useCallback(async (playlistId, song) => {
    try {
      await playlistService.addSongToPlaylist(playlistId, song);
      
      // Actualizar estado local
      setPlaylists(prev => 
        prev.map(playlist => {
          if (playlist.id === playlistId) {
            const songData = {
              id: song.id,
              title: song.title,
              artist: song.artist?.name || 'Artista desconocido',
              album: song.album?.title || '',
              duration: song.duration,
              preview: song.preview,
              cover: song.album?.cover_medium || song.album?.cover_small || '',
              addedAt: new Date()
            };
            return {
              ...playlist,
              songs: [...(playlist.songs || []), songData],
              updatedAt: new Date()
            };
          }
          return playlist;
        })
      );
      
      if (currentPlaylist?.id === playlistId) {
        const songData = {
          id: song.id,
          title: song.title,
          artist: song.artist?.name || 'Artista desconocido',
          album: song.album?.title || '',
          duration: song.duration,
          preview: song.preview,
          cover: song.album?.cover_medium || song.album?.cover_small || '',
          addedAt: new Date()
        };
        setCurrentPlaylist(prev => ({
          ...prev,
          songs: [...(prev.songs || []), songData]
        }));
      }
      
      toast.success('Canción agregada a la playlist');
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      toast.error('Error al agregar canción');
    }
  }, [currentPlaylist?.id]);

  // Eliminar canción de playlist
  const removeSongFromPlaylist = useCallback(async (playlistId, songId) => {
    try {
      await playlistService.removeSongFromPlaylist(playlistId, songId);
      
      setPlaylists(prev => 
        prev.map(playlist => {
          if (playlist.id === playlistId) {
            return {
              ...playlist,
              songs: playlist.songs.filter(song => song.id !== songId),
              updatedAt: new Date()
            };
          }
          return playlist;
        })
      );
      
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(prev => ({
          ...prev,
          songs: prev.songs.filter(song => song.id !== songId)
        }));
      }
      
      toast.success('Canción eliminada de la playlist');
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      toast.error('Error al eliminar canción');
    }
  }, [currentPlaylist?.id]);

  // Cargar playlists cuando el usuario cambie
  useEffect(() => {
    if (user?.id) {
      loadPlaylists();
    } else {
      setPlaylists([]);
      setCurrentPlaylist(null);
    }
  }, [user?.id, loadPlaylists]);

  const value = {
    playlists,
    currentPlaylist,
    loading,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    loadPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    loadPlaylists
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};