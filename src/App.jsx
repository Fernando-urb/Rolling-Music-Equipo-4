import "preline/preline.js";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Home from "./pages/Home";
import SongDetail from "./pages/SongDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/songDetail" element={<SongDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
