'use server';

import { paquetesService } from "@/services/paquetes.service";



export const readPaquetes = async () => {

    try {

        const {ok, paquetes, message} = await paquetesService.readPaquetes();

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            paquetes
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
