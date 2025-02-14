'use server';

import { auth } from '@/auth.config';
import { paypalService } from '@/services/paypal.service';

export const downloadInvoice = async (orderId: string) => {
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

        const {ok, message, pdf} = await paypalService.downloadInvoice(orderId, token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };

        return {
            ok: true,
            message,
            pdf
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
