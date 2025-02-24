export const SkeletonUserTable = () => {
    return (
        <table className="min-w-full animate-pulse">
            <thead>
                <tr>
                    {["Imagen", "Nombre", "Email", "DNI", "Tel", "Rol", "Eliminar"].map((header) => (
                        <th
                            key={header}
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="bg-white">
                {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        </td>
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
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-300 rounded w-10"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
