import { ServicioMedico } from "@/app/interfaces/services-medical"
import Image from "next/image";
import Link from "next/link";

interface Props {
    servicio: ServicioMedico;
}
export const ServiceBannerCard = ({ servicio }: Props) => {
    const { imagen, nombre, descripcion, codigo_servicio } = servicio;
    return (
        <article className="flex pb-2 h-[450px]">

            <div className="w-1/2 flex flex-col justify-center  gap-4 py-5 px-20
             bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738868872/clinica/dots_p3tvrs.webp)] bg-contain bg-no-repeat bg-bottom
            ">
         
                <div className="text-6xl font-bold text-cyan-500 text-balance ">
                    {nombre}
                </div>

                <div className="font-medium text-balance text-cyan-900 px-0.5">
                    {descripcion}
                </div>

                <Link
                    href={`/service/${codigo_servicio}`}

                    className="bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit"
                >

                    Quiero un turno!
                </Link>

            </div>


            <Image
                src={imagen ?? ''}
                alt={`imagen del servicio ${nombre}`}
                width={500}
                height={500}
                className="w-1/2 object-cover"
            />


        </article>
    )
}
