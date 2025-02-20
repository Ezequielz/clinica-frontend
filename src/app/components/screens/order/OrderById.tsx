import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { readOrderById } from '@/actions/orders/readOrderById.action';
import { PaypalBtn } from '../../payments/paypal/PaypalBtn';
import { InvoiceDownloadButton } from './InvoiceDownloadButton';
import { OrderDetails } from './OrderDetail';
import { OrderSummary } from './OrderSummary';


interface Props {
    id: string;
};

export const OrderById = async ({ id }: Props) => {

    const session = await auth();

    if (!session) {
        redirect('/auth/login');
    };


    const { ok, message, order } = await readOrderById(id);

    if (!ok) {
        return (
            <div>
                {message};
            </div>
        )
    };

    if (!order) {
        redirect('/');
    };


    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Servicios */}
            <OrderDetails order={order} />

            {/* Summary - Resumen de orden */}
            <section className="bg-white rounded-xl shadow-xl p-7">
             

                <OrderSummary order={order} />


                {/* Paypal */}
                <footer className="mt-5 mb-2 w-full">

                    {
                        order?.pagado ? (
                            <InvoiceDownloadButton orderId={order.id} />
                        ) : (
                            <PaypalBtn
                                amount={order!.monto_total}
                                orderId={order!.id}
                            />
                        )
                    }


                </footer>


            </section>



        </section>
    )
}
