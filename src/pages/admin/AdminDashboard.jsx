import { useState, useEffect } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { Users, Music, BarChart3 } from "lucide-react";

// Tarjeta de estadística reutilizable
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4">
    <div className={`p-3 rounded-full ${colorClass}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Carga el número de usuarios desde localStorage
    try {
      const usersInStorage = JSON.parse(localStorage.getItem("users") || "[]");
      setUserCount(usersInStorage.length);
    } catch (error) {
      console.error("Error al leer usuarios de localStorage:", error);
    }
  }, []);

  return (
    <AdminLayout title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]}>
      {/* Tu subtítulo original */}
      <p className="text-lg text-gray-400 mb-6">este es el dasboard de admin</p>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Usuarios Totales"
          value={userCount} // Dato real
          icon={<Users size={24} className="text-white" />}
          colorClass="bg-blue-500"
        />

        <StatCard
          title="Canciones Populares"
          value="40+" // Dato ficticio
          icon={<Music size={24} className="text-white" />}
          colorClass="bg-purple-500"
        />

        <StatCard
          title="Búsquedas (Hoy)"
          value="1,204" // Dato ficticio
          icon={<BarChart3 size={24} className="text-white" />}
          colorClass="bg-pink-500"
        />

        <StatCard
          title="Nuevos Registros"
          value="5" // Dato ficticio
          icon={<Users size={24} className="text-white" />}
          colorClass="bg-green-500"
        />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
