import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Tendencias from "../pages/Tendencias";
import Generos from "../pages/Generos";
import Albunes from "../pages/Albunes";
import Canciones from "../pages/Canciones";
import Artistas from "../pages/Artistas";
import Playlist from "../pages/Playlist";
import NotFound from "../pages/NotFound";

function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="tendencias"
          element={
            <ProtectedRoute>
              <Tendencias />
            </ProtectedRoute>
          }
        />
        <Route
          path="generos"
          element={
            <ProtectedRoute>
              <Generos />
            </ProtectedRoute>
          }
        />
        <Route
          path="albunes"
          element={
            <ProtectedRoute>
              <Albunes />
            </ProtectedRoute>
          }
        />
        <Route
          path="canciones"
          element={
            <ProtectedRoute>
              <Canciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="artistas"
          element={
            <ProtectedRoute>
              <Artistas />
            </ProtectedRoute>
          }
        />
        <Route
          path="playlist"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }
        />
        {/* 404 para rutas de usuario */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserLayout>
  );
}

export default UserRoutes;
