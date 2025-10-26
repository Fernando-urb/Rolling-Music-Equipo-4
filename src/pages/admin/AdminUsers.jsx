import AdminLayout from "../../components/Admin/AdminLayout";

function AdminUsers() {
  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Gestión de Usuarios" }];

  return (
    <AdminLayout title="Gestión de Usuarios" breadcrumbs={breadcrumbs}>
      <div className="text-3xl text-white">este es el dasboard de admin/user</div>
    </AdminLayout>
  );
}

export default AdminUsers;
