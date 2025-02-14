'use server';

import { auth } from '@/auth.config';
import { consultasService } from '@/services/consultas.service';

interface CreateConsulta {
    servicioId: string;
    fecha_consulta: string;
    hora_consulta: string;
    medicoId: string;
};


export const createConsulta = async ({ servicioId,
    fecha_consulta,
    hora_consulta,
    medicoId,
}: CreateConsulta) => {


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
    const pacienteId = session.user.paciente.id_paciente

    try {

        const { ok, consulta, turnoReservado, message } = await consultasService.createConsulta({
            servicioId,
            fecha_consulta,
            hora_consulta,
            pacienteId,
            medicoId,
            token
        });
        console.log({message})
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            consulta,
            turnoReservado,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};