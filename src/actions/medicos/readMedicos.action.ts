'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { medicosService } from '@/services/medicos.service';

export const readMedicos = async () => {
        const session = await auth();
        const userId = session?.user?.id;
    
        // Verificar session usuario
        if (!userId) {
            redirect(`/auth/login`)
        };
        const token = session!.user.token;

    try {

        const {ok, message, medicos} = await medicosService.readMedicos(token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            medicos
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
