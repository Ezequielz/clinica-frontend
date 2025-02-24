import { Consulta } from '@/app/interfaces/consultasByPaciente';
import { formatDate } from '@/helpers/FormatDate';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
    consulta: Consulta;
}
export const ConsultaCard = ({ consulta }: Props) => {
    return (
        <article className='border-2 border-slate-200 p-1 rounded-lg'>
            <header className='w-full flex justify-between items-center p-2'>
                <strong> {consulta.servicio.nombre} </strong>
                <span
                    className={
                        clsx(
                            'px-2 py-1 rounded-lg',
                            {
                                'bg-red-500': !consulta.order.pagado,
                                'bg-green-500': consulta.order.pagado,
                            }
                        )
                    }
                > {consulta.order.pagado ? 'Pagado' : 'Impago'} </span>
            </header>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-1 text-left">
                                Fecha
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-1 text-left">
                                Hora
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-1 text-left">
                                Médico
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-1 text-left">
                                Orden
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap">
                                {formatDate.reverse(formatDate.DateToString(new Date(consulta.fecha_consulta)))}
                            </td>
                            <td className="flex items-center text-sm  text-gray-900 font-light px-2 py-1 whitespace-nowrap">
                                {consulta.hora_consulta}hs
                            </td>
                            <td className="text-sm text-gray-900 font-light px-2 ">
                                {consulta.medico.user.nombre + ' ' + consulta.medico.user.apellido}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-2 ">
                                <Link
                                    href={`/order/${consulta.orderId}`}
                                    className="hover:underline hover:text-purple-500"
                                >
                                    ver orden
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </article>
    )
}
