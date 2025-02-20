'use server';

import { auth } from '@/auth.config';
import { usersService } from '@/services/users.service';
import { revalidatePath } from 'next/cache';



export const deleteUser = async (userId: string) => {
    const session = await auth();
   

    // Verificar session usuario
    if (!session?.user?.id) {
        return {
            ok: false,
            message: 'No hay sessión de usuario',
        };
    };
    const token = session!.user.token;
    try {

        const { ok, message, user } = await usersService.deleteUser(
            userId,
            token,
        );

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/profile')
        revalidatePath('/admin')
        revalidatePath('/admin/users')
        revalidatePath('/admin/orders')
        revalidatePath('/admin/consultas')

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
