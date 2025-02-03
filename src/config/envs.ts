import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string()
  .url({ message: 'La URL debe ser válida' }),
  PAYPAL_CLIENT_ID: z.string(),
});

const envs = envSchema.safeParse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
});

if (!envs.success) {
  console.error('❌ Error en las variables de entorno:', envs.error.format());
  throw new Error('Faltan variables de entorno. Revisa tu .env.local');
}

export default envs.data;
