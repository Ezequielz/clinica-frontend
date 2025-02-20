
import { UpdatePaqueteDTO } from '@/app/components/admin/paquetes/ui/EditPaqueteForm';
import envs from '../config/envs';
import type{ PaqueteByIdResponse } from '@/app/interfaces/paquete';
import type{ PaquetesResponse } from '@/app/interfaces/paquetes';
import { UpdatePaqueteResponse } from '@/app/interfaces/updatePaquete';
import { DeletePaqueteResponse } from '@/app/interfaces/deletePaquete';
import { CreatePaqueteDTO } from '@/app/components/admin/paquetes/ui/CreatePaqueteForm';
import { CreatePaqueteResponse } from '@/app/interfaces/createPaquete';

const API_URL = envs.API_URL;

const createPaquete = async (createPaqueteDTO: CreatePaqueteDTO, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/paquetes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(createPaqueteDTO),
        });
        const data: CreatePaqueteResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error ?? data.msg,
            };
        };

        return {
            ok: true,
            paquete: data.paquete
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    };
};

const readPaquetes = async () => {

    try {
        const response = await fetch(`${API_URL}/api/paquetes`);
        const data : PaquetesResponse = await response.json();

        if (!data.ok) {
            return {
                ok:false,
                message: 'Error al obtener info',
            };
        };

        return {
            ok: true,
            paquetes: data.paquetes
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};

const readPaqueteByCode = async (code: string) => {

    try {
        const response = await fetch(`${API_URL}/api/paquetes/${code}`);
        const data : PaqueteByIdResponse = await response.json();

        if (!data.ok) {
            return {
                ok:false,
                message: 'Error al obtener los paquetes',
            };
        };
       
        return {
            ok: true,
            paquete: data.paquete
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};


const updatePaquete = async (updatePaqueteDTO: UpdatePaqueteDTO, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/paquetes/${updatePaqueteDTO.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatePaqueteDTO),
        });
        const data: UpdatePaqueteResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error ?? data.msg,
            };
        };

        return {
            ok: true,
            paquete: data.paquete
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}

const deletePaquete = async (paqueteCode: string, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/paquetes/${paqueteCode}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeletePaqueteResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error ?? data.msg,
            };
        };

        return {
            ok: true,
            paquete: data.paquete
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}


export const paquetesService = {

    //Methods
    createPaquete,
    readPaquetes,
    readPaqueteByCode,
    updatePaquete,
    deletePaquete,

};