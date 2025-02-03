
import envs from '../config/envs';

const API_URL = envs.API_URL;


const CheckPayment = async (paypalTransactionId: string , token: string) => {

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
                ok:false,
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


export const paypalService = {

    //Methods
    CheckPayment,

};