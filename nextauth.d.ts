import  { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
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
            image?: string
        } & DefaultSession['user']
    }
}