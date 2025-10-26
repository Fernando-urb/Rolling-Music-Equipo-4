import {
  Home,
  TrendingUp,
  Music,
  Disc,
  Headphones,
  Users,
  List,
  Info,
  Shield,
  UserCog,
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

//no se tiene que mostrar hasta que el usuario inicie sesion
export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: Headphones,
    href: "/canciones",
  },

  {
    name: "Artistas",
    icon: Users,
    href: "/artistas",
  },
  {
    name: "Playlists",
    icon: List,
    href: "/playlist",
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
  { name: "Pop", gradient: "from-pink-500 to-purple-600" },
  { name: "Rock", gradient: "from-red-500 to-orange-600" },
  { name: "Hip Hop", gradient: "from-yellow-500 to-red-600" },
  { name: "Reggaeton", gradient: "from-green-500 to-teal-600" },
  { name: "Electronic", gradient: "from-blue-500 to-purple-600" },
  { name: "Jazz", gradient: "from-indigo-500 to-blue-600" },
];
