import { Music } from "lucide-react";

function GenreCard({ genre, onClick }) {
  if (!genre) return null;

  const handleClick = () => {
    if (onClick) {
      onClick(genre.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative h-32 w-32 rounded-xl overflow-hidden cursor-pointer 
                  bg-gradient-to-br ${genre.linear} 
                  hover:scale-105 transition-transform shadow-xl flex-shrink-0`}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

      {/* Nombre del género */}
      <div className="relative h-full flex items-center justify-center text-center px-2">
        <h3 className="text-base font-bold text-white truncate">{genre.name}</h3>
      </div>

      {/* Ícono musical */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Music size={20} className="text-white" />
      </div>
    </div>
  );
}

export default GenreCard;
