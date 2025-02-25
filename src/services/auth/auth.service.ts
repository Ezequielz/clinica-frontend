import envs from '../../config/envs';
import { type RegisterUserProps } from '@/actions/auth/register.action';
import { type LoginResponse } from '@/app/interfaces/login';
import { RenewTokenResponse } from '@/app/interfaces/renew';

const API_URL = envs.API_URL;

const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data: LoginResponse = await response.json();


        if (!data.ok) {
            const msj = data.msg;
            return {
                ok: false,
                user: null,
                message: msj,
            };
        };

        return {
            ok: true,
            user: data.user,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            user: null,
            message: 'Error en la conexión con el servidor',
        };
    }
};
const register = async ({ nombre, apellido, email, password }: RegisterUserProps) => {

    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido, email, password }),
        });
        const data = await response.json();


        if (!data.ok) {
            const msj = data.msg || data.error;
            return {
                ok: false,
                user: null,
                message: msj,
            };
        };

        return {
            ok: true,
            user: data.user,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            user: null,
            message: 'Error en la conexión con el servidor',
        };
    }
};

const renewToken = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/renew`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },

        });
        const data: RenewTokenResponse = await response.json();


        if (!data.ok) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            newToken: data.token,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
}



export const authService = {

    //Methods
    login,
    register,
    renewToken,

}