'use server';

import { servicesMedicalService } from '@/services/servicesMedical.service';

export const readServiceMedicalByCode = async (code: string) => {

    if (!code ) return {
        ok: false,
        message: 'Missing code'
    }

    try {

        const { ok, message, serviceMedical } = await servicesMedicalService.readServiceMedicalById(code);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            serviceMedical,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
