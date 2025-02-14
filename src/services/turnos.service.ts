import envs from '../config/envs';
import { type TurnosReservadoResponse } from '@/app/interfaces/turnos';

const API_URL = envs.API_URL;


const readTurnosReservadosByMedic = async (
    {medicoId, fecha, hora, token} : {
        medicoId: string;
        token: string;
        fecha?: string,
        hora?:string
    }) => {

    try {
        const response = await fetch(`${API_URL}/api/turnos-reservados`, {
            method: "POST", // Cambiado de GET a POST para poder enviar el cuerpo
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                // medicoId: "5b0cfd44-610e-422a-ab2b-cc92b7ca26f3",
                // fecha: "2025-12-16",
                // hora: "15:00"
                medicoId,
                fecha,
                hora,
            })
        });
        
        const data: TurnosReservadoResponse = await response.json();

   
    
        if (!data.ok) {
            return {
                ok:false,
                message: data.error,
            };
        };

        return {
            ok: true,
            turnosReservados: data.turnosReservados
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};

export const turnosService = {
    readTurnosReservadosByMedic,
};
