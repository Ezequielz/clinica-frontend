
import Image from "next/image"
import Link from "next/link"

export const ObraSocialBanner = () => {
    return (
        <section className="flex justify-center px-20 w-full  ">



            <picture className="">

                <Image
                    src={'https://res.cloudinary.com/zapataezequiel/image/upload/v1738871833/clinica/obra-social.webp'}
                    alt="imagen obra social"
                    height={500}
                    width={500}
                    unoptimized
                    className=""


                />
            </picture>

            <div className="pl-20 py-10 flex-col flex gap-5 text-left">
                <h3 className=" font-semibold flex-wrap gap-y-4  text-balance text-purple-500  text-2xl md:text-5xl flex  
                before:w-[40%] before:h-full before:rounded-full relative  before:absolute before:-left-20 before:-top-10 before:-translate-x-1 before:bg-[#a855f7]  before:blur-3xl before:opacity-70 before:-z-20
                ">
                    Beneficios de tu obra social!

                </h3>

                <p className="text-xl tex text-balance ">
                    Tienes un <span className="text-2xl font-bold text-purple-500">20% de descuento!</span> registrando tu obra social!
                </p>

                <Link
                    href={`/profile`}

                    className="bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit"
                >

                    Registrar!
                </Link>

            </div>


        </section>

    )
}

