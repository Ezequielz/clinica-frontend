'use server';


import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import { paypalService } from '@/services/paypal.service';



export const checkPayment = async (paypalTransactionId: string) => {
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

        const { ok, message } = await paypalService.CheckPayment(
            paypalTransactionId,
            token,
        );

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };

        revalidatePath('/');
        revalidatePath('/order');
        revalidatePath('/order/checkout');


        return {
            ok: true,
            message,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
