import { 
  Home, 
  TrendingUp, 
  Music, 
  Disc3, 
  Music4, 
  Album, 
  Users, 
  ListMusic, 
  Clock, 
  Info 
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
    href: "/songDetail",
  },
  {
    name: "Géneros",
    icon: Music,
    href: "/",
  },
  {
    name: "Álbumes",
    icon: Disc3,
    href: "/",
  },
];

//no se tiene que mostrar hasta que el usuario inicie sesion
export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: Music4,
    href: "/",
  },
  {
    name: "Álbumes",
    icon: Album,
    href: "/",
  },
  {
    name: "Artistas",
    icon: Users,
    href: "/",
  },
  {
    name: "Playlists",
    icon: ListMusic,
    href: "/",
  },
  {
    name: "Historial",
    icon: Clock,
    href: "/",
  },
];

export const FOOTER_LINKS = [
  {
    name: "Acerca de",
    icon: Info,
    href: "/about",
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
