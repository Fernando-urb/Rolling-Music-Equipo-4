import {
  FaHome,
  FaChartLine,
  FaMusic,
  FaCompactDisc,
  FaHeadphones,
  FaRecordVinyl,
  FaUsers,
  FaListUl,
  FaClock,
  FaInfoCircle,
  FaShieldAlt,
  FaUserCog,
} from "react-icons/fa";

export const PAGES_NAVIGATE = [
  {
    name: "Inicio",
    icon: FaHome,
    href: "/home",
  },
  {
    name: "Tendencias",
    icon: FaChartLine,
    href: "/songDetail",
  },
  {
    name: "Géneros",
    icon: FaMusic,
    href: "/",
  },
  {
    name: "Álbumes",
    icon: FaCompactDisc,
    href: "/",
  },
];

//no se tiene que mostrar hasta que el usuario inicie sesion
export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: FaHeadphones,
    href: "/",
  },
  {
    name: "Álbumes",
    icon: FaRecordVinyl,
    href: "/",
  },
  {
    name: "Artistas",
    icon: FaUsers,
    href: "/",
  },
  {
    name: "Playlists",
    icon: FaListUl,
    href: "/",
  },
  {
    name: "Historial",
    icon: FaClock,
    href: "/",
  },
];

export const FOOTER_LINKS = [
  {
    name: "Acerca de",
    icon: FaInfoCircle,
    href: "/about",
  },
];

// Enlaces de administrador (solo para admins)
export const ADMIN_LINKS = [
  {
    name: "Panel Admin",
    icon: FaShieldAlt,
    href: "/admin",
  },
  {
    name: "Gestión Usuarios",
    icon: FaUserCog,
    href: "/admin/users",
  },
];

// Función para obtener enlaces del footer según el rol del usuario
export const getFooterLinks = (isAdmin = false) => {
  const baseLinks = [...FOOTER_LINKS];

  if (isAdmin) {
    return [...baseLinks, ...ADMIN_LINKS];
  }

  return baseLinks;
};

export const genres = [
  { name: "Pop", gradient: "from-pink-500 to-purple-600" },
  { name: "Rock", gradient: "from-red-500 to-orange-600" },
  { name: "Hip Hop", gradient: "from-yellow-500 to-red-600" },
  { name: "Reggaeton", gradient: "from-green-500 to-teal-600" },
  { name: "Electronic", gradient: "from-blue-500 to-purple-600" },
  { name: "Jazz", gradient: "from-indigo-500 to-blue-600" },
];
