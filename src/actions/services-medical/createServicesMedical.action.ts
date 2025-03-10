'use server';

import { auth } from '@/auth.config';
import type { CreateServicioMedicoDTO } from '../../app/components/admin/servicios-medicos/ui/CreateServicioMedicoForm';
import { servicesMedicalService } from '@/services/servicesMedical.service';
import { uploadImageToCloudinary } from '../cloudinary/uploadImage.action';


export const createServicesMedical = async (createServicioMedicoDTO: CreateServicioMedicoDTO) => {


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
    const { imagen, ...rest } = createServicioMedicoDTO;


    let imageUrl = imagen;

    if (imagen && typeof imagen !== 'string') {
        const imageFile = imagen as File;
        if (imageFile instanceof File) {
            try {
                imageUrl = await uploadImageToCloudinary(imageFile);
                console.log({ imageUrl })
            } catch (error) {
                console.error('Error al subir imagen a Cloudinary:', error);
                return {
                    ok: false,
                    message: 'Error al subir la imagen',
                };
            }
        }
    }

    const newServiceMedical = {
        ...rest,
        imagen: imageUrl,
    }

    try {

        const { ok, message,medicalSpecialityCreated } = await servicesMedicalService.createService(newServiceMedical, token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
            medicalSpecialityCreated
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};