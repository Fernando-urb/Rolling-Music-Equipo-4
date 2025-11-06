import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Twitch, Youtube } from "lucide-react";
import SocialIcon from "../Ui/SocialIcon";

function Footer() {
  const socialLinks = [
    {
      href: "https://twitter.com",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      icon: <Twitter size={20} />,
    },
    {
      href: "https://www.instagram.com",
      bgColor: "bg-purple-600 hover:bg-pink-700",
      icon: <Instagram size={20} />,
    },
    {
      href: "https://www.twitch.com",
      bgColor: "bg-purple-400 hover:bg-purple-600",
      icon: <Twitch size={20} />,
    },
    {
      href: "https://www.youtube.com",
      bgColor: "bg-red-600 hover:bg-red-700",
      icon: <Youtube size={20} />,
    },
    {
      href: "https://www.facebook.com",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      icon: <Facebook size={20} />,
    },
  ];

  return (
    <footer className="border-b border-gray-200/50 dark: bg-transparent  text-gray-200 overflow-hidden">
      {/* Contenido */}
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6 gap-4 bg-black/30">
        {/* Derechos */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold">Sound-Music</span> — Todos
          los derechos reservados
        </p>

        <Link
          to="/about"
          className="relative text-sm font-medium hover:text-purple-500 dark:hover:text-purple-400 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-purple-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
        >
          Sobre Nosotros
        </Link>

        <div className="flex space-x-5">
          {socialLinks.map(({ href, bgColor, icon }, index) => (
            <SocialIcon key={index} href={href} bgColor={bgColor}>
              {icon}
            </SocialIcon>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
