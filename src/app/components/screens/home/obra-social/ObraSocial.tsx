'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export const ObraSocialBanner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="flex justify-center px-20 w-full">
            {/* Animación de la imagen */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <Image
                    src="https://res.cloudinary.com/zapataezequiel/image/upload/v1738871833/clinica/obra-social.webp"
                    alt="Imagen obra social"
                    height={500}
                    width={500}
                    unoptimized
                />
            </motion.div>

            <div className="pl-20 py-10 flex-col flex gap-5 text-left">
                {/* Animación del título */}
                <motion.h3
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-semibold flex-wrap gap-y-4 text-balance text-purple-600 text-2xl md:text-5xl flex relative before:w-[40%] before:h-full before:rounded-full before:absolute before:-left-20 before:-top-10 before:-translate-x-1 before:bg-[#a855f7] before:blur-3xl before:opacity-70 before:-z-20"
                >
                    Beneficios de tu obra social!
                </motion.h3>

                {/* Animación del párrafo */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-xl text-balance"
                >
                    Tienes un <span className="text-2xl font-bold text-purple-500">20% de descuento!</span> registrando tu obra social!
                </motion.p>

                {/* Animación del botón */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                    <Link
                        href={`/profile`}
                        className="bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit block"
                    >
                        Registrar!
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
