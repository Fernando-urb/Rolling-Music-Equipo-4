import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import Input from "../Input";
import bcrypt from "bcryptjs";
import { useAuth } from "../../hook/useAuth";

function LoginForm({ onLogin }) {
  const { login } = useAuth(); // 2. OBTENER la función login
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === data.email);

      if (user) {
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (isValidPassword) {
          const userWithoutPassword = { ...user, password: undefined };

          // 3. LLAMAR AL LOGIN DEL CONTEXTO
          login(userWithoutPassword);
          // 4. onLogin cierra el modal y redirige (viene de LoginModal.jsx)
          onLogin(userWithoutPassword);

          toast.success("Login exitoso");
        } else {
          toast.error("Credenciales incorrectas");
        }
      } else {
        toast.error("Usuario no encontrado");
      }
    } catch (error) {
      console.log("Error en login:", error);
      toast.error("Error en el login :(");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="tu@email.com"
        register={register}
        error={errors.email}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        placeholder="••••••"
        register={register}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}

export default LoginForm;
