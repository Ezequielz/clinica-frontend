export const SkeletonServiceBanner = () => {
    return (
        <article className="flex flex-col-reverse md:flex-row h-screen md:h-[450px] animate-pulse">
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 py-5 px-5 md:px-20 bg-gray-100">
                <div className="h-12 w-3/4 bg-gray-300 rounded"></div>

                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>

                <div className="h-10 w-40 bg-gray-300 rounded-lg mt-4 self-end md:self-start"></div>
            </div>

            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-300"></div>
        </article>
    );
};
