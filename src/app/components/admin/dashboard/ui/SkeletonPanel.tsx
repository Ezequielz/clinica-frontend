export const SkeletonPanel = () => {
    return (
        <article
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:shadow-purple-500"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            </div>
            <div className="p-4 flex flex-col items-end justify-end">
                <p className="h-4 w-32 bg-slate-300 animate-pulse" />
                <h3 className="h-12 w-12 bg-slate-300 animate-pulse mt-2" />
            </div>

            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">


            </div>
        </article>
    );
};
