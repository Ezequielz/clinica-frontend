import { ServicioMedico } from '@/app/interfaces/services-medical';
import Image from 'next/image';
import Link from 'next/link';
import { IoCreateOutline } from "react-icons/io5";

interface Props {
    servicio: ServicioMedico
}
export const ServiciosMedicosInfo = async ({servicio}: Props) => {

    return (
        <tr key={servicio.id} className='text-gray-500 '>
            <td className=" px-6 border-b  border-gray-200">
                <Image
                    src={servicio.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt='imagen de usuario'
                    width={50}
                    height={50}
                    className=''
                    unoptimized
                />

            </td>

            <td className="font-bold text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                {servicio.nombre}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {servicio.codigo_servicio}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {servicio.descripcion.slice(0, 40) + '...'}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {servicio.precio}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                <Link
                    href={`/admin/servicios-medicos/edit/${servicio.codigo_servicio}`}
                    className='text-cyan-500 hover:text-cyan-400 '
                >
                    <IoCreateOutline className='hover:scale-110' size={25} />
                </Link>
            </td>


        </tr>
    )
}