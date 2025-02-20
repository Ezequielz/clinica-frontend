'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { servicesMedicalService } from '@/services/servicesMedical.service';



export const deleteServiceMedical = async (servicioMedicoId: string) => {
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

        const {ok, message, medicalSpecialitydeleted} = await servicesMedicalService.deleteService(servicioMedicoId, token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/admin')
        revalidatePath('/servicios-medicos')
        revalidatePath(`/servicios-medicos/edit/${servicioMedicoId}`)

        return {
            ok: true,
            medicalSpecialitydeleted,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
