const MainLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden ">
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-0">
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1 p-4 flex flex-col justify-center items-center">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
