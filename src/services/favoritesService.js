export const favoritesService = {
  getFavoritesKey(userId) {
    return `favorites_${userId}`;
  },

  async addToFavorites(userId, song) {
    try {
      const favoritesKey = this.getFavoritesKey(userId);
      const existingFavorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      
      const exists = existingFavorites.find(fav => fav.songId === song.id);
      if (exists) {
        throw new Error('Song already in favorites');
      }

      const favoriteId = Date.now().toString();
      const newFavorite = {
        id: favoriteId,
        userId,
        songId: song.id,
        title: song.title,
        artist: song.artist?.name || 'Artista desconocido',
        album: song.album?.title || '',
        duration: song.duration,
        preview: song.preview,
        cover: song.album?.cover_medium || song.album?.cover_small || '',
        addedAt: new Date().toISOString()
      };

      existingFavorites.unshift(newFavorite);
      localStorage.setItem(favoritesKey, JSON.stringify(existingFavorites));
      
      return favoriteId;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  async getUserFavorites(userId) {
    try {
      const favoritesKey = this.getFavoritesKey(userId);
      const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      
      return favorites.map(fav => ({
        ...fav,
        addedAt: new Date(fav.addedAt)
      }));
    } catch (error) {
      console.error('Error getting favorites:', error);
      throw error;
    }
  },

  async removeFromFavorites(favoriteId) {
    try {
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('favorites_'));
      
      for (const key of allKeys) {
        const favorites = JSON.parse(localStorage.getItem(key) || '[]');
        const filteredFavorites = favorites.filter(fav => fav.id !== favoriteId);
        
        if (filteredFavorites.length !== favorites.length) {
          localStorage.setItem(key, JSON.stringify(filteredFavorites));
          break;
        }
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  async isFavorite(userId, songId) {
    try {
      const favoritesKey = this.getFavoritesKey(userId);
      const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      
      const favorite = favorites.find(fav => fav.songId === songId);
      return favorite ? favorite.id : null;
    } catch (error) {
      console.error('Error checking favorite:', error);
      return null;
    }
  }
};