'use server';

import { infoService } from "@/services/info.service";



export const readInfo = async () => {

    try {

        const {ok, info, message} = await infoService.readInfo();

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            info: info!
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
