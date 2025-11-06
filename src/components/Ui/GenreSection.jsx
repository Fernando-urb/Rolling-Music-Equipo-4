import { Music } from "lucide-react";

function GenreSection({ genres }) {
  return (
    <section className="relative py-20 px-4 bg-black/30">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explora por género</h2>
          <p className="text-xl text-gray-400">Encuentra tu estilo musical favorito</p>
        </div>

        {/* Grid de géneros */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`group relative h-32 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-xl bg-gradient-to-br ${genre.linear}`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

              {/* Nombre del género */}
              <div className="relative h-full flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">{genre.name}</h3>
              </div>

              {/* Icono musical */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Music size={24} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GenreSection;
