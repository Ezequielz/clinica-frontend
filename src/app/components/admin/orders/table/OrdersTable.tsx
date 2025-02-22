import { readAllOrders } from '@/actions/orders/readAllOrders.action';
import { OrdersInfo } from './OrdersInfo';

export const OrdersTable = async () => {

    const { ok, orders } = await readAllOrders();

    if (!ok || !orders) {
        return <p>Error al obtener las órdenes</p>;
    };
    if (orders.length === 0) {
        return <p>No hay órdenes registradas.</p>;
    };

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th
                        className="px-8 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        ID</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Pagado</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Monto total</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Fecha de pago</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Transaction Id</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Creado</th>
                 
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Edit</th>

                </tr>
            </thead>

            <tbody className="bg-white  overflow-y-auto">
                {
                    orders.map(order => (
                        <OrdersInfo
                            key={order.id}
                            order={order}
                        />
                    ))
                }

            </tbody>




        </table>
    )
}