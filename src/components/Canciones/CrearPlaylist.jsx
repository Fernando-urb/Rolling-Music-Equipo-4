import { useState } from "react";
import { savePlaylist } from "../../utils/favoritos";
import Button from "../common/Button";
import { toast } from "react-toastify";

export default function CrearPlaylist({ visible, onClose }) {
  const [name, setName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("El nombre de la playlist es requerido", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    if (selectedTracks.length === 0) {
      toast.error("Selecciona al menos una canción", {
        position: "bottom-right",
        autoClose: 2000,
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
