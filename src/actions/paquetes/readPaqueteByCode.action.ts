'use server';

import { paquetesService } from '@/services/paquetes.service';

export const readPaqueteByCode = async (code: string) => {

    if (!code ) return {
        ok: false,
        message: 'Missing code'
    }

    try {

        const { ok, message, paquete } = await paquetesService.readPaqueteByCode(code);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            paquete,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
