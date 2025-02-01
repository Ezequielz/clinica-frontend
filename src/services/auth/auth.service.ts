import envs from '../../config/envs';

const URL = envs.API_URL;

const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await fetch(`${URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
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
        console.error("Error en la solicitud:", error);
        return {
            ok: false,
            user: null,
            message: "Error en la conexión con el servidor",
        };
    }
};



export const authService = {

    //MEthods
    login

}