import Link from 'next/link';
import clsx from 'clsx';
import { formatDate } from '@/helpers/FormatDate';
import { DeleteOrderButton } from '../DeleteOrderButton';
import type { Consulta } from '@/app/interfaces/consultasByPaciente'

interface Props {
    consulta: Consulta;
}


export const InfoConsulta = ({consulta}: Props) => {
    return (
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

                        <DeleteOrderButton orderId={consulta.orderId} />
                    )
                }
            </td>

        </tr>

    )
}
