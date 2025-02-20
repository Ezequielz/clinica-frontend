'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { uploadImageToCloudinary } from '../cloudinary/uploadImage.action';
import { UpdatePaqueteDTO } from '@/app/components/admin/paquetes/ui/EditPaqueteForm';
import { paquetesService } from '@/services/paquetes.service';



export const updatePaquete = async (updatePaqueteDTO: UpdatePaqueteDTO) => {
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
    const { imagen, ...rest } = updatePaqueteDTO;


    let imageUrl = imagen; 

    if (imagen && typeof imagen !== 'string') {
        const imageFile = imagen as File; 
        if (imageFile instanceof File) {
            try {
                imageUrl = await uploadImageToCloudinary(imageFile);
                console.log({imageUrl})
            } catch (error) {
                console.error('Error al subir imagen a Cloudinary:', error);
                return {
                    ok: false,
                    message: 'Error al subir la imagen',
                };
            }
        }
    }
    
    const paqueteToUpdate = {
        ...rest,
        imagen: imageUrl,
    }
 
    try {

        const {ok, message, paquete} = await paquetesService.updatePaquete(
            paqueteToUpdate,
            token,
        );
      
        if (!ok || !paquete) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/paquetes')
        revalidatePath('/admin')
        revalidatePath('/admin/paquetes')
        revalidatePath(`/admin/paquetes/edit/${paquete.codigo_paquete}`)

        return {
            ok: true,
            paquete,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
