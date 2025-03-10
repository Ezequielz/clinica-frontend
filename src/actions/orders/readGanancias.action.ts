'use server';

import { GananciasDTO } from '@/app/components/admin/ganancias/ui/GananciasFilterForm';
import { UserRol } from '@/app/interfaces/user';
import { auth } from '@/auth.config';
import { orderService } from '@/services/orders.service';
import { redirect } from 'next/navigation';


export const readGanancias = async (gananciasDTO : GananciasDTO) => {
    const session = await auth();
    const userId = session?.user?.id;

    // Verificar session usuario
    if (!userId) {
        redirect(`/auth/login`)
    };

    if (session.user.rol !== UserRol.ADMIN) {
        return {
            ok: false,
            message: 'No estás autorizado'
        }
    }
    const token = session!.user.token;

    try {

        const { ok, message, ganancias } = await orderService.readGanancias(gananciasDTO, token);
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            ganancias,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
