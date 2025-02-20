import { OrderById } from "@/app/interfaces/orderById"
import { auth } from "@/auth.config";

interface Props {
    order: OrderById,
}

export const OrderSummary = async({ order }: Props) => {
    const session = await auth();
   
    const isPaquete = !!order.consultas.at(0)?.paquete;
    const namePaquete = isPaquete ? order.consultas.at(0)?.paquete.nombre : null;
    const pricePaquete = isPaquete ? order.consultas.at(0)?.paquete.precio_paquete : null;
    const IsRegistredObraSocial = !!session?.user.paciente.obra_social;
    const subtotalPriceForServices = order!.consultas.reduce((acc, current) => acc + current.servicio.precio, 0);
    return (
        <section className="flex flex-col">
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

        </section>
    )
}
