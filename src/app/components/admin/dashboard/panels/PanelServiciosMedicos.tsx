import Link from 'next/link';
import { TopInfo } from './TopInfo';
import { readServicesMedical } from '@/actions/services-medical/readServicesMedical.action';
import { MdOutlineLocalHospital } from 'react-icons/md';


export const PanelServiciosMedicos = async () => {

    const { ok, servicesMedical } = await readServicesMedical();

    if (!ok || !servicesMedical) return null;

    return (
        <Link
            href={'/admin/servicios-medicos'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:shadow-purple-500"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <MdOutlineLocalHospital size={30} />
            </div>
            <TopInfo label='servicios médicos' totalCount={servicesMedical.length} />

            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">


            </div>
        </Link>
    )
}