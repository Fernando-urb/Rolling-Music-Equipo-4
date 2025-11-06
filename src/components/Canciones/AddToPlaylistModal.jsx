import { useState, useEffect } from "react";
import { getPlaylists, savePlaylist } from "../../utils/favoritos";
import Swal from "sweetalert2";

export default function AddToPlaylistModal({ visible, onClose, trackId, trackName }) {
  const [playlists, setPlaylists] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);

  useEffect(() => {
    if (visible) {
      setPlaylists(getPlaylists());
    }
  }, [visible]);

  const addToExistingPlaylist = (playlistName) => {
    const currentTracks = playlists[playlistName] || [];
    if (!currentTracks.includes(trackId)) {
      const updatedTracks = [...currentTracks, trackId];
      savePlaylist(playlistName, updatedTracks);
      Swal.fire({
        icon: "success",
        title: "¡Tema agregado! 🎶",
        text: `Tu playlist "${playlistName}" acaba de ganar un nuevo ritmo 🔥`,
        confirmButtonColor: "#a855f7",
        confirmButtonText: "¡Entendido!",
        background: "#0f0f0f",
        color: "#f3f3f3",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Ups! Esta canción ya suena en tu lista 🎵",
        text: "Ya está sonando en tu playlist. Probá con otra",
        confirmButtonColor: "#a855f7",
        confirmButtonText: "¡Entendido!",
        background: "#0f0f0f",
        color: "#f3f3f3",
      });
    }
    onClose();
  };

  const createNewPlaylist = () => {
    if (!newPlaylistName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Sin nombre, sin ritmo 🎵",
        text: "Tu playlist necesita identidad antes de sonar.",
        confirmButtonColor: "#a855f7",
        confirmButtonText: "¡Entendido!",
        background: "#0f0f0f",
        color: "#f3f3f3",
      });
      return;
    }

    if (playlists[newPlaylistName.trim()]) {
      Swal.fire({
        icon: "error",
        title: "Nombre duplicado ❌",
        text: "Ya existe una playlist con ese nombre. Probá con otro título 🎶",
        confirmButtonColor: "#a855f7",
        confirmButtonText: "¡Entendido!",
        background: "#0f0f0f",
        color: "#f3f3f3",
      });
      return;
    }

    savePlaylist(newPlaylistName.trim(), [trackId]);
    Swal.fire({
      icon: "success",
      title: "¡Playlist creada! 💫",
      text: `Tu lista "${name}" fue creada exitosamente. ¡A disfrutar de la música! 🎧`,
      confirmButtonColor: "#a855f7",
      confirmButtonText: "¡Entendido!",
      background: "#0f0f0f",
      color: "#f3f3f3",
    });
    setNewPlaylistName("");
    setShowNewPlaylist(false);
    onClose();
  };

  if (!visible) return null;

  const playlistNames = Object.keys(playlists);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-80 max-h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">➕ Agregar a Playlist</h2>
        <p className="text-sm text-gray-600 mb-4">"{trackName}"</p>

        {/* Playlists existentes */}
        {playlistNames.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Playlists existentes:</h3>
            <div className="space-y-2">
              {playlistNames.map((name) => (
                <button
                  key={name}
                  className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => addToExistingPlaylist(name)}
                >
                  <span className="flex items-center justify-between">
                    <span>📁 {name}</span>
                    <span className="text-xs text-gray-500">
                      {playlists[name]?.length || 0} canciones
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crear nueva playlist */}
        <div className="border-t pt-4">
          {!showNewPlaylist ? (
            <button
              className="w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
              onClick={() => setShowNewPlaylist(true)}
            >
              ➕ Crear nueva playlist
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre de la nueva playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors"
                  onClick={createNewPlaylist}
                >
                  Crear
                </button>
                <button
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => {
                    setShowNewPlaylist(false);
                    setNewPlaylistName("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </>
  );
}
