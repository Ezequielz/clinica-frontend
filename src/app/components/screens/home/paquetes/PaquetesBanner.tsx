import Image from "next/image"
import Link from "next/link"

export const PaquetesBanner = () => {
    return (
        <section className="flex justify-center px-20 w-full  ">

            <div className="pl-20 pt-28 flex-col flex gap-5">
                <h3 className=" font-semibold flex-wrap gap-y-4 justify-center text-balance text-purple-500  text-2xl md:text-5xl flex      before:w-[40%] before:h-full before:rounded-full relative  before:absolute before:-left-20 before:-top-10 before:-translate-x-1 before:bg-[#a855f7]  before:blur-3xl before:opacity-70 before:-z-20">
                    Usá más servicios, pagá menos!

                </h3>

                <p className="text-xl text-balance ">
                    Hemos creado paquetes para ti!, eleige el que incluya los servicios que necesites y ahorra un 15%!
                </p>

                <Link
                    href={`/paquetes`}

                    className="bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit"
                >

                    Saber más!
                </Link>


            </div>


            <Image
                src={'https://res.cloudinary.com/zapataezequiel/image/upload/v1738870267/clinica/paquete.webp'}
                alt="imagen familia atendiendose"
                height={500}
                width={500}
                unoptimized
                className=""


            />


        </section>

    )
}
