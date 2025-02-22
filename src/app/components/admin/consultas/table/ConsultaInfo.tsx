import { readConsultasById } from "@/actions/consultas/readConsultaById";
import { formatDate } from "@/helpers/FormatDate";
import Link from "next/link";

interface Props {
    consultaId: string;
}


export const ConsultaInfo = async ({ consultaId }: Props) => {
 
    const { ok,consultas } = await readConsultasById(consultaId);

    if(!ok || !consultas)return null;

    const { paciente,servicio, medico, order, fecha_consulta, hora_consulta } = consultas[0]

    const userName = `${paciente.user.nombre } ${ paciente.user.apellido }`
    const medicName = `${medico.user.nombre } ${ medico.user.apellido }`
    return (
        <tr className='text-gray-500 '>

            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                {userName}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                {servicio.nombre}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                {medicName}
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
               { formatDate.DateToString(new Date(fecha_consulta)) }
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
               { hora_consulta }hs
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
               { order.pagado ? 'Pagado' : 'Impago' }
            </td>
            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
               <Link 
                href={`/admin/orders/edit/${order.id}`} 
                className="hover:underline hover:text-purple-500"
               >
                    ver orden
               </Link>
            </td>

        </tr>
    )
}