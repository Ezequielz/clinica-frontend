'use client';

import { motion } from 'framer-motion';
import { type ServicioMedico } from '@/app/interfaces/services-medical';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
    servicio: ServicioMedico,
    index: number;
}
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.05 } // Delay dinámico
    })
};

export const ServiceMedicalCard = ({ index, servicio }: Props) => {
    return (

        <motion.article
            key={servicio.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
            className="h-full"
        >
            <Link href={`/servicios-medicos/${servicio.codigo_servicio}`} className="block h-full">
                <div className="bg-white p-4 shadow-lg rounded-lg h-full flex flex-col">
                    {/* Imagen con altura fija y tamaño uniforme */}
                    <Image
                        src={servicio.imagen ?? ''}
                        alt={`Imagen del servicio ${servicio.nombre}`}
                        height={200}
                        width={500}
                        unoptimized
                        className="h-48 w-full object-cover rounded-t-lg"
                    />

                    {/* Contenido con flex-grow para ocupar todo el espacio */}
                    <div className="flex-grow flex flex-col justify-between p-4">
                        <h3 className="text-xl font-bold text-cyan-500">{servicio.nombre}</h3>
                        <p className="text-sm text-gray-600">{servicio.descripcion.slice(0, 60)+ '... ' } <span className='text-purple-600 hover:text-opacity-70'>Saber más</span> </p>
                    </div>
                </div>
            </Link>
        </motion.article>
    );

}
