'use server';

import { UserUpdate } from '@/app/components/screens/profile/UserUpdateForm';
import { auth } from '@/auth.config';
import { usersService } from '@/services/users.service';
import { revalidatePath } from 'next/cache';
import { uploadImageToCloudinary } from '../cloudinary/uploadImage.action';



export const updateUser = async (userUpdate: UserUpdate) => {
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
    const { paciente, imagen, ...restUserProps } = userUpdate;


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
    
    const userToUpdate = {
        ...restUserProps,
        imagen: imageUrl,
        obra_social: paciente?.obra_social ?? undefined
    }
 
    try {

        const {ok, message, user} = await usersService.update(
            userToUpdate,
            token,
        );

        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/')
        revalidatePath('/profile')

        return {
            ok: true,
            user,
        };

    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
        return {
            ok: false,
            message: 'No se pudo conectar con el servidor, intenta nuevamente más tarde',
        };
    }
};
