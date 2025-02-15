

'use server';

import { auth } from '@/auth.config';
import { consultasService } from '@/services/consultas.service';
import { redirect } from 'next/navigation';

// 15879626-0827-43b0-8214-25b559fb847a
export const readConsultasByPaciente = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`);
    };
    const token = session!.user.token;
    const pacienteId = session.user.paciente.id_paciente
    try {
        
        const { ok, message, consultas } = await consultasService.readConsultasByPaciente(pacienteId, token);
     
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };

        return {
            ok: true,
            consultas,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
