'use server';

import { auth } from '@/auth.config';
import { orderService } from '@/services/orders.service';
import { revalidatePath } from 'next/cache';


interface UpdateOrder {
    orderId: string;
    transactionId?: string;
    pagado?: boolean;
}
export const updateOrder = async ({ orderId, pagado, transactionId }: UpdateOrder) => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sessión de usuario',
        };
    };
    const token = session!.user.token;
    try {

        const { ok, message, order } = await orderService.update(
            { orderId, pagado, transactionId },
            token,
        );

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
