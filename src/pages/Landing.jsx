import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Music } from "lucide-react";
import { useModals, useAuth } from "../hook/useAuth";
import { LOGO_VMUSIC } from "../constants/imagenes";
import { features } from "../context/LandingCards.jsx";
import { genres } from "../constants/NavLinkConst.js";

const logo = LOGO_VMUSIC[0];

function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { openLogin } = useModals();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigation = (route) => {
    if (isAuthenticated) {
      navigate(route);
    } else {
      openLogin(route);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div
          className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <img src={logo.src} alt={logo.alt} width={150} />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Sound-Music
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre, reproduce y organiza millones de canciones. Tu música, tu manera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => handleNavigation("/home")}
              className="group relative px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-2xl"
            >
              <span className="flex items-center gap-2">
                <Play size={24} />
                Comenzar ahora
              </span>
              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>

            <button
              onClick={() => handleNavigation("/songDetail")}
              className="px-8 py-4 border-2 border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Explorar música
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Todo lo que necesitas</h2>
            <p className="text-xl text-gray-400">
              Una experiencia musical completa en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="mb-4 text-purple-400 group-hover:text-pink-400 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-gray-400">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explora por género</h2>
            <p className="text-xl text-gray-400">Encuentra tu estilo musical favorito</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <button
                key={index}
                onClick={() => navigate(`/home?q=${genre.name.toLowerCase()}`)}
                className={`group relative h-32 rounded-xl bg-linear-to-br ${genre.gradient} overflow-hidden hover:scale-105 transition-transform shadow-xl`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <div className="relative h-full flex items-center justify-center">
                  <h3 className="text-xl font-bold">{genre.name}</h3>
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Music size={24} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para comenzar?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Únete a miles de usuarios que ya disfrutan de su música favorita
              </p>
              <button
                onClick={() => navigate("/home")}
                className="group relative px-10 py-5 bg-white text-purple-900 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  Empezar gratis
                  <Play size={24} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400"></div>
      </footer>
    </div>
  );
}

export default Home;
