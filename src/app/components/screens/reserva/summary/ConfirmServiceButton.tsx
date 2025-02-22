'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

import { createConsulta } from '@/actions/consultas/createConsulta.action';
import { formatDate } from '@/helpers/FormatDate';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import type{ Servicio } from '@/app/interfaces/service-medical';

interface Props {
    servicioMedico: Servicio;
};


export const ConfirmServiceButton = ({ servicioMedico }: Props) => {
    const session = useSession()
    const [error, setError] = useState<null | string>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        isLoading,
        selectedDate,
        selectedHorario,
        selectedMedico,
        setIsLoading
    } = useReservaTurnos();


    const isComplete = selectedMedico?.id_medico && selectedDate && selectedHorario;
    const precioWithDiscount = servicioMedico.precio * 0.80;

    const handleReserveConfirm = async () => {
        setIsLoading(true)
        setError(null);
        setIsLoading(true)
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
            setIsLoading(false);
            setError(message ?? 'Error desconocido, intente nuevamente mas tarde o pongase en contacto con el administrador ')
            return;
        }
        
        redirect(`/order/${consulta.orderId}`);


    }

    if (!isComplete) return null;
    return (

        <motion.div
            className=" w-1/2 bg-slate-100 p-4 rounded-lg shadow-md h-fit"
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

             <div className='flex justify-center'>
                {
                    !isLoading
                        ? <ButtonAnimated label='Confirmar la reserva' onClick={handleReserveConfirm} />
                        : <ButtonLoading label='Creando orden de reserva...' />
                }

            </div>


        </motion.div>

    )
}
