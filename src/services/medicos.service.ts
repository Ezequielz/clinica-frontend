import envs from '../config/envs';
import type{ CreateMedicoDTO } from '@/app/components/admin/medicos/ui/CreateMedicoForm';
import type{ MedicoByIdResponse } from '@/app/interfaces/medico';
import type{ CreateMedicoResponse } from '@/app/interfaces/create.medico';
import type{ AllMedicosResponse } from '@/app/interfaces/allMedicos';
import { UpdateMedicoDTO } from '@/app/components/admin/medicos/ui/EditMedicoForm';
import { UpdateMedicoResponse } from '@/app/interfaces/update-medico';
import { DeleteMedicoResponse } from '@/app/interfaces/delete-medico';


const API_URL = envs.API_URL;

const createMedico = async (createMedicoDTO: CreateMedicoDTO, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/medicos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(createMedicoDTO),
        });
        const data: CreateMedicoResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medico: data.medico
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    };
};

const readMedicos = async (token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/medicos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: AllMedicosResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medicos: data.medicos
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};
const readMedicoById = async (medicoId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/medicos/${medicoId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: MedicoByIdResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medico: data.medico
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};

const updateMedico = async (updateMedicoDTO: UpdateMedicoDTO, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/medicos/${updateMedicoDTO.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updateMedicoDTO),
        });
        const data: UpdateMedicoResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medico: data.medico
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}
const deleteMedico = async (medicoId: string, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/medicos/${medicoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeleteMedicoResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medico: data.medico
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}

export const medicosService = {
    createMedico,
    readMedicos,
    readMedicoById,
    updateMedico,
    deleteMedico,
}