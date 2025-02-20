import Link from 'next/link';
import { TopInfo } from './TopInfo';
import { readAllConsultas } from '@/actions/consultas/readAllConsultas.action';
import { FaFileMedical } from 'react-icons/fa6';


export const PanelConsultas = async () => {

    const { ok, consultas } = await readAllConsultas();

    if (!ok || !consultas) return null;

    return (
        <Link
            href={'/admin/consultas'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:shadow-purple-500"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <FaFileMedical size={30} />
            </div>
            <TopInfo label='consultas' totalCount={consultas.length} />

            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">


            </div>
        </Link>
    )
}