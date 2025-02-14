import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { readOrderById } from '@/actions/orders/readOrderById.action';
import { OrderStatus } from './OrderStatus';
import { formatDate } from '@/helpers/FormatDate';
import { PaypalBtn } from '../../payments/paypal/PaypalBtn';
import { InvoiceDownloadButton } from './InvoiceDownloadButton';


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

    const IsRegistredObraSocial = !!session.user.paciente.obra_social;
    const isPaquete = !!order.consultas.at(0)?.paquete;
    const namePaquete = isPaquete ? order.consultas.at(0)?.paquete.nombre : null;
    const pricePaquete = isPaquete ? order.consultas.at(0)?.paquete.precio_paquete : null;

    const subtotalPriceForServices = order!.consultas.reduce((acc, current) => acc + current.servicio.precio, 0);
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Servicios */}
            <section className="flex flex-col mt-5">

                <OrderStatus isPaid={order?.pagado ?? false} />
                <h2 className="font-bold text-2xl pb-2">Servicios incluidos</h2>

                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Servicio</th>
                            <th className="px-4 py-2 border">Fecha</th>
                            <th className="px-4 py-2 border">Horario</th>
                            <th className="px-4 py-2 border">Médico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order!.consultas.map(consulta => (
                            <tr key={consulta.id} className="text-center border-t">
                                <td className="px-4 py-2 border">{consulta.servicio.nombre}</td>
                                <td className="px-4 py-2 border">{formatDate.reverse(formatDate.DateToString(new Date(consulta.fecha_consulta)))}</td>
                                <td className="px-4 py-2 border">{consulta.hora_consulta}hs</td>
                                <td className="px-4 py-2 border">{`${consulta.medico.user.nombre} ${consulta.medico.user.apellido}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>




            {/* Checkout - Resumen de orden */}
            <section className="bg-white rounded-xl shadow-xl p-7">
                <h2 className="font-bold text-2xl pb-2">Resumen de orden</h2>

                {/* Resumen */}

                {order!.consultas.map(consulta => (
                    <div
                        key={consulta.id}

                    >

                        <p className="flex justify-between p-2">
                            {consulta.servicio.nombre}:
                            <span>
                                ${consulta.servicio.precio}
                            </span>
                        </p>


                    </div>
                ))
                }



                <div className="w-full h-0.5 rounded bg-gray-200 " />

                {
                    isPaquete && (
                        <>
                            <div className="flex justify-between p-2 text-green-500">
                                <p className='flex flex-col'>
                                    Descuento %15 por paquete:
                                    <span>
                                        {namePaquete}
                                    </span>

                                </p>
                                <span>
                                    -${
                                        subtotalPriceForServices - pricePaquete!
                                    }
                                </span>
                            </div>
                            <p className="flex justify-between p-2 font-semibold">
                                Subtotal:
                                <span>
                                    ${pricePaquete}
                                </span>
                            </p>
                        </>


                    )
                }


                {
                    IsRegistredObraSocial && (
                        <p className="flex justify-between p-2 text-green-500">
                            Descuento %20 por obra social:
                            <span>
                                -${
                                    isPaquete ? pricePaquete! * 0.2 : subtotalPriceForServices * 0.2
                                }
                            </span>
                        </p>

                    )
                }
                <div className="w-full h-0.5 rounded bg-gray-200" />

                <p className="flex justify-between p-2 font-bold text-purple-500 text-3xl">
                    Total:
                    <span>
                        ${
                            order.monto_total
                        }
                    </span>
                </p>






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
