
import { readMedicoById } from '@/actions/medicos/readMedicoById';
import Image from 'next/image';
import Link from 'next/link';
import { IoCreateOutline } from "react-icons/io5";

interface Props {
    medicoId: string
}
export const MedicoInfo = async ({ medicoId }: Props) => {

    const { ok, medico } = await readMedicoById(medicoId);

    if (!ok || !medico) return null;

    const nombre = medico.user.nombre + ' ' + medico.user.apellido
    return (
        <tr className='text-gray-500 '>

            <td className=" text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                <Image
                    src={medico.user.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt='imagen de usuario'
                    width={50}
                    height={50}
                    className='rounded-full'
                    unoptimized
                />
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                {nombre}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                {medico.especialidad.nombre}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                ${medico.sueldo}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 px-6 py-3 whitespace-nowrap">
                {medico.turnos.map(turno => (
                    <div key={turno.id_turno}>
                        {turno.dia_semana} {turno.hora_inicio}-{turno.hora_fin}
                    </div>
                ))}
            </td>




            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                <Link
                    href={`/admin/medicos/edit/${medico.id_medico}`}
                    className='text-cyan-500 hover:text-cyan-400 '
                >
                    <IoCreateOutline className='hover:scale-110' size={25} />
                </Link>
            </td>


        </tr>
    )
}