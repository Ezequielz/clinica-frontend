import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        nombre: string;
        apellido: string;
        telefono: string;
        direccion: string;
        dni: string;
        fecha_nac: string;
        token: string; 
        email: string;
        rol: string;
        image?: string;
    }

    interface Session extends DefaultSession {
        user: User; 
        accessToken?: string; 
    }
}
