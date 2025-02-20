/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { ReservationForm } from './form/ReservationForm';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { ReservationSummary } from './summary/ReservationSummary';
import { formatDate } from '@/helpers/FormatDate';
import { createConsultasPack } from '@/actions/consultas/createConsultasPack.action';
import type { PaqueteById } from '@/app/interfaces/paquete';
import { ButtonLoading } from '../../ui/buttons/ButtonLoading';
import { ButtonAnimated } from '../../ui/buttons/ButtonAnimated';

interface Props {
    paquete: PaqueteById
}

interface ServiceDetails {
    servicioId: string;
    medicoId: string;
    fecha_consulta: string;
    hora_consulta: string;
}

export const ReservaTurnosPack = ({ paquete }: Props) => {

    const { servicios_incluidos } = paquete;
    const [isMounted, setIsMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paqueteDetails, setPaqueteDetails] = useState<ServiceDetails[]>([])
    const [isPaqueteCompleted, setIsPaqueteCompleted] = useState(false)
    const {
        selectedMedico, selectedDate, selectedHorario,
        setSelectedMedico,
        setSelectedDate,
        setSelectedHorario,
        removeMedico } = useReservaTurnos();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const isServiceDetailsCompleted = selectedMedico?.id_medico && selectedDate && selectedHorario;

    useEffect(() => {

        setSelectedMedico(null)
        setSelectedDate(null)
        setSelectedHorario(null)
    }, []);

    useEffect(() => {
        if (!isPaqueteCompleted) return;

        setLoading(true)
        const paqueteToSave = {
            paqueteCode: paquete.codigo_paquete,
            paqueteDetails,
        }

        createConsultasPack(paqueteToSave)
            .then(res => {
                if (!res.ok) {
                    setLoading(false)
                    setError(res.message ?? 'Error al crear el paquete, revise logs de administrador');
                    return;
                }

                redirect(`/order/${res.order?.id}`)
            })
    }, [isPaqueteCompleted])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleNext = async (servicioId: string) => {
        if (!servicioId) return;
        // Verifica si se ha completado la selección de médico, fecha y horario
        if (selectedMedico && selectedDate && selectedHorario) {
            // Reiniciamos los valores del estado para el siguiente servicio
            const fechaString = formatDate.DateToString(selectedDate)
            const servicio: ServiceDetails = {
                servicioId,
                medicoId: selectedMedico.id_medico,
                fecha_consulta: formatDate.reverse(fechaString),
                hora_consulta: selectedHorario

            }

            setPaqueteDetails((prevDetails) => [...prevDetails, servicio]);

            removeMedico();

            if (currentIndex === servicios_incluidos.length - 1) {

                setIsPaqueteCompleted(true)
                return;
            }

            setCurrentIndex((prev) => prev + 1)

        }
    };
    if (loading) {
        return (
            <div className='flex flex-col items-center  min-h-screen'>
                <ButtonLoading label='Creando orden, espere...' />
            </div>
        )
    }


    return (
        <div className='flex flex-col items-center  min-h-screen'>
            <div className="flex gap-4 mb-4">
                {servicios_incluidos.map((pack, index) => (
                    <span
                        key={pack.servicioId}
                        className={`px-4 py-2 border-b-2 ${index === currentIndex ? 'border-purple-700 font-bold' : 'border-gray-300'}`}
                    >
                        {pack.servicio.nombre}
                    </span>
                ))}
            </div>


            {
                error && (
                    <span className='text-red-500'> {error} </span>

                )
            }

            {!isPaqueteCompleted && (
                <>

                    {servicios_incluidos.map((pack, index) => (
                        <div key={pack.servicioId} className={index === currentIndex ? 'w-full flex px-20 gap-2' : 'hidden'}>
                            <ReservationForm servicioMedico={pack.servicio} />

                            {
                                isServiceDetailsCompleted && (
                                    <div className='flex flex-col w-full '>
                                        <ReservationSummary />
                                        {index === currentIndex && (
                                            <div className='flex justify-center w-full'>
                                                <ButtonAnimated
                                                    label={`Confirmar la reserva para ${pack.servicio.nombre}`}
                                                    param={pack.servicioId}
                                                    onClick={handleNext}
                                                />
                                            </div>

                                        )}
                                    </div>
                                )
                            }

                            {!isServiceDetailsCompleted && (<ReservationSummary />)}

                        </div>
                    ))}
                </>

            )}


        </div>
    );
};
