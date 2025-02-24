


export const SkeletonServiceBanner = () => {
    return (
        <article className="flex pb-2 h-[450px] animate-pulse">
            <div className="w-1/2 flex flex-col justify-center gap-4 py-5 px-20 bg-gray-100">
                <div className="h-12 w-3/4 bg-gray-300 rounded"></div>

                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>

                <div className="h-10 w-40 bg-gray-300 rounded-lg mt-4"></div>
            </div>

            <div className="w-1/2 bg-gray-300"></div>
        </article>
    );
};
