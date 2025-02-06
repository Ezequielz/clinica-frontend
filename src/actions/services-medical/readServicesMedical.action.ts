'use server';

import { servicesMedicalService } from '@/services/servicesMedical.service';

export const readServicesMedical = async () => {

    try {

        const { ok, message, servicesMedical } = await servicesMedicalService.readServicesMedical();

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            servicesMedical,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
