'use server';

import { auth } from '@/auth.config';
import { uploadImageToCloudinary } from '../cloudinary/uploadImage.action';
import { paquetesService } from '@/services/paquetes.service';
import type{ CreatePaqueteDTO } from '@/app/components/admin/paquetes/ui/CreatePaqueteForm';


export const createPaquete = async (createPaqueteDTO: CreatePaqueteDTO) => {


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
    const { imagen, ...rest } = createPaqueteDTO;


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

    const newPaquete = {
        ...rest,
        imagen: imageUrl,
    }

    try {

        const { ok, message } = await paquetesService.createPaquete(newPaquete, token);

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };


        return {
            ok: true,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};