import { useState } from "react";
import { savePlaylist } from "../../utils/favoritos";
import Swal from "sweetalert2";
import Button from "../common/Button";
import { toast } from "react-toastify";

export default function CrearPlaylist({ visible, onClose }) {
  const [name, setName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleSave = () => {
    if (!name.trim()) {
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
    if (selectedTracks.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Selecciona canciones 🎶",
        text: "Tu playlist necesita al menos una canción para comenzar a sonar.",
        confirmButtonColor: "#a855f7",
        confirmButtonText: "¡Entendido!",
        background: "#0f0f0f",
        color: "#f3f3f3",
      });
      return;
    }

    savePlaylist(name.trim(), selectedTracks);
    toast.success(`🎉 Playlist "${name}" creada exitosamente!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
    setName("");
    setSelectedTracks([]);
    onClose();
    Swal.fire({
      icon: "success",
      title: "¡Playlist creada! 💫",
      text: `Tu lista "${name}" fue creada exitosamente. ¡A disfrutar de la música! 🎧`,
      confirmButtonColor: "#a855f7",
      confirmButtonText: "¡Entendido!",
      background: "#0f0f0f",
      color: "#f3f3f3",
    });
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-gradient-to-br from-purple-900 via-blue-900 to-purple-500 p-6 rounded-lg shadow-lg z-50 w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4"> Crear Nueva Playlist</h2>

        {/* Nombre de la playlist */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Nombre de la Playlist
          </label>
          <input
            type="text"
            placeholder="Ej: Mi musica favorita"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* SelecciÃ³n de canciones */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Canciones ({selectedTracks.length} seleccionadas)
          </label>
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
            {allTracks &&
              allTracks.map((track) => (
                <div
                  key={track.id}
                  className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                    selectedTracks.includes(track.id) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => toggleTrackSelection(track.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedTracks.includes(track.id)}
                    onChange={() => toggleTrackSelection(track.id)}
                    className="mr-3"
                  />
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
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleSave}>
            Crear Playlist
          </Button>
          <Button onClick={onClose} variant="danger">
            Cerrar
          </Button>
        </div>
      </div>
    </>
  );
}
