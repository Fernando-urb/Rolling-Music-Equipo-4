import { ChevronRight } from "lucide-react";

export const PAGES_NAVIGATE = [
  {
    name: "Inico",
    icon: ChevronRight,
    href: "/home",
  },
  {
    name: "Tendencias",
    icon: ChevronRight,
    href: "/songDetail",
  },
  {
    name: "Generos",
    icon: ChevronRight,
    href: "/",
  },
  {
    name: "Albunes",
    icon: ChevronRight,
    href: "/",
  },
];

//no se tiene que mostrar hasta que el usuario inicie sesion
export const PAGES_MUSICA = [
  {
    name: "Canciones",
    icon: ChevronRight,
    href: "/",
  },
  {
    name: "Albunes",
    icon: ChevronRight,
    href: "/",
  },
  {
    name: "Artistas",
    icon: ChevronRight,
    href: "/",
  },
  {
    name: "Playlists",
    icon: ChevronRight,
    href: "/",
  },
  {
    name: "Historial",
    icon: ChevronRight,
    href: "/",
  },
];

export const FOOTER_LINKS = [
  {
    name: "About",
    icon: ChevronRight,
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
