
import envs from '../config/envs';
import type { ServicesMedicalResponse } from '@/app/interfaces/services-medical';

const API_URL = envs.API_URL;

const readServicesMedical = async () => {

    try {
        const response = await fetch(`${API_URL}/api/medical-services`);
        const data : ServicesMedicalResponse = await response.json();

        if (!data.ok) {
            return {
                ok:false,
                message: 'Error al obtener los servicios médicos',
            };
        };

        return {
            ok: true,
            servicesMedical: data.servicios
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            servicesMedical: null,
            message: 'Error en la conexión con el servidor',
        };
    }
};


const readServiceMedicalByCode = async (code: string) => {

    try {
        const response = await fetch(`${API_URL}/api/medical-services/${code}`);
        const data : ServicesMedicalResponse = await response.json();

        if (!data.ok) {
            return {
                ok:false,
                message: 'Error al obtener los servicios médicos',
            };
        };

        return {
            ok: true,
            servicesMedical: data.servicios.at(0)
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};


export const servicesMedicalService = {

    //Methods
    readServicesMedical,
    readServiceMedicalByCode,

};