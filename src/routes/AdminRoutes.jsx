import { Routes, Route } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import NotFound from "../pages/NotFound";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedAdminRoute>
            <AdminUsers />
          </ProtectedAdminRoute>
        }
      />
      {/* 404 para rutas de admin */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
