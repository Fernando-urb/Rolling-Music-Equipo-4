import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
export const registerSchema = z
  .object({
    userName: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const taskSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(500, "La descripción debe tener menos de 100 caracteres"),
  date: z.string().min(3, "La fecha debe tener al menos 3 caracteres"),
});
