


export const SkeletonOrdersTable = () => {
    return (
        <table className="min-w-full animate-pulse">
            <thead>
                <tr>
                    {['ID', 'Pagado', 'Monto total', 'Fecha de pago', 'Transaction Id', 'Creado', 'Edit'].map((header, index) => (
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
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-8 bg-gray-300 rounded w-12"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
