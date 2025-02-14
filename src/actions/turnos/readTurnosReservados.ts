"use server";

import { auth } from "@/auth.config";
import { turnosService } from "@/services/turnos.service";
import { logout } from "../auth/logout.action";



export async function readTurnosReservados({
    // medicoId = "5b0cfd44-610e-422a-ab2b-cc92b7ca26f3",
    // fecha = "2025-12-16",
    // hora = "15:00",
    medicoId,
    fecha,
    hora,
}: {
    medicoId: string,
    fecha?: string,
    hora?: string,
}) {
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

        const body = {
            medicoId,
            fecha,
            hora,
            token,
        }
        // console.log({body})
   
        if (!medicoId) {
            return {
                ok: false,
                message: 'falta medicoId'
            }
        }

        const { ok, message, turnosReservados } = await turnosService.readTurnosReservadosByMedic(body);

        if ( !ok && message === 'Invalid token'){
            await logout();
            window.location.replace('/auth/login');
        }
        
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            turnosReservados
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
}
