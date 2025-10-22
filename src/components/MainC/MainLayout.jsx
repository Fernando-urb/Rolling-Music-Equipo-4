const MainLayout = ({ children }) => {
  return (
    <main className="lg:hs-overlay-layout-open:ps-60 bg-gray-400 dark:bg-gray-900 transition-all duration-300 lg:fixed lg:inset-0 pt-22 px-3 pb-3  ">
      <div className="h-[calc(100dvh-62px)] lg:h-full overflow-hidden flex flex-col bg-gray-300 border border-gray-200 shadow-xs rounded-lg   bg-linear-to-b dark:from-black  dark:via-fuchsia-400 dark:to-gray-950">
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
