
import envs from '../config/envs';

const API_URL = envs.API_URL;


const CheckPayment = async (paypalTransactionId: string, token: string) => {

    try {
        const response = await fetch(`${API_URL}/api/payments/paypal/check-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ paypalTransactionId }),
        });
        const data = await response.json();

        if (data.error) {
            return {
                ok: false,
                message: data.error,
            };
        };

        return {
            ok: true,
            message: data,
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            ok: false,
            message: 'Error en la conexión con el servidor',
        };
    }
};

const downloadInvoice = async (orderId: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/api/payments/paypal/invoice/${orderId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Error en la respuesta del servidor", response.statusText);
            return {
                ok: false,
                message: "No se pudo descargar la factura",
            };
        }

        return {
            ok: true,
            message: "Factura descargada correctamente",
            pdf: await response.blob()
        };
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return {
            ok: false,
            message: "Error en la conexión con el servidor",
        };
    }
};



export const paypalService = {

    //Methods
    CheckPayment,
    downloadInvoice,

};