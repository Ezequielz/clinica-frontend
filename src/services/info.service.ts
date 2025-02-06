
import {type InfoResponse } from '@/app/interfaces/info';
import envs from '../config/envs';

const API_URL = envs.API_URL;

const readInfo = async () => {

    try {
        const response = await fetch(`${API_URL}/api/info`);
        const data : InfoResponse = await response.json();

        if (!data.ok) {
            return {
                ok:false,
                message: 'Error al obtener info',
            };
        };

        return {
            ok: true,
            info: data.info
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};


export const infoService = {

    //Methods
    readInfo,

};