
import { DeleteOrderResponse } from '@/app/interfaces/delete-order';
import envs from '../config/envs';
import type { AllOrderResponse } from '@/app/interfaces/allOrder';
import type { OrderByIDResponse } from '@/app/interfaces/orderById';
import { GananciasResponse } from '@/app/interfaces/ganancias';

const API_URL = envs.API_URL;
interface UpdateOrder {
    orderId: string;
    transactionId?: string;
    pagado?: boolean;
};
export interface GananciasDTO {
    fecha_inicio?: string;
    fecha_fin?: string
    typo?: 'servicio' | 'pack'
};
const readGanancias = async (gananciasDto: GananciasDTO, token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/orders/ganancias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(gananciasDto),
        });
        const data: GananciasResponse = await response.json();
        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            ganancias: data.ganancias
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

};
const readAllOrders = async (token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: AllOrderResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            orders: data.orders
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,

            message: 'Error en la conexión con el servidor',
        };
    }

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

const deleteOrderById = async (orderId: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data: DeleteOrderResponse = await response.json();

        if (data.error) {
            return {
                ok: false,
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
            message: 'Error en la conexión con el servidor',
        };
    }
}


export const orderService = {

    //Methods
    update,
    readById,
    deleteOrderById,
    readAllOrders,
    readGanancias,
};