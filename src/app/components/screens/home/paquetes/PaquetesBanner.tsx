"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Title } from "@/app/components/ui/Title";

export const PaquetesBanner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section ref={ref} className="flex flex-col-reverse md:flex-row md:justify-center md:items-center p-5 md:px-10 lg:px-20 w-full">
            <div className="sm:pl-10 flex-col flex gap-5">
           
                <Title title={'Usá más servicios, pagá menos!'} 
                className="pb-2 font-semibold flex-wrap  md:justify-center text-balance text-2xl sm:text-3xl md:text-4xl lg:text-6xl flex relative" />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-balance"
                >
                    Hemos creado paquetes para ti! Elige el que incluya los servicios que necesites y ahorra un 15%!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    className="flex justify-end md:justify-start"
                >
                    <Link
                        href={`/paquetes`}
                        className="bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit block"
                    >
                        Saber más!
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
                <Image
                    src="https://res.cloudinary.com/zapataezequiel/image/upload/v1738870267/clinica/paquete.webp"
                    alt="Imagen familia atendiéndose"
                    height={950}
                    width={950}
                    // className="w-full object-cover"
                    unoptimized
                />
            </motion.div>
        </section>
    );
};
