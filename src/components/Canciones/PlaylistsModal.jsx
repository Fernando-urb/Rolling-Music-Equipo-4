import { useState, useEffect } from "react";
import { getPlaylists, deletePlaylist } from "../../utils/favoritos";
import { Trash2, FolderUp, ListMusic } from "lucide-react";
import Button from "../common/Button";
import Swal from "sweetalert2";

export default function PlaylistsModal({ visible, onClose, allTracks }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    if (visible) {
      setPlaylists(getPlaylists());
    }
  }, [visible]);

  const handleDeletePlaylist = (playlistName) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar la playlist "${playlistName}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
      background: "#0f0f0f",
      color: "#f3f3f3",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica original de eliminación
        const updatedPlaylists = deletePlaylist(playlistName);
        setPlaylists(updatedPlaylists);
        if (selectedPlaylist === playlistName) {
          setSelectedPlaylist(null);
        }
        // Confirmación visual
        Swal.fire({
          title: "¡Playlist eliminada! 🗑",
          text: `La playlist "${playlistName}" fue eliminada correctamente.`,
          icon: "success",
          confirmButtonColor: "#a855f7",
          background: "#0f0f0f",
          color: "#f3f3f3",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (!visible) return null;

  const playlistNames = Object.keys(playlists);
  const selectedTrackIds = playlists[selectedPlaylist] || [];
  const selectedTracks = allTracks.filter((track) => selectedTrackIds.includes(track.id));

  return (
    <>
      <div className="fixed inset-0 bg-black/90 bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-500 p-6 rounded-lg shadow-lg z-50 w-[90vw] max-w-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-100 flex gap-2">
          {" "}
          <ListMusic className="size-8 text-" />
          Tus Playlists
        </h2>

        {playlistNames.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-200 mb-4">No hay playlists guardadas.</p>
            <p className="text-sm text-gray-200">Crea tu primera playlist para empezar.</p>
          </div>
        ) : (
          <div className="mb-4 ">
            {playlistNames.map((name) => (
              <div
                key={name}
                className={`flex items-center justify-between px-4 py-3 rounded-lg mb-2 border ${
                  selectedPlaylist === name
                    ? "bg-blue-50 border-blue-200 font-semibold"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <button className="flex-grow text-left" onClick={() => setSelectedPlaylist(name)}>
                  <span className="flex gap-2 items-center text-gray-800">
                    <FolderUp className="text-yellow-400" /> {name}
                    <span className="ml-2 text-sm text-gray-500">
                      ({playlists[name]?.length || 0} canciones)
                    </span>
                  </span>
                </button>
                <button
                  className="text-red-500 hover:text-red-700 ml-2 px-2 py-1 text-sm"
                  onClick={() => handleDeletePlaylist(name)}
                  title="Eliminar playlist"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedPlaylist && (
          <div className="border-t pt-4 ">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              Canciones en "{selectedPlaylist}"
            </h3>
            {selectedTracks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay canciones en esta playlist.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto border-gray-600 rounded-xl p-2 bg-black/70">
                {selectedTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center p-2  mb-2">
                    <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                    <img
                      src={
                        track.album?.images?.[2]?.url ||
                        track.cover ||
                        "https://via.placeholder.com/40"
                      }
                      alt={track.name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-sm">{track.name}</p>
                      <p className="text-xs text-gray-600">
                        {track.artists?.map((a) => a.name).join(", ") ||
                          track.artist ||
                          "Artista desconocido"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Button onClick={onClose} variant="danger">
          Cerrar
        </Button>
      </div>
    </>
  );
}
