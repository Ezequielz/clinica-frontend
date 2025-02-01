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
    },
    callbacks: {
    
        async jwt({ token, user, }) {

            if (user) {
                token.data = user;
            };

            return token;
        },
        async session({ session, token, }) {

            session.user = token.data as any;
            return session;
        },
    },
};


export const {
    signIn,
    signOut,
    auth,
    handlers
} = NextAuth(authConfig);