import Link from 'next/link';
import clsx from 'clsx';
import { readConsultasByUser } from '@/actions/consultas/readConsultasByUser.action'
import { formatDate } from '@/helpers/FormatDate';
import { DeleteOrderButton } from './DeleteOrderButton';

export const Consultas = async () => {

    const { ok, consultas, message } = await readConsultasByUser();
    console.log(message)
    if (!ok || !consultas) {
        return (
            <div>
                No tienes consultas registradas
            </div>
        )
    }

    return (
        <table className="min-w-full p-2">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Servicio
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Fecha
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Hora
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Médico
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Estado
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Acción
                    </th>
                </tr>
            </thead>
            <tbody>


                {
                    consultas.map(consulta => (
                        <tr
                            key={consulta.id}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {consulta.servicio.nombre}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {formatDate.reverse(formatDate.DateToString(new Date(consulta.fecha_consulta)))}
                            </td>
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {consulta.hora_consulta}hs
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                {consulta.medico.user.nombre + ' ' + consulta.medico.user.apellido}
                            </td>
                            <td className={
                                clsx(
                                    "text-sm font-light px-6 ",
                                    {
                                        "text-red-500": !consulta.order.pagado,
                                        "text-green-500": consulta.order.pagado,
                                    }
                                )
                            }>

                                {consulta.order.pagado ? 'Pagado' : 'Pendiente de pago'}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 flex items-center gap-8">
                                <Link
                                    href={`/order/${consulta.orderId}`}
                                    className="hover:underline hover:text-purple-500"
                                >
                                    ver orden
                                </Link>
                                {
                                    !consulta.order.pagado && (
                                      
                                        <DeleteOrderButton  orderId={consulta.orderId} />
                                    )
                                }
                            </td>

                        </tr>

                    ))
                }

            </tbody>
        </table>
    )
}
