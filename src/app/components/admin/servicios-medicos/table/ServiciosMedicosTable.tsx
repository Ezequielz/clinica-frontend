
import { readServicesMedical } from "@/actions/services-medical/readServicesMedical.action";
import { ServiciosMedicosInfo } from "./ServiciosMedicosInfo";


export const ServiciosMedicosTable = async () => {

    const { ok, servicesMedical } = await readServicesMedical();

    if (!ok || !servicesMedical) {
        return <p>Error al obtener los servicios médicos </p>;
    }
    if (servicesMedical.length === 0) {
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
                        Código</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Descripción</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Precio</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Editar</th>
                </tr>
            </thead>

            <tbody className="bg-white  overflow-y-auto">
                {
                    servicesMedical.map(servicio => (
                        <ServiciosMedicosInfo
                            key={servicio.codigo_servicio}
                            servicio={servicio}
                        />
                    ))
                }

            </tbody>


        </table>
    )
}