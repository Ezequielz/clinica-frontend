
import { UpdateServicioMedicoDTO } from '@/app/components/admin/servicios-medicos/ui/EditServicioMedicoForm';
import envs from '../config/envs';
import type { ServicesMedicalResponse } from '@/app/interfaces/services-medical';
import type { UpdateServiceMedicalResponse } from '@/app/interfaces/updateServiceMedical';
import type{ CreateServicioMedicoDTO } from '@/app/components/admin/servicios-medicos/ui/CreateServicioMedicoForm';
import type { CreateServicioMedicoResponse } from '@/app/interfaces/createServicioMedico';
import { DeleteServicioMedicoResponse } from '@/app/interfaces/deleteServicioMedico';

const API_URL = envs.API_URL;

const createService = async (createServicioMedicoDTO: CreateServicioMedicoDTO, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/medical-services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(createServicioMedicoDTO),
        });
        const data: CreateServicioMedicoResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medicalSpecialityCreated: data.medicalSpecialityCreated
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    };
};
const readServicesMedical = async () => {

    try {
        const response = await fetch(`${API_URL}/api/medical-services`);
        const data: ServicesMedicalResponse = await response.json();

        if (!data.ok) {
            return {
                ok: false,
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
        const data: ServicesMedicalResponse = await response.json();

        if (!data.ok) {
            return {
                ok: false,
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

const updateService = async (updateServicioMedicoDTO: UpdateServicioMedicoDTO, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/medical-services/${updateServicioMedicoDTO.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updateServicioMedicoDTO),
        });
        const data: UpdateServiceMedicalResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medicalSpecialityUpdated: data.medicalSpecialityUpdated
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}
const deleteService = async (servicioMedicoId: string, token: string) => {
   
    try {
        const response = await fetch(`${API_URL}/api/medical-services/${servicioMedicoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeleteServicioMedicoResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            medicalSpecialitydeleted: data.medicalSpecialitydeleted
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }
}

export const servicesMedicalService = {

    //Methods
    createService,
    readServicesMedical,
    readServiceMedicalByCode,
    updateService,
    deleteService,

};