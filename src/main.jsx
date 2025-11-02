import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext"; // 1. IMPORTAR AUTH
import { PlayerProvider } from "./context/PlayerContext"; // 2. IMPORTAR PLAYER

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  </React.StrictMode>
);
