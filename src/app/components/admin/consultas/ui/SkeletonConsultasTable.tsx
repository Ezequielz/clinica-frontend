


export const SkeletonConsultasTable = () => {
    return (
        <table className="min-w-full animate-pulse">
            <thead>
                <tr>
                    {['Usuario', 'Servicio', 'Médico', 'Fecha', 'Hora', 'Estado', 'Ver orden'].map((header, index) => (
                        <th key={index} className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white">
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-5 bg-gray-300 rounded w-5"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
