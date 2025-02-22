'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { medicosService } from '@/services/medicos.service';



export const deleteMedico = async (medicoId: string) => {
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

        const {ok, message, medico} = await medicosService.deleteMedico(medicoId, token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/admin')
        revalidatePath('/medicos')
        revalidatePath(`/medicos/edit/${medicoId}`)

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
