import Image from 'next/image';
import Link from 'next/link';
import { IoCreateOutline } from "react-icons/io5";
import { Paquete } from '@/app/interfaces/paquetes';


interface Props {
    paquete: Paquete
}


export const PaqueteInfo = async ({ paquete }: Props) => {



    return (
        <tr key={paquete.codigo_paquete} className='text-gray-500 '>
            <td className=" px-6 border-b  border-gray-200">
                <Image
                    src={paquete.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt='imagen de usuario'
                    width={50}
                    height={50}
                    className=''
                    unoptimized
                />

            </td>

            <td className="font-bold text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                {paquete.nombre}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {paquete.codigo_paquete}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {paquete.servicios_incluidos.map( ({servicio}) => servicio.nombre)}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {paquete.precio_paquete}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                <Link
                    href={`/admin/paquetes/edit/${paquete.codigo_paquete}`}
                    className='text-cyan-500 hover:text-cyan-400 '
                >
                    <IoCreateOutline className='hover:scale-110' size={25} />
                </Link>
            </td>


        </tr>
    )
}