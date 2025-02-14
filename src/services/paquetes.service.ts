
import envs from '../config/envs';
import type{ PaqueteByIdResponse } from '@/app/interfaces/paquete';
import type{ PaquetesResponse } from '@/app/interfaces/paquetes';

const API_URL = envs.API_URL;

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


export const paquetesService = {

    //Methods
    readPaquetes,
    readPaqueteByCode,

};