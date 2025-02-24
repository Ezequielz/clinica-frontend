


export const SkeletonConsultas = () => {
    return (
        <table className="min-w-full p-2 animate-pulse">
            <thead className="bg-gray-200 border-b">
                <tr>
                    {['Servicio', 'Fecha', 'Hora', 'Médico', 'Estado', 'Acción'].map((header, index) => (
                        <th key={index} className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="bg-white border-b">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-40"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4 flex gap-8">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                            <div className="h-4 bg-gray-300 rounded w-10"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
