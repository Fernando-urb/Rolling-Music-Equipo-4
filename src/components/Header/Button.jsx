const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <div className="px-2 dark:border-neutral-800">
      <button
        type={type}
        onClick={onClick}
        className={`
          px-4 py-3 text-center uppercase text-white rounded-lg shadow-lg block 
          bg-linear-to-r from-purple-600 via-purple-700 to-purple-800 
          hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 
          transition duration-500 ease-in-out
          ${className} // Aquí se añaden clases externas
        `}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
