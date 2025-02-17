'use server';

import { UserRol } from '@/app/interfaces/user';
import { auth } from '@/auth.config';
import { usersService } from '@/services/users.service';
import { redirect } from 'next/navigation';

export const readAllUsers = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`)
    };

    if (session.user.rol !== UserRol.ADMIN) {
        return {
            ok: false,
            message: 'No estás autorizado'
        }
    }
    const token = session!.user.token;

    try {

        const { ok, message, users } = await usersService.readAllUsers(token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            users,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
