/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReservationForm } from './form/ReservationForm';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { ReservationSummary } from './summary/ReservationSummary';
import { formatDate } from '@/helpers/FormatDate';
import { createConsultasPack } from '@/actions/consultas/createConsultasPack.action';
import type { PaqueteById } from '@/app/interfaces/paquete';

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
    const session = useSession();
    const { servicios_incluidos } = paquete;
    const [isMounted, setIsMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paqueteDetails, setPaqueteDetails] = useState<ServiceDetails[]>([])
    const [isPaqueteCompleted, setIsPaqueteCompleted] = useState(false)
    const { selectedMedico, selectedDate, selectedHorario, removeMedico } = useReservaTurnos();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const isServiceDetailsCompleted = selectedMedico?.id_medico && selectedDate && selectedHorario;

    useEffect(() => {
        if (!isPaqueteCompleted) return;
        if (!session.data?.user.paciente.id_paciente) return;
        setLoading(true)
        const paqueteToSave = {
            paqueteCode: paquete.codigo_paquete,
            pacienteId: session.data?.user.paciente.id_paciente,
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
                loading && (
                    <div className='bg-purple-600 px-4 py-2 animate-pulse rounded-lg text-white'>Creando orden, espere...</div>
                )
            }

            {
                error && (
                    <span className='text-red-500'> {error} </span>

                )
            }
            <div className='flex w-full px-20 gap-2'>
                {!isPaqueteCompleted && (
                    <>

                        {servicios_incluidos.map((pack, index) => (
                            <div key={pack.servicioId} className={index === currentIndex ? 'w-1/2  block' : 'hidden'}>
                                <ReservationForm servicioMedico={pack.servicio} />

                                {
                                    isServiceDetailsCompleted && (
                                        <>
                                            <ReservationSummary />
                                            {index === currentIndex && (
                                                <button
                                                    onClick={() => handleNext(pack.servicioId)}
                                                    className="mt-4 p-2 bg-purple-700 hover:bg-purple-500 text-white rounded-lg"
                                                    disabled={!(selectedMedico && selectedDate && selectedHorario)}
                                                >
                                                    Confirmar la reserva para {pack.servicio.nombre}
                                                </button>
                                            )}
                                        </>
                                    )
                                }

                            </div>
                        ))}
                    </>

                )}

                {
                    !isServiceDetailsCompleted && (

                        <div className='w-1/2'>

                            <ReservationSummary />
                        </div>
                    )
                }

            </div>
        </div>
    );
};
