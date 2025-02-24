








export const SkeletonPaquetesList = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:py-10 px-5 md:px-20">
            {[...Array(6)].map((_, index) => (
                <SkeletonPaqueteCard key={index} />
            ))}
        </section>
    );
};

const SkeletonPaqueteCard = () => {
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg h-full flex flex-col animate-pulse">
            <div className="h-48 w-full bg-gray-300 rounded-t-lg" />
            <div className="flex-grow flex flex-col justify-between p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                <ul>
                    {[...Array(3)].map((_, index) => (
                        <li key={index} className="h-4 bg-gray-300 rounded w-full mb-1" />
                    ))}
                </ul>
            </div>
        </div>
    );
};
