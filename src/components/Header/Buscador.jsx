import { useState } from "react";

const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchTerm);
    }

    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-sm">
      <label htmlFor="icon" className="sr-only">
        Buscar
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <svg
            className="shrink-0 size-4 text-gray-400 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <input
          type="search"
          id="icon"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          className="py-2.5 ps-10 pe-4 block w-full  rounded-lg text-sm  disabled:pointer-events-none  bg-white border border-gray-200 text-gray-600 shadow-xs hover:border-gray-300 focus:outline-hidden focus:border-gray-300 disabled:opacity-50  dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:focus:border-neutral-600"
          placeholder="Buscar canciones o artistas..."
        />
      </div>
    </form>
  );
};

export default Buscador;
