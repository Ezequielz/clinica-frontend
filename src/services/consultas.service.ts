import { ConsultasResponse } from '@/app/interfaces/consultas';
import envs from '../config/envs';
import { formatDate } from '@/helpers/FormatDate';
import type { ConsultasPaqueteResponse } from '@/app/interfaces/consultas-pack';
import type { CreateConsultasPack } from '@/actions/consultas/createConsultasPack.action';
import type { ConsultasByPacienteResponse } from '@/app/interfaces/consultasByPaciente';
import { DeleteConsultaResponse } from '@/app/interfaces/delete-consulta';

const API_URL = envs.API_URL;

const createConsulta = async (
    { servicioId,
        fecha_consulta,
        hora_consulta,
        pacienteId,
        medicoId,
        token }: {
            servicioId: string;
            fecha_consulta: string;
            hora_consulta: string;
            pacienteId: string;
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
                pacienteId,
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
const createConsultasPack = async ({ pacienteId, paqueteDetails, paqueteCode }: CreateConsultasPack, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/consultas/${paqueteCode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                pacienteId,
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

const readConsultasByPaciente = async (pacienteId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/consultas/${pacienteId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: ConsultasByPacienteResponse = await response.json();

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
    readConsultasByPaciente,
    deleteConsultaById,
};