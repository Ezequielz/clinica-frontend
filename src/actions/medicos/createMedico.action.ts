'use server';

import { auth } from '@/auth.config';
import { CreateMedicoDTO } from '@/app/components/admin/medicos/ui/CreateMedicoForm';
import { medicosService } from '@/services/medicos.service';
import { revalidatePath } from 'next/cache';


export const createMedico = async (createMedicoDTO: CreateMedicoDTO) => {

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

        const { ok, message } = await medicosService.createMedico(createMedicoDTO, token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        revalidatePath('/admin')
        revalidatePath('/admin/medicos')
        revalidatePath('/admin/medicos/new')


        return {
            ok: true,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};