'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { UpdateMedicoDTO } from '@/app/components/admin/medicos/ui/EditMedicoForm';
import { medicosService } from '@/services/medicos.service';



export const updateMedico = async (updateMedicoDTO: UpdateMedicoDTO) => {
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


    if (updateMedicoDTO.turnos) {
        const turnosPorDia = updateMedicoDTO.turnos?.reduce((acc, turno) => {
            acc[turno.dia_semana] = (acc[turno.dia_semana] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const tieneDuplicados = Object.values(turnosPorDia).some(count => count > 1);

        if (tieneDuplicados) {
            return {
                ok: false,
                message: 'No puedes asignar más de un turno al mismo día.',
            };
        }
    }


    try {

        const { ok, message, medico } = await medicosService.updateMedico(
            updateMedicoDTO,
            token,
        );

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/admin')
        revalidatePath('/admin/medico')

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
