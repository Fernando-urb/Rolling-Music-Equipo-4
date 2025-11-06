import { useState, useEffect } from "react";
import { getPopularTracks } from "../services/deezerApi";
import TrackCard from "../components/Canciones/TrackCard";
import PlaylistModal from "../components/Canciones/PlaylistsModal";
import CrearPlaylist from "../components/Canciones/CrearPlaylist";
import FavoritesModal from "../components/Canciones/FavoritesModal";
import AddToPlaylistModal from "../components/Canciones/AddToPlaylistModal";
import { useModalFav } from "../hook/usemodalFav";
import { migrateOldData } from "../utils/favoritos";
import Button from "../components/Ui/Button";
import PageHeader from "../components/Ui/PageSection";

function Canciones() {
  const [tracks, setTracks] = useState([]);
  const [addToPlaylistModal, setAddToPlaylistModal] = useState({
    visible: false,
    trackId: null,
    trackName: "",
  });

  useEffect(() => {
    // Migrar datos antiguos si existen
    migrateOldData();

    // Cargar tracks
    getPopularTracks().then(setTracks);
  }, []);

  const handleAddToPlaylist = (trackId) => {
    const track = tracks.find((t) => t.id === trackId);
    setAddToPlaylistModal({
      visible: true,
      trackId: trackId,
      trackName: track?.name || track?.title || "Canción desconocida",
    });
  };

  const closeAddToPlaylistModal = () => {
    setAddToPlaylistModal({
      visible: false,
      trackId: null,
      trackName: "",
    });
  };

  const {
    showFavoritos,
    hideFavoritos,
    showPlaylists,
    hidePlaylists,
    showCrearPlaylist,
    hideCrearPlaylist,
    isFavoritosOpen,
    isPlaylistsOpen,
    isCrearPlaylistOpen,
  } = useModalFav();

  return (
    <div className="p-6 bg-transparent min-h-screen">
      <PageHeader title="Sound-Music Top 20" />
      <div className="text-center my-4 space-x-4 ">
        <Button onClick={showFavoritos}>Mis Favoritos</Button>
        <Button onClick={showCrearPlaylist}>Crear Playlist</Button>
        <Button onClick={showPlaylists}>Ver Playlists</Button>
      </div>

      {/* Modales */}
      <CrearPlaylist visible={isCrearPlaylistOpen} onClose={hideCrearPlaylist} allTracks={tracks} />
      <FavoritesModal visible={isFavoritosOpen} onClose={hideFavoritos} tracks={tracks} />
      <PlaylistModal visible={isPlaylistsOpen} onClose={hidePlaylists} allTracks={tracks} />
      <AddToPlaylistModal
        visible={addToPlaylistModal.visible}
        onClose={closeAddToPlaylistModal}
        trackId={addToPlaylistModal.trackId}
        trackName={addToPlaylistModal.trackName}
      />

      <div className="flex  flex-wrap gap-3 justify-center ">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} onAddToPlaylist={handleAddToPlaylist} />
        ))}
      </div>
    </div>
  );
}

export default Canciones;
