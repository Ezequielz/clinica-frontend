'use server';

import { auth } from '@/auth.config';
import { medicosService } from '@/services/medicos.service';
import { redirect } from 'next/navigation';

export const readMedicoById= async (id: string) => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`)
    };
    const token = session!.user.token;

    try {

        const { ok, message, medico } = await medicosService.readMedicoById(id, token);
      
        if (!ok) {
            return {
                ok: false,
                error: message,
            };
        };


        return {
            ok: true,
            medico,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
