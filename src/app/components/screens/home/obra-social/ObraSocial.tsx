'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Title } from '@/app/components/ui/Title';

export const ObraSocialBanner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="flex flex-col md:flex-row md:items-center md:justify-center py-5 md:pr-20 sm:pl-10 w-full">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                className='w-full pr-10'
            >
                <Image
                    src="https://res.cloudinary.com/zapataezequiel/image/upload/v1738871833/clinica/obra-social.webp"
                    alt="Imagen obra social"
                    height={650}
                    width={650}
                    unoptimized
                />
            </motion.div>

            <div className="flex-col flex gap-5 px-5 md:px-10">
          
                <Title title={'Beneficios de tu obra social!'} className="pb-2 font-semibold flex-wrap  justify-center text-balance text-2xl sm:text-3xl md:text-4xl lg:text-6xl flex relative" />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-balance"
                >
                    Tienes hasta un <span className="text-2xl font-bold text-purple-500">20% de descuento!</span> registrando tu obra social!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    className="flex justify-end md:justify-start"
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
