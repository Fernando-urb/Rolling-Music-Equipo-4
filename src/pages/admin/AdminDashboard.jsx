import AdminLayout from "../../components/Admin/AdminLayout";

function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="text-3xl text-white">este es el dasboard de admin</div>
    </AdminLayout>
  );
}

export default AdminDashboard;
