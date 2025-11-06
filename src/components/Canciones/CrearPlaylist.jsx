import { useState } from "react";
import { savePlaylist } from "../../utils/favoritos";
import Button from "../common/Button";
import Swal from "sweetalert2";

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
    Swal.fire({
      icon: "success",
      title: "¡Playlist creada! 💫",
      text: `Tu lista "${name}" fue creada exitosamente. ¡A disfrutar de la música! 🎧`,
      confirmButtonColor: "#a855f7",
      confirmButtonText: "¡Entendido!",
      background: "#0f0f0f",
      color: "#f3f3f3",
    });
    setName("");
    setSelectedTracks([]);
    onClose();
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
            placeholder="Ej: Mi música favorita"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
