import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string()
  .url({ message: "La URL debe ser válida" }),
});

const envs = envSchema.safeParse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!envs.success) {
  console.error("❌ Error en las variables de entorno:", envs.error.format());
  throw new Error("Faltan variables de entorno. Revisa tu .env.local");
}

export default envs.data;
