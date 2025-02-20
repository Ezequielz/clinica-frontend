import { Order } from '@/app/interfaces/allOrder';
import { formatDate } from '@/helpers/FormatDate';
import Link from 'next/link';
import { IoCreateOutline } from 'react-icons/io5';

interface Props {
    order: Order
}

export const OrdersInfo = async ({order}: Props) => {


    return (
        <tr key={order.id} className='text-gray-500 '>
            <td className=" px-8 border-b text-sm  border-gray-200">
                {order.id}

            </td>

            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                {order.pagado}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {order.monto_total}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {order.pagadoAt ? formatDate.DateToString(new Date(order.pagadoAt)) : '-'}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {order.transactionId ?? '-'}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {formatDate.DateToString(new Date(order.createdAt))}
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                eliminar
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                <Link
                    href={`/admin/orders/edit/${order.id}`}
                    className='text-cyan-500 hover:text-cyan-400 '
                >
                    <IoCreateOutline className='hover:scale-110' size={25} />
                </Link>
            </td>

        </tr>
    )
}