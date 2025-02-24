


export const SkeletonServiciosMedicosTable = () => {
    return (
        <table className="min-w-full animate-pulse">
            <thead>
                <tr>
                    {['Imagen', 'Nombre', 'Código', 'Descripción', 'Precio', 'Editar'].map((header, index) => (
                        <th key={index} className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white">
                {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-32 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-10 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-48 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-10 h-4 bg-gray-300 rounded"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
