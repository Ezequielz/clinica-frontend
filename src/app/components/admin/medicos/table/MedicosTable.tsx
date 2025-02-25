
import { readMedicos } from "@/actions/medicos/readMedicos.action";
import { MedicoInfo } from "./MedicoInfo";


export const MedicosTable = async () => {

    const { ok, medicos } = await readMedicos();

    if (!ok || !medicos) {
        return <p>Error al obtener los servicios médicos </p>;
    }
    if (medicos.length === 0) {
        return <p>No hay servicios médicos registrados </p>;
    }

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Imagen</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Servicio</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Sueldo</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Turnos</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Editar</th>
                </tr>
            </thead>

            <tbody className="bg-white  overflow-y-auto">
                {
                    medicos.map(medico => (
                        <MedicoInfo
                            key={medico.id_medico}
                            medicoId={medico.id_medico}
                        />
                    ))
                }

            </tbody>


        </table>
    )
}