



export const SkeletonConsultasList = () => {
    return (
        <section className="grid sm:grid-cols-2 gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonConsultaCard key={index} />
            ))}
        </section>
    );
};


const SkeletonConsultaCard = () => {
    return (
        <article className='border-2 border-slate-200 p-1 rounded-lg animate-pulse'>
            {/* Header */}
            <header className='w-full flex justify-between items-center p-2'>
                <div className="bg-gray-300 h-4 w-32 rounded"></div>
                <div className="h-6 w-20 rounded-lg bg-gray-300"></div>
            </header>

            {/* Contenido */}
            <div>
                <table className="w-full">
                    <thead>
                        <tr>
                            {["Fecha", "Hora", "Médico", "Orden"].map((item, index) => (
                                <th key={index} className="text-sm font-medium text-gray-900 px-2 py-1 text-left">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-2 py-1"><div className="bg-gray-300 h-4 w-14 rounded"></div></td>
                            <td className="px-2 py-1"><div className="bg-gray-300 h-4 w-10 rounded"></div></td>
                            <td className="px-2 py-1"><div className="bg-gray-300 h-4 w-16 rounded"></div></td>
                            <td className="px-2 py-1"><div className="bg-gray-300 h-4 w-12 rounded"></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
};
