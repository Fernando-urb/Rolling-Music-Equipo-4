export const playlistService = {
    // Obtener clave de localStorage para playlists del usuario
    getPlaylistsKey(userId) {
        return `playlists_${userId}`;
    },

    // Crear nueva playlist
    async createPlaylist(userId, playlistData) {
        try {
            const playlistsKey = this.getPlaylistsKey(userId);
            const existingPlaylists = JSON.parse(localStorage.getItem(playlistsKey) || '[]');

            const playlistId = Date.now().toString();
            const newPlaylist = {
                id: playlistId,
                userId,
                name: playlistData.name,
                description: playlistData.description || '',
                cover: playlistData.cover || '',
                songs: [],
                isPublic: playlistData.isPublic || false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            existingPlaylists.unshift(newPlaylist);
            localStorage.setItem(playlistsKey, JSON.stringify(existingPlaylists));

            return playlistId;
        } catch (error) {
            console.error('Error creating playlist:', error);
            throw error;
        }
    },

    // Obtener playlists del usuario
    async getUserPlaylists(userId) {
        try {
            const playlistsKey = this.getPlaylistsKey(userId);
            const playlists = JSON.parse(localStorage.getItem(playlistsKey) || '[]');

            // Convertir fechas de string a Date para mantener compatibilidad
            return playlists.map(playlist => ({
                ...playlist,
                createdAt: { seconds: new Date(playlist.createdAt).getTime() / 1000 },
                updatedAt: { seconds: new Date(playlist.updatedAt).getTime() / 1000 },
                songs: playlist.songs?.map(song => ({
                    ...song,
                    addedAt: new Date(song.addedAt || playlist.createdAt)
                })) || []
            }));
        } catch (error) {
            console.error('Error getting playlists:', error);
            throw error;
        }
    },

    // Obtener playlist por ID
    async getPlaylistById(playlistId) {
        try {
            // Buscar en todas las playlists de todos los usuarios
            const allKeys = Object.keys(localStorage).filter(key => key.startsWith('playlists_'));

            for (const key of allKeys) {
                const playlists = JSON.parse(localStorage.getItem(key) || '[]');
                const playlist = playlists.find(p => p.id === playlistId);

                if (playlist) {
                    return {
                        ...playlist,
                        createdAt: { seconds: new Date(playlist.createdAt).getTime() / 1000 },
                        updatedAt: { seconds: new Date(playlist.updatedAt).getTime() / 1000 },
                        songs: playlist.songs?.map(song => ({
                            ...song,
                            addedAt: new Date(song.addedAt || playlist.createdAt)
                        })) || []
                    };
                }
            }

            return null;
        } catch (error) {
            console.error('Error getting playlist:', error);
            throw error;
        }
    },

    // Actualizar playlist
    async updatePlaylist(playlistId, updates) {
        try {
            const allKeys = Object.keys(localStorage).filter(key => key.startsWith('playlists_'));

            for (const key of allKeys) {
                const playlists = JSON.parse(localStorage.getItem(key) || '[]');
                const playlistIndex = playlists.findIndex(p => p.id === playlistId);

                if (playlistIndex !== -1) {
                    playlists[playlistIndex] = {
                        ...playlists[playlistIndex],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                    localStorage.setItem(key, JSON.stringify(playlists));
                    break;
                }
            }
        } catch (error) {
            console.error('Error updating playlist:', error);
            throw error;
        }
    },

    // Eliminar playlist
    async deletePlaylist(playlistId) {
        try {
            const allKeys = Object.keys(localStorage).filter(key => key.startsWith('playlists_'));

            for (const key of allKeys) {
                const playlists = JSON.parse(localStorage.getItem(key) || '[]');
                const filteredPlaylists = playlists.filter(p => p.id !== playlistId);

                if (filteredPlaylists.length !== playlists.length) {
                    localStorage.setItem(key, JSON.stringify(filteredPlaylists));
                    break;
                }
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
            throw error;
        }
    },

    // Agregar canción a playlist
    async addSongToPlaylist(playlistId, song) {
        try {
            const allKeys = Object.keys(localStorage).filter(key => key.startsWith('playlists_'));

            for (const key of allKeys) {
                const playlists = JSON.parse(localStorage.getItem(key) || '[]');
                const playlistIndex = playlists.findIndex(p => p.id === playlistId);

                if (playlistIndex !== -1) {
                    const songData = {
                        id: song.id,
                        title: song.title,
                        artist: song.artist?.name || 'Artista desconocido',
                        album: song.album?.title || '',
                        duration: song.duration,
                        preview: song.preview,
                        cover: song.album?.cover_medium || song.album?.cover_small || '',
                        addedAt: new Date().toISOString()
                    };

                    if (!playlists[playlistIndex].songs) {
                        playlists[playlistIndex].songs = [];
                    }

                    playlists[playlistIndex].songs.push(songData);
                    playlists[playlistIndex].updatedAt = new Date().toISOString();

                    localStorage.setItem(key, JSON.stringify(playlists));
                    break;
                }
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            throw error;
        }
    },

    // Eliminar canción de playlist
    async removeSongFromPlaylist(playlistId, songId) {
        try {
            const allKeys = Object.keys(localStorage).filter(key => key.startsWith('playlists_'));

            for (const key of allKeys) {
                const playlists = JSON.parse(localStorage.getItem(key) || '[]');
                const playlistIndex = playlists.findIndex(p => p.id === playlistId);

                if (playlistIndex !== -1) {
                    playlists[playlistIndex].songs = playlists[playlistIndex].songs?.filter(song => song.id !== songId) || [];
                    playlists[playlistIndex].updatedAt = new Date().toISOString();

                    localStorage.setItem(key, JSON.stringify(playlists));
                    break;
                }
            }
        } catch (error) {
            console.error('Error removing song from playlist:', error);
            throw error;
        }
    }
};