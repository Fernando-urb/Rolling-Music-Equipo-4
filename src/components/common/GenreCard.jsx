// src/components/common/GenreCard.jsx
import React from "react";

/**
 * Muestra una tarjeta para un Género.
 * Recibe un objeto 'genre' (de getGenres) y una función 'onClick'.
 */
function GenreCard({ genre, onClick }) {
  if (!genre) return null;

  const handleClick = () => {
    console.log("🟢 GenreCard clicked - ID:", genre.id); // Debug
    if (onClick) {
      onClick(genre.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center p-3 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
    >
      <img
        src={genre.image}
        alt={genre.name}
        className="w-24 h-24 rounded-full object-cover mb-3"
      />
      <div className="overflow-hidden text-center">
        <p className="font-semibold text-gray-800 dark:text-white truncate">
          {genre.name}
        </p>
      </div>
    </div>
  );
}

export default GenreCard;