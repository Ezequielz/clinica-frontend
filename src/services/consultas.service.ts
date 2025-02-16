import { ConsultasResponse } from '@/app/interfaces/consultas';
import envs from '../config/envs';
import { formatDate } from '@/helpers/FormatDate';
import type { ConsultasPaqueteResponse } from '@/app/interfaces/consultas-pack';
import type { CreateConsultasPack } from '@/actions/consultas/createConsultasPack.action';
import { DeleteConsultaResponse } from '@/app/interfaces/delete-consulta';
import { ConsultasByUserResponse } from '@/app/interfaces/consultasByPaciente';

const API_URL = envs.API_URL;

const createConsulta = async (
    { servicioId,
        fecha_consulta,
        hora_consulta,
        userId,
        medicoId,
        token }: {
            servicioId: string;
            fecha_consulta: string;
            hora_consulta: string;
            userId: string;
            medicoId: string;
            token: string;
        }) => {
    // const fechaFormateada = fecha_consulta.split("-").reverse().join("-");


    try {
        const response = await fetch(`${API_URL}/api/consultas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                servicioId,
                fecha_consulta: formatDate.reverse(fecha_consulta),
                hora_consulta,
                userId,
                medicoId,
            })
        });

        const data: ConsultasResponse = await response.json();


        if (!data.ok) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            consulta: data.consulta,
            turnoReservado: data.turnoReservado
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};
const createConsultasPack = async ({ paqueteDetails, paqueteCode }: CreateConsultasPack, userId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/consultas/${paqueteCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                paqueteDetails
            })
        });

        const data: ConsultasPaqueteResponse = await response.json();


        if (!data.ok) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            consultas: data.consultas,
            order: data.order
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};

const readConsultasByUser = async (consultaId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/consultas/${consultaId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log({ response })
        const data: ConsultasByUserResponse = await response.json();
        console.log({ data })
        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            consultas: data.consulta,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
}

const deleteConsultaById = async (consultaId: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/consultas/${consultaId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeleteConsultaResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            consulta: data.consulta,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
}

export const consultasService = {

    //Methods
    createConsulta,
    createConsultasPack,
    readConsultasByUser,
    deleteConsultaById,
};