




export const SkeletonOrderById = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
            <SkeletonOrderDetails />

            <section className="bg-white rounded-xl shadow-xl p-7">
                <SkeletonOrderSummary />

                <footer className="mt-5 mb-2 w-full">
                    <div className="h-10 bg-gray-300 rounded w-full" />
                </footer>
            </section>
        </section>
    );
};

const SkeletonOrderDetails = () => {
    return (
        <section className="flex flex-col mt-5 ">
            <div className="h-10 bg-gray-300 rounded w-full mb-3 animate-pulse" />
            <h2 className="font-bold text-2xl pb-2">Servicios incluidos</h2>


            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Servicio</th>
                        <th className="px-4 py-2 border">Fecha</th>
                        <th className="px-4 py-2 border">Horario</th>
                        <th className="px-4 py-2 border">Médico</th>
                    </tr>
                </thead>
                <tbody>

                    <tr  className="text-center border-t">
                        <td className="px-6 py-2 ">
                            <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-2 ">
                            <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-2 ">
                            <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-2 ">
                            <div className="h-4 bg-gray-300 rounded w-18 animate-pulse"></div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </section>
    );
};

const SkeletonOrderSummary = () => {
    return (
        <section className="flex flex-col">
           <h2 className="font-bold text-2xl pb-2">Resumen de orden</h2>

            {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded mb-2  animate-pulse" />
            ))}

            <div className="w-full h-0.5 bg-gray-300 rounded my-2  animate-pulse" />
            <div className="h-8 bg-gray-300 rounded w-40 mb-2  animate-pulse" />
        </section>
    );
};