'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Title } from '../../ui/Title';
import { Link } from 'next-view-transitions'
import type { PaqueteById } from '@/app/interfaces/paquete';

interface Props {
    paquete: PaqueteById;
}

export const PaqueteByCode = ({ paquete }: Props) => {


    const totalPriceServices = paquete.servicios_incluidos.reduce((acc, current) => acc + current.servicio.precio, 0)

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full py-5 px-6 md:px-20 flex flex-col md:flex-row gap-6 md:gap-10 items-center"
        >
            {/* Imagen del servicio */}
            <motion.div
                // initial={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
            >
                <Image
                    src={paquete!.imagen ?? "https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp"}
                    alt={paquete!.nombre ?? "imagen de paquete"}
                    fill
                    unoptimized
                    className="object-cover w-full h-full"
                    style={{ viewTransitionName: paquete.nombre.trim().replaceAll(' ', '-') }}
                />
            </motion.div>

            {/* Detalles del servicio */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full md:w-1/2 space-y-4"
            >
                <Title title={paquete!.nombre} />

                <p className="text-xl font-semibold text-purple-600">${paquete!.precio_paquete}</p>

                {/* Lista de médicos */}
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">Servicios incluidos</h3>
                        <span>Precio individual</span>

                    </div>
                    <ul className="mt-2  ">
                        {paquete.servicios_incluidos.map((servicio, index) => (
                            <li key={servicio.servicio.nombre + index} className='odd:bg-slate-300/30 p-2'>
                                <Link
                                    href={`/servicios-medicos/${servicio.servicio.codigo_servicio}`}
                                    className="flex justify-between"

                                >

                                    <span className='hover:underline'
                                        style={{ viewTransitionName: servicio.servicio.nombre.trim().replaceAll(' ', '-') }}
                                    >

                                        {
                                            servicio.servicio.nombre
                                        }
                                    </span>
                                    <span>
                                        ${
                                            servicio.servicio.precio
                                        }
                                    </span>

                                </Link>
                                {/* <ul>
                                    {servicio!.servicio.medicos!.map((medico, index) => (
                                        <li key={index} className="p-3 bg-gray-100 rounded-lg">
                                            <p className="font-semibold text-gray-700"> {medico.user.nombre} {medico.user.apellido} </p>

                                            <p className="text-sm text-gray-500">
                                                Turnos:{" "}
                                                {medico.turnos.map((t) => `${t.dia_semana} (${t.hora_inicio}hs - ${t.hora_fin}hs)`).join(", ")}
                                            </p>
                                        </li>
                                    ))}
                                </ul> */}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center flex-col mt-5  ">

                        <strong>Subtotal:
                            <span className="ml-2 text-red-400">

                                ${totalPriceServices}
                            </span>
                        </strong>
                        <strong>Descuento 15%:
                            <span className="ml-2 text-green-400">

                                - ${totalPriceServices - paquete.precio_paquete}
                            </span>
                        </strong>

                        <strong className=" text-2xl font-semibold">Total:
                            <span className="ml-2 text-purple-500">
                                ${paquete.precio_paquete}
                            </span>

                        </strong>
                    </div>
                    <Link
                        href={`/reserva/paquete/${paquete.codigo_paquete}`}

                        className="bg-purple-800 block mt-2 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit "
                    >

                        Reservar turno
                    </Link>
                </div>


            </motion.div>


        </motion.section>
    )
}
