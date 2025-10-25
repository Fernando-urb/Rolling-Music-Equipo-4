import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App.jsx";
import "./index.css";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext"; // 1. IMPORTAR AUTH
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. ENVOLVER TODO CON AUTHPROVIDER */}
    <AuthProvider>
      <ModalProvider>
        <BrowserRouter>
          <App />
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
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
