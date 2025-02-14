'use client';

import Image from 'next/image';
import { Link } from 'next-view-transitions'
import { motion } from 'framer-motion';
import type { Paquete } from '@/app/interfaces/paquetes';

interface Props {
    paquete: Paquete;
    index: number;
};
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.05 } // Delay dinámico
    })
};
export const PaqueteCard = ({ paquete, index }: Props) => {

    const viewTransitionName = paquete.nombre.trim().replaceAll(' ', '-');
    return (
        <motion.article
            key={paquete.codigo_paquete}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
            className="h-full"
        >
            <Link
                href={`/paquetes/${paquete.codigo_paquete}`}
                className="block h-full">
                <div className="bg-white p-4 shadow-lg rounded-lg h-full flex flex-col">
                    {/* Imagen con altura fija y tamaño uniforme */}
                    <Image
                        src={paquete.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                        alt={`Imagen del paquete ${paquete.codigo_paquete}`}
                        height={200}
                        width={500}
                        unoptimized
                        className="h-48 w-full object-cover rounded-t-lg"
                        style={{ viewTransitionName }}
                    />

                    {/* Contenido con flex-grow para ocupar todo el espacio */}
                    <div className="flex-grow flex flex-col justify-between p-4
            
            ">
                        <h3 className="text-xl font-bold text-cyan-500">{paquete.nombre}</h3>
                        <ul>
                            {
                                paquete.servicios_incluidos.map((servicio, index) => (

                                    <li key={servicio.servicio.nombre + index}>
                                        {servicio.servicio.nombre}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
