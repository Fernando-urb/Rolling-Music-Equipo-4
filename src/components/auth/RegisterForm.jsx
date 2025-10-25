import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validationSchema";
import { toast } from "react-toastify";
import Input from "../Input";
import bcrypt from "bcryptjs";
import { useAuth } from "../../hook/useAuth"; // 1. IMPORTAR useAuth

function RegisterForm({ onRegister }) {
  const { login } = useAuth(); // 2. OBTENER la función login
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { ...userData } = data;
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u) => u.email === userData.email)) {
        toast.error("El email ya esta registrado");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const userToSave = { ...userData, password: hashedPassword };
      users.push(userToSave);
      localStorage.setItem("users", JSON.stringify(users));

      // Objeto de usuario para guardar en 'user' (sin contraseña)
      const userWithoutHash = { ...userData, password: undefined };

      // 3. LLAMAR AL LOGIN DEL CONTEXTO
      login(userWithoutHash);
      // 4. onRegister cierra el modal y redirige (viene de RegisterModal.jsx)
      onRegister(userWithoutHash); // <-- CORREGIDO (antes pasaba 'userToSave')

      toast.success("Registro exitoso :)");
    } catch (error) {
      console.log(error);
      toast.error("Error en el registro :(");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ... (inputs no cambiaron) ... */}
      <Input
        label="Usuario"
        type="text"
        name="userName"
        placeholder="Tu usuario"
        register={register}
        error={errors.userName}
      />
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
      <Input
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        placeholder="••••••"
        register={register}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}

export default RegisterForm;
