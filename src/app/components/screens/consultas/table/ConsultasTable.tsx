import { Consulta } from '@/app/interfaces/consultasByPaciente'
import { InfoConsulta } from './InfoConsulta'

interface Props {
    consultas: Consulta[]
}

export const ConsultasTable = ({ consultas }: Props) => {
    return (
        <table className="min-w-full p-2">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Servicio
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Fecha
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Hora
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Médico
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Estado
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Acción
                    </th>
                </tr>
            </thead>
            <tbody>


                {
                    consultas.map(consulta => (
                        <InfoConsulta
                            key={consulta.id}
                            consulta={consulta}
                        />
                    ))
                }

            </tbody>
        </table>
    )
}
