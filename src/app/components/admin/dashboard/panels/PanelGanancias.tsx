import Link from 'next/link';
import { TopInfo } from './TopInfo';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { readGanancias } from '@/actions/orders/readGanancias.action';


export const PanelGanancias = async () => {

    const { ok, ganancias } = await readGanancias({});

    if (!ok ) return null;

    return (
        <Link
            href={'/admin/ganancias'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:shadow-purple-500"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <FaArrowTrendUp size={30} />
            </div>
            <TopInfo label='ganancias del día' totalCount={ganancias?.today} />

          
        </Link>
    )
}