import Link from 'next/link';
import { TopInfo } from './TopInfo';
import { IoCardOutline } from 'react-icons/io5';
import { readAllOrders } from '@/actions/orders/readAllOrders.action';


export const PanelOrders = async () => {

    const { ok, orders } = await readAllOrders();

    if (!ok || !orders) return null;

    return (
        <Link
            href={'/admin/orders'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:shadow-purple-500"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <IoCardOutline size={30} />
            </div>
            <TopInfo label='órdenes' totalCount={orders.length} />

            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">


            </div>
        </Link>
    )
}