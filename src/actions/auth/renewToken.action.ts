'use server';

import { auth } from "@/auth.config";
import { authService } from "@/services/auth/auth.service";


export const renewToken = async (token: string) => {

    const session = await auth();
    if (!session) {
        return {
            ok: false,
            message: 'No hay session activa'
        }
    }
    try {

        const { ok, message, newToken } = await authService.renewToken(token);

        if (!ok) {
            return {
                ok: false,
                message,
            }
        }
        return {
            ok: true,
            newToken,
        };
    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);

        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
