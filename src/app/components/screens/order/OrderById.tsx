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
            <div>

                <OrderDetails order={order} />

                {
                    !order.pagado && (
                        <div className='bg-amber-400 p-4 rounded-lg relative my-10'>
                            <strong className='absolute top-0 right-0 h-5 w-5 bg-red-500  animate-ping rounded-full' />

                            <h3 className='mt-1 font-bold'>
                                Demo:

                            </h3>

                            <div className='bg-white p-2 w-full border-2 border-red-500 rounded-lg flex flex-col'>
                                <p className='text-2xl text-red-500 font-bold'>
                                    Desloguear cuenta principal de paypal
                                </p>

                                <span className='text-sm'>Si completas una compra con tu cuenta, se te aplicaran los cargos a la misma</span>
                                <span>Utilizá las cuentas siguientes para hacer pruebas</span>
                            </div>


                            <p className='flex flex-col'>
                                <strong>
                                    Cuenta Paypal con fondos
                                </strong>
                                <span>
                                    email: cuentatest1@gmail.com
                                </span>
                                <span>
                                    password: 12345678
                                </span>

                            </p>
                            <p className='flex flex-col'>
                                <strong>
                                    Cuenta Paypal sin fondos
                                </strong>
                                <span>
                                    email: cuentaest2@gmail.com
                                </span>
                                <span>
                                    password: 12345678
                                </span>

                            </p>


                        </div>
                    )
                }


            </div>

            {/* Summary - Resumen de orden */}
            <section className="bg-white rounded-xl shadow-xl md:p-7 h-fit">


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
