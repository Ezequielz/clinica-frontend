import { formatDate } from "@/helpers/FormatDate"
import { OrderStatus } from "./OrderStatus"
import { OrderById } from "@/app/interfaces/orderById"



interface Props {
    order: OrderById
}

export const OrderDetails = ({order}: Props) => {
    return (
        <section className="flex flex-col mt-5">

            <OrderStatus isPaid={order?.pagado ?? false} />
            <h2 className="font-bold text-2xl pb-2">Servicios incluidos</h2>

            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg text-sm md:text-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 md:px-4 py-1 md:py-2 border">Servicio</th>
                        <th className="px-2 md:px-4 py-1 md:py-2 border">Fecha</th>
                        <th className="px-2 md:px-4 py-1 md:py-2 border">Horario</th>
                        <th className="px-2 md:px-4 py-1 md:py-2 border">Médico</th>
                    </tr>
                </thead>
                <tbody>
                    {order!.consultas.map(consulta => (
                        <tr key={consulta.id} className="text-center border-t">
                            <td className="px-2 md:px-4 py-1 md:py-2 border">{consulta.servicio.nombre}</td>
                            <td className="px-2 md:px-4 py-1 md:py-2 border">{formatDate.reverse(formatDate.DateToString(new Date(consulta.fecha_consulta)))}</td>
                            <td className="px-2 md:px-4 py-1 md:py-2 border">{consulta.hora_consulta}hs</td>
                            <td className="px-2 md:px-4 py-1 md:py-2 border">{`${consulta.medico.user.nombre} ${consulta.medico.user.apellido}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
