'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import { orderService } from '@/services/orders.service';


export const deleteOrderById = async (orderId: string) => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        redirect(`/auth/login`);
    };
    const token = session!.user.token;

    try {

        const { ok, message, order } = await orderService.deleteOrderById(orderId, token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        revalidatePath('/consultas');
        revalidatePath('/admin');
        revalidatePath('/admin/orders');
        revalidatePath(`/admin/orders/edit/${orderId}`);

        return {
            ok: true,
            order,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
