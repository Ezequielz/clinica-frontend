



export const SkeletonServicesMedicalList = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-20">
            {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonServiceMedicalCard key={i}/>
            ))}
        </section>
    );
};
export const SkeletonServiceMedicalCard = () => {
    return (
        <div className="h-full animate-pulse">
            <div className="h-full bg-white p-4 shadow-lg rounded-lg flex flex-col">
                <div className="h-48 w-full bg-gray-300 rounded-t-lg"></div>

                <div className="flex-grow flex flex-col justify-between p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};
