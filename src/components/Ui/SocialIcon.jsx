import React from "react";

function SocialIcon({ href, bgColor, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`w-10 h-10 ${bgColor} text-white rounded-full flex items-center justify-center transition-colors duration-300`}
    >
      {children}
    </a>
  );
}

export default SocialIcon;
