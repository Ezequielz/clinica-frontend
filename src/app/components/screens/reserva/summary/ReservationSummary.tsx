'use client';

import { motion } from "framer-motion";
import { formatDate } from "@/helpers/FormatDate";
import { useReservaTurnos } from "@/hooks/useReservaTurnos";
import { IoTrashOutline } from "react-icons/io5"
import clsx from "clsx";

export const ReservationSummary = () => {


    const {
        isLoading,
        selectedDate,
        selectedHorario,
        selectedMedico,

        // Methods
        removeFecha,
        removeHorario,
        removeMedico,

    } = useReservaTurnos();



    return (
        <motion.div
            className="w-full sm:w-1/2 rounded-lg shadow-lg p-6 bg-white text-gray-900 mx-auto transition-all "
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >


            {selectedMedico && (
                <motion.div
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="font-medium">
                        Médico: {selectedMedico.user.nombre} {selectedMedico.user.apellido}
                    </span>
                    <button
                        className={
                            clsx(
                                "ml-5  text-white p-2 rounded-full",
                                {
                                    "bg-slate-300" : isLoading,
                                    "bg-red-500 hover:scale-105 hover:bg-red-600": !isLoading,
                                }
                            )
                        }
                        onClick={removeMedico}
                        disabled={isLoading}
                    >
                        <IoTrashOutline size={20}/>
                    </button>
                </motion.div>
            )}

            {selectedDate && (
                <motion.div
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="font-medium">
                        Fecha: {formatDate.fechaLegible(selectedDate.toISOString())}
                    </span>
                    <button
                        className={
                            clsx(
                                "ml-5  text-white p-2 rounded-full",
                                {
                                    "bg-slate-300" : isLoading,
                                    "bg-red-500 hover:scale-105 hover:bg-red-600": !isLoading,
                                }
                            )
                        }
                        onClick={removeFecha}
                        disabled={isLoading}
                    >
                        <IoTrashOutline size={20}/>
                    </button>
                </motion.div>
            )}

            {selectedHorario && (
                <motion.div
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="font-medium">Horario: {selectedHorario}hs</span>
                    <button
                        className={
                            clsx(
                                "ml-5  text-white p-2 rounded-full",
                                {
                                    "bg-slate-300" : isLoading,
                                    "bg-red-500 hover:scale-105 hover:bg-red-600": !isLoading,
                                }
                            )
                        }
                        onClick={removeHorario}
                        disabled={isLoading}
                    >
                        <IoTrashOutline size={20}/>
                    </button>
                </motion.div>
            )}



        </motion.div>
    )
}
