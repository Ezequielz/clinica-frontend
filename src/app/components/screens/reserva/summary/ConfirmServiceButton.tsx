'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { createConsulta } from '@/actions/consultas/createConsulta.action';
import { formatDate } from '@/helpers/FormatDate';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import type { ServicioMedico } from '@/app/interfaces/services-medical';

interface Props {
    servicioMedico: ServicioMedico;

};


export const ConfirmServiceButton = ({servicioMedico}: Props) => {
    const session = useSession()
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const {
        selectedDate,
        selectedHorario,
        selectedMedico,
    } = useReservaTurnos();
    

    const isComplete = selectedMedico?.id_medico && selectedDate && selectedHorario;
    const precioWithDiscount = servicioMedico.precio * 0.80;

    const handleReserveConfirm = async () => {
        setError(null);
        setLoading(true)
        if (!selectedDate ||
            !selectedHorario ||
            !selectedMedico?.id_medico) return;

        const { ok, message, consulta } = await createConsulta({
            fecha_consulta: formatDate.DateToString(selectedDate),
            hora_consulta: selectedHorario,
            medicoId: selectedMedico.id_medico,
            servicioId: servicioMedico.codigo_servicio,
        });

        if (!ok || !consulta) {
            setLoading(false);
            setError(message ?? 'Error desconocido, intente nuevamente mas tarde o pongase en contacto con el administrador ')
            return;
        }

        redirect(`/order/${consulta.orderId}`);


    }

    if (!isComplete) return null;
    return (

        <motion.div
            className="mt-4 bg-slate-100 p-4 rounded-lg shadow-md h-fit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {error && <span className="text-red-500">{error}</span>}

            <ul className='bg-white'>

                <li className="flex justify-between text-purple-600 font-semibold bg-purple-200 p-2 my-1 ">
                    <p >Precio: </p>
                    <span>${servicioMedico.precio} </span>
                </li>

                {session.data?.user.paciente.obra_social && (
                    <>
                        <li className="flex justify-between text-green-600 bg-purple-200 p-2 my-1 ">
                            <p >Descuento por obra social (%20): </p>
                            <span>-${servicioMedico.precio - precioWithDiscount}</span>
                        </li>
                        <li className="flex justify-between font-bold p-2 my-1  bg-purple-200">
                            <p >Total: </p>
                            <span> ${precioWithDiscount}</span>
                        </li>
                    </>
                )}
            </ul>


            <motion.button
                className={clsx(
                    "block mt-4 w-full py-2 rounded-lg text-white font-medium",
                    {
                        "bg-purple-700 hover:bg-purple-500 transition-colors": !loading,
                        "bg-gray-400 animate-pulse cursor-not-allowed": loading,
                    }
                )}
                onClick={handleReserveConfirm}
                disabled={loading}
                whileTap={{ scale: 0.95 }}
            >
                {loading ? "Creando orden de reserva..." : "Confirmar la reserva"}
            </motion.button>

        </motion.div>

    )
}
