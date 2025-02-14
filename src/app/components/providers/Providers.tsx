'use client';

import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ViewTransitions } from 'next-view-transitions';

import envs from '../../../config/envs';

interface Props {
    children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {

    return (

        <PayPalScriptProvider
            options={{
                clientId: envs.PAYPAL_CLIENT_ID ?? '',
                intent: 'capture',
                currency: 'USD',
            }}
        >

            <SessionProvider >
                <ViewTransitions>


                    {children}
                </ViewTransitions>


            </SessionProvider>
        </PayPalScriptProvider>
    );
}