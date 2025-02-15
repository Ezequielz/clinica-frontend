

'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { consultasService } from '@/services/consultas.service';
import { revalidatePath } from 'next/cache';


export const deleteConsultaById = async (consultaId: string) => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`);
    };
    const token = session!.user.token;
  
    try {
        
        const { ok, message, consulta } = await consultasService.deleteConsultaById(consultaId, token);
     
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        revalidatePath('/consultas');

        return {
            ok: true,
            consulta,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
