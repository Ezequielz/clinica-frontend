'use server';

import { UserRol } from '@/app/interfaces/user';
import { auth } from '@/auth.config';
import { orderService } from '@/services/orders.service';
import { redirect } from 'next/navigation';

export const readAllOrders = async () => {
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

        const { ok, message, orders } = await orderService.readAllOrders(token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            orders,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
