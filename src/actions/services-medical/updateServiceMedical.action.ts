'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';
import { uploadImageToCloudinary } from '../cloudinary/uploadImage.action';
import { UpdateServicioMedicoDTO } from '@/app/components/admin/servicios-medicos/ui/EditServicioMedicoForm';
import { servicesMedicalService } from '@/services/servicesMedical.service';



export const updateServiceMedical = async (updateServicioMedicoDTO: UpdateServicioMedicoDTO) => {
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
    const { imagen, ...rest } = updateServicioMedicoDTO;


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
    
    const serviceMedicalToUpdate = {
        ...rest,
        imagen: imageUrl,
    }
 
    try {

        const {ok, message, medicalSpecialityUpdated} = await servicesMedicalService.updateService(
            serviceMedicalToUpdate,
            token,
        );
      
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/admin')
        revalidatePath('/servicios-medicos')

        return {
            ok: true,
            medicalSpecialityUpdated,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
