import { readPaquetes } from "@/actions/paquetes/readPaquetes.action";
import { PaqueteInfo } from "./PaqueteInfo";



export const PaquetesTable = async () => {
    const { ok, paquetes } = await readPaquetes();
    if (!ok || !paquetes) {
        return <p>Error al obtener los servicios médicos </p>;
    }
    if (paquetes.length === 0) {
        return <p>No hay paquetes registrados. </p>;
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
                    paquetes.map(paquete => (
                        <PaqueteInfo
                            key={paquete.codigo_paquete}
                            paquete={paquete}
                        />
                    ))
                }

            </tbody>

        </table>
    )
}