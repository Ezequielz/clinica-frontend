import { UserUpdate } from '@/app/components/screens/profile/UserUpdateForm';
import envs from '../config/envs';
import { UserBySessionResponse } from '@/app/interfaces/users';
import { AllUsersResponse } from '@/app/interfaces/allUser';
import { DeleteUserResponse } from '@/app/interfaces/deleteUser';

const API_URL = envs.API_URL;

const readAllUsers = async (token: string, params?: string, ) => {

    const url = params ? `${API_URL}/api/users?${params}` : `${API_URL}/api/users`;

    try {
        const response = await fetch(url, {
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

const readUserById = async (userId: string, token: string) => {

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
const deleteUser = async (userId: string, token: string) => {
  
    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeleteUserResponse = await response.json();

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


export const usersService = {

    //Methods

    readUserById,
    readAllUsers,
    update,
    deleteUser,

};