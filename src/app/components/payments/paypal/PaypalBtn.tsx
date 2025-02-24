'use client';

import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { updateOrder } from '@/actions/orders/updateOrder.action';
import { checkPayment } from '@/actions/payments/paypal/checkPayment';

interface Props {
    orderId: string;
    amount: number;
};

export const PaypalBtn = ({ orderId, amount, }: Props) => {
    const roundedAmount = (Math.round(amount * 100)) / 100;
    const [error, setError] = useState(undefined)
    const createOrderInPaypal = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${roundedAmount}`,
                        currency_code: 'USD',
                    },
                },
            ],
        });


        // guardar el ID (transactionId)  de la orden de paypal en la base de datos
        const { ok, message } = await updateOrder({ orderId, transactionId });

        if (!ok) {
            setError(message);
            throw new Error('No se pudo actualizar la orden');
        };


        return transactionId;
    };


    const onApproveForPaypal = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {

        const details = await actions.order?.capture();
        if (!details) return;
        // details.id = transactionId
        const { ok, message } = await checkPayment(details.id!);

        if (!ok) {
            setError(message);
            throw new Error('No se pudo confirmar el pago');
        };

    };

    return (
        <div className="relative z-0 h-fit">

            {error && (
                <span className='text-red-500'> {error} </span>
            )}
            <PayPalButtons
                createOrder={createOrderInPaypal}
                onApprove={onApproveForPaypal}
            />



        </div>
    )
}
