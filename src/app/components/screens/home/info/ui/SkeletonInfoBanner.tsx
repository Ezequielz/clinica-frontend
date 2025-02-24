


export const SkeletonInfoBanner = () => {
    return (
        <section className="w-full px-32 mt-10 min-h-[500px]
            bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738798365/clinica/fondo1.webp)]
            bg-top bg-no-repeat">

            <header className="">
                <h3 className="text-balance text-2xl py-2 text-center ">
                    Cada día más personas confían en nosotros, y gracias a ello seguimos creciendo para brindarte más y mejores servicios médicos con el respaldo de nuestros especialistas.
                </h3>
            </header>
            <div className="flex gap-2  justify-center mt-2">
                <SkeletonInfoBannerCard />
                <SkeletonInfoBannerCard />
                <SkeletonInfoBannerCard />

            </div>

        </section>
    );
};


const SkeletonInfoBannerCard = () => {
    return (
        <article className='px-5 w-fit animate-pulse'>
            <div className='flex flex-col gap-1 items-center'>
                <div className='flex gap-2 items-center'>
                    <div className="w-14 h-20 bg-gray-300 rounded"></div>
                    <div className="w-20 h-14 bg-gray-300 rounded"></div>
                </div>
                <div className="w-24 h-6 bg-gray-300 rounded mt-2"></div>
            </div>
        </article>
    );
};
