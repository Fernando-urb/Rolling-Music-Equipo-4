import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import googleAuthService from "../services/googleAuth";
import { AuthContext } from "../hook/useAuth";

// 1. Crear el Proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 4. Revisar si hay un usuario en localStorage cuando la app carga
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario de localStorage", error);
      localStorage.removeItem("user");
    }
  }, []);

  // 5. Función para iniciar sesión (que usarán tus formularios)
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 6. Función para cerrar sesión (que usará tu Header)
  const logout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.provider === "google") {
        await googleAuthService.logout();
      }
    } catch (error) {
      console.error("Error al cerrar sesión de Google:", error);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Sesión cerrada");
      // Opcional: Redirigir al inicio
      window.location.href = "/";
    }
  };

  const value = {
    user, // El objeto del usuario (o null)
    isAuthenticated: !!user, // Un booleano (true/false)
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
