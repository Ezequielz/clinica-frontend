'use server';

import { auth } from '@/auth.config';
import { consultasService } from '@/services/consultas.service';

interface Servicio {

    servicioId: string;
    fecha_consulta: string;
    hora_consulta: string;
    medicoId: string;

};

export interface CreateConsultasPack {
    paqueteCode: string;
    pacienteId: string;
    paqueteDetails: Servicio[]
};


export const createConsultasPack = async ({ pacienteId, paqueteDetails, paqueteCode }: CreateConsultasPack) => {


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

        const { ok, consultas, message, order } = await consultasService.createConsultasPack({
            pacienteId,
            paqueteDetails,
            paqueteCode
        }, token)


        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            consultas,
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