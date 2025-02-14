'use client';

import { motion } from "framer-motion";
import { formatDate } from "@/helpers/FormatDate";
import { useReservaTurnos } from "@/hooks/useReservaTurnos";


export const ReservationSummary = () => {


    const {
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
            className="rounded-lg shadow-lg p-6 bg-white text-gray-900 mx-auto transition-all w-full"
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
                        className="ml-5 bg-red-500 text-white px-2 py-1 rounded-full"
                        onClick={removeMedico}
                    >
                        X
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
                        className="ml-5 bg-red-500 text-white px-2 py-1 rounded-full"
                        onClick={removeFecha}
                    >
                        X
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
                        className="ml-5 bg-red-500 text-white px-2 py-1 rounded-full"
                        onClick={removeHorario}
                    >
                        X
                    </button>
                </motion.div>
            )}

      

        </motion.div>
    )
}
