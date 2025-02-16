/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { authService } from './services/auth/auth.service';
import { z } from 'zod';


export const authConfig: NextAuthConfig = {
    trustHost: true,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',

    },

    providers: [
        credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;
                const { ok, user } = await authService.login({ email, password })
                
                if (!ok) return null;

                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7200, // 2 horas (7200 segundos)
    },
    callbacks: {

        async jwt({ token, user, trigger, session }) {
         
            // Si el usuario acaba de iniciar sesión, asignar los valores
            if (user) {
                token.data = user || {}; // Asegurar que siempre sea un objeto
                token.accessToken = user.token as string;
                token.exp = Math.floor(Date.now() / 1000) + 7200; // Expira en 2 horas
            }
      
            // Si se ejecuta update(), actualizar los datos del usuario sin perder el accessToken
            if (trigger === "update") {               
                token.data = { ...(token.data || {}), ...(session.user || {}) };
                token.accessToken = token.accessToken || session.accessToken;
                token.exp = Math.floor(Date.now() / 1000) + 7200;
            }
        
            return token;
        },
        
        async session({ session, token }) {
     
            if (!token.exp || Date.now() / 1000 > token.exp) {
                // Limpiar sesión si el token ha expirado
                return { user: undefined, accessToken: undefined } as any;
            }
        
            session.user = token.data as any;
            session.accessToken = token.accessToken as string | undefined;
            return session;
        }
  
        

    },
};


export const {
    signIn,
    signOut,
    auth,
    handlers
} = NextAuth(authConfig);