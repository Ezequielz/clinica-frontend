'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      ok: true,
      message: 'Login exitoso, redirigiendo a la página principal',
    };
  } catch (error) {
    console.error('Error en la conexión con el servidor:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            message: 'Invalid credentials',
          };
        default:
          return {
            ok: false,
            message: 'Something went wrong',
          };
      }
    }
    return {
      ok: false,
      message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
    };
  }
};
