import Background from "../common/Background";

const MainLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Fondo animado con blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
      <Background/>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-0">
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 p-4 flex flex-col justify-center items-center">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
