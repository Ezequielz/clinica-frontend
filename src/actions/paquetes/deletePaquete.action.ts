'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { paquetesService } from '@/services/paquetes.service';



export const deletePaquete = async (paqueteCode: string) => {
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

        const {ok, message, paquete} = await paquetesService.deletePaquete(paqueteCode, token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/admin')
        revalidatePath('/paquetes')
        revalidatePath(`/paquetes/edit/${paqueteCode}`)

        return {
            ok: true,
            paquete,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
