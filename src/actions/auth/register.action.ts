'use server';

import { revalidatePath } from 'next/cache';
import { authService } from '@/services/auth/auth.service';

export interface RegisterUserProps {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
};

export const registerUser = async ({ nombre, apellido, email, password }: RegisterUserProps) => {

    try {
        const { ok, user, message } = await authService.register({ nombre, apellido, email, password, });
        
        if (!ok) {
            return {
                ok: false,
                message,
            };
        };
        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/admin/users');

        return {
            ok: true,
            user,
            message: 'Usuario creado correctamente',
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo crear el usuario',
        };
    }
};