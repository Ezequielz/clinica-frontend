import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { Title } from '@/app/components/ui/Title';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import type { ServicioMedico } from '@/app/interfaces/services-medical';

interface Props {
    servicio: ServicioMedico;
};
export const ServiceBannerCard = ({ servicio }: Props) => {
    const { imagen, nombre, descripcion, codigo_servicio } = servicio;
    const viewTransitionName = servicio!.nombre.trim().replaceAll(' ', '-');
    return (
        <article className="flex pb-2 h-[450px]">

            <div className="w-1/2 flex flex-col justify-center  gap-4 py-5 px-20
             bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738868872/clinica/dots_p3tvrs.webp)] bg-contain bg-no-repeat bg-bottom
            ">
                <Title title={servicio.nombre} className="text-6xl" />
                {/* <div className="text-6xl font-bold text-cyan-500 text-balance ">
                    {nombre}
                </div> */}

                <div className="font-medium text-balance text-cyan-900 px-0.5">
                    {descripcion}
                </div>

                <Link
                    href={`/servicios-medicos/${codigo_servicio}`}
                >
                    <ButtonDefault label="Quiero un turno!" />

                </Link>

            </div>

            <Image
                src={imagen ?? ''}
                alt={`imagen del servicio ${nombre}`}
                width={600}
                height={600}
                className="w-1/2 min-w-[300px] aspect-square object-cover"
                unoptimized
                style={{ viewTransitionName }}
            />


        </article>
    )
}
