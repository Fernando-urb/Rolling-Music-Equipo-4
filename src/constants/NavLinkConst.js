import {
  Home,
  TrendingUp,
  Music,
  Disc,
  Headphones,
  Heart,
  ListMusic,
  Info,
  Shield,
  UserCog,
  ListPlus,
} from "lucide-react";

export const PAGES_NAVIGATE = [
  {
    name: "Inicio",
    icon: Home,
    href: "/home",
  },
  {
    name: "Tendencias",
    icon: TrendingUp,
    href: "/tendencias",
  },
  {
    name: "Géneros",
    icon: Music,
    href: "/generos",
  },
  {
    name: "Álbumes",
    icon: Disc,
    href: "/albunes",
  },
];

export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: Headphones,
    href: "/canciones",
  },
];
export const PAGES_FAVORITOS = (handlers) => [
  {
    name: "Favoritos",
    icon: Heart,
    onClick: handlers.showFavoritos,
  },
  {
    name: "Mis Playlists",
    icon: ListMusic,
    onClick: handlers.showPlaylists,
  },
  {
    name: "Crear Playlist",
    icon: ListPlus,
    onClick: handlers.showCrearPlaylist,
  },
];

export const FOOTER_LINKS = [
  {
    name: "Acerca de",
    icon: Info,
    href: "/about",
  },
];

export const getFooterLinks = (isAdmin = false) => {
  const baseLinks = [...FOOTER_LINKS];

  if (isAdmin) {
    return [...baseLinks, ...ADMIN_LINKS];
  }

  return baseLinks;
};

export const ADMIN_LINKS = [
  {
    name: "Panel Admin",
    icon: Shield,
    href: "/admin",
  },
  {
    name: "Gestión Usuarios",
    icon: UserCog,
    href: "/admin/users",
  },
];

export const genres = [
  { name: "Pop", linear: "from-pink-500 to-purple-800" },
  { name: "Rock", linear: "from-red-500 to-orange-600" },
  { name: "Hip Hop", linear: "from-yellow-500 to-red-600" },
  { name: "Reggaeton", linear: "from-green-500 to-teal-600" },
  { name: "Electronic", linear: "from-blue-500 to-purple-600" },
  { name: "Jazz", linear: "from-indigo-500 to-blue-600" },
];

export const gradientStyles = [
  "from-pink-500 to-purple-800",
  "from-red-500 to-orange-600",
  "from-yellow-500 to-red-600",
  "from-green-500 to-teal-600",
  "from-blue-500 to-purple-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-rose-600",
  "from-emerald-500 to-cyan-600",
  "from-sky-500 to-indigo-600",
  "from-lime-500 to-green-600",
  "from-amber-500 to-yellow-600",
  "from-violet-500 to-pink-600",
  "from-cyan-500 to-blue-700",
  "from-orange-500 to-red-700",
  "from-teal-500 to-emerald-600",
  "from-rose-500 to-fuchsia-700",
  "from-purple-500 to-indigo-700",
  "from-blue-600 to-sky-500",
  "from-red-600 to-pink-500",
  "from-yellow-600 to-amber-500",
  "from-green-600 to-lime-500",
  "from-indigo-600 to-violet-500",
  "from-fuchsia-600 to-rose-500",
  "from-cyan-600 to-teal-500",
  "from-orange-600 to-yellow-500",
  "from-emerald-600 to-green-500",
];
