import { UserUpdate } from '@/app/components/screens/profile/UserUpdateForm';
import envs from '../config/envs';
import { UserBySessionResponse } from '@/app/interfaces/users';
import { AllUsersResponse } from '@/app/interfaces/allUser';

const API_URL = envs.API_URL;

const readAllUsers = async (token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: AllUsersResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            users: data.users
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};
const readUserBySession = async (userId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: UserBySessionResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            user: data.user
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};
const update = async (user: UserUpdate, token: string) => {
  
    try {
        const response = await fetch(`${API_URL}/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });
        const data: UserBySessionResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            user
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};


export const usersService = {

    //Methods

    readUserBySession,
    readAllUsers,
    update,

};