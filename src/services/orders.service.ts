
import envs from '../config/envs';
import type { OrderByIDResponse } from '@/app/interfaces/orderById';

const API_URL = envs.API_URL;
interface UpdateOrder {
    orderId: string;
    transactionId?: string;
    pagado?: boolean;
};

const readById = async(orderId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data:OrderByIDResponse = await response.json();

        if (data.error) {
            return {
                ok:false,
                message: data.error,
            };
        };

        return {
            ok: true,
            order: data.order,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            order: null,
            message: 'Error en la conexión con el servidor',
        };
    }

};
const update = async ({ orderId, pagado, transactionId }: UpdateOrder , token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ pagado, transactionId }),
        });
        const data = await response.json();

        if (data.error) {
            return {
                ok:false,
                message: data.error,
            };
        };

        return {
            ok: true,
            order: data.order,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            order: null,
            message: 'Error en la conexión con el servidor',
        };
    }
};


export const orderService = {

    //Methods
    update,
    readById,
};