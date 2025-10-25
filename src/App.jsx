import "preline/preline.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Home from "./pages/Home";
import SongDetail from "./pages/SongDetail";
import NotFound from "./pages/NotFound";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModalProvider>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/songDetail" element={<SongDetail />} />
              {/* <Route path="/admin" element={<Admin />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <LoginModal />
        <RegisterModal />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ModalProvider>
    </div>
  );
}

export default App;