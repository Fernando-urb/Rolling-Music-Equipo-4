import "preline/preline.js";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import About from "./About";
import Home from "./Home";
import SongDetail from "./SongDetail";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/songDetail" element={<SongDetail />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
