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
        <article className="flex flex-col-reverse md:flex-row h-screen md:h-[450px]">
            <div className="w-full md:w-1/2 flex flex-col md:justify-center gap-4 p-5 md:p-20 bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738868872/clinica/dots_p3tvrs.webp)] bg-contain bg-no-repeat bg-bottom flex-1">
                <Title title={servicio.nombre} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl" />
                <div className=" md:font-medium text-balance text-cyan-900 md:px-0.5">{descripcion}</div>
                <div className="flex justify-end md:justify-start">
                    <Link href={`/servicios-medicos/${codigo_servicio}`}>
                        <ButtonDefault label="Quiero un turno!" />
                    </Link>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                <Image
                    src={imagen ?? ''}
                    alt={`imagen del servicio ${nombre}`}
                    fill
                    className="object-cover"
                    unoptimized
                    style={{ viewTransitionName }}
                />
            </div>
        </article>
    )
}
