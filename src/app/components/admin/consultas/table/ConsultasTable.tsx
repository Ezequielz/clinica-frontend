
import { readAllConsultas } from '@/actions/consultas/readAllConsultas.action';
import { ConsultaInfo } from './ConsultaInfo';

export const ConsultasTable = async () => {

    const { ok, consultas } = await readAllConsultas();

    if (!ok || !consultas) {
        return <p>Error al obtener las consultas</p>;
    }
    if (consultas.length === 0) {
        return <p>No hay consultas registradas</p>;
    }

    return (
        <table className="min-w-full">
            <thead>
                <tr>

                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Usuario</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Servicio</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Medico</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Fecha</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Hora</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Estado</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Ver orden</th>

                </tr>
            </thead>


            <tbody className="bg-white  overflow-y-auto">
                {
                    consultas.map(consulta => (
                        <ConsultaInfo
                            key={consulta.id}
                            consultaId={consulta.id}
                        />
                    ))
                }

            </tbody>



        </table>
    )
}