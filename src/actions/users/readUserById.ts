'use server';

import { auth } from '@/auth.config';
import { usersService } from '@/services/users.service';
import { redirect } from 'next/navigation';

export const readUserById= async (id: string) => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`)
    };
    const token = session!.user.token;

    try {

        const { ok, message, user } = await usersService.readUserById(id, token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            user,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
