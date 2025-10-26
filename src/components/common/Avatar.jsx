import { FaUser } from "react-icons/fa";

function Avatar({ src, alt = "Avatar", className = "w-10 h-10", iconClassName = "w-5 h-5" }) {
  return (
    <div
      className={`${className} rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center border-2 border-pink-400 shadow-lg overflow-hidden`}
    >
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
          onError={(e) => {
            // Si la imagen falla al cargar, ocultar el elemento img
            e.target.style.display = "none";
            // Mostrar el icono de usuario
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className={`${src ? "hidden" : "flex"} items-center justify-center w-full h-full text-white`}
        style={{ display: src ? "none" : "flex" }}
      >
        <FaUser className={iconClassName} />
      </div>
    </div>
  );
}

export default Avatar;
