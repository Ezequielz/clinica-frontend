'use client';

import clsx from 'clsx';
import { MedicoSelect } from './MedicoSelect';
import { CalendarTurnos } from './CalendarTurnos';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { ServicioMedico } from '@/app/interfaces/paquete';

interface Props {
    servicioMedico: ServicioMedico;
}

export const ReservationForm = ({ servicioMedico }: Props) => {
    const {
        selectedDate,
        selectedHorario,
        selectedMedico,
        horarios,

        // Methods
        setSelectedHorario,

    } = useReservaTurnos();

    const isComplete = selectedMedico?.id_medico && selectedDate && selectedHorario;

    if (isComplete) return null;

    return (
        <div className={
            clsx(
                "w-full sm:w-1/2 p-4 bg-white rounded-lg shadow-md",
                {
                    "hidden": selectedDate && selectedHorario && selectedMedico?.id_medico
                }
            )
        }>

            {
                !selectedMedico?.id_medico && (
                    <MedicoSelect medicos={servicioMedico.medicos} />

                )
            }

            {
                selectedMedico?.id_medico && !selectedDate && (
                    <CalendarTurnos />
                )
            }


            {selectedDate && !selectedHorario && (

                <div className="mt-4">

                    <h3 className="text-md font-bold">Horarios disponibles</h3>
                    {
                        horarios.length < 1 && (
                            <div className='grid grid-cols-3 gap-2 w-full mt-2'>
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                                <div className='h-12 w-full bg-slate-200 animate-pulse' />
                            </div>
                        )
                    }
                    <div className="grid grid-cols-3 gap-2 w-full mt-2">
                        {horarios.map(({ hora, estado }) => (
                            < button
                                key={hora}
                                onClick={() => setSelectedHorario(hora)}
                                disabled={estado === 'completo'}

                                className={
                                    clsx(
                                        "p-2 text-center text-white  rounded-lg",
                                        {
                                           "bg-green-500 cursor-pointer hover:bg-green-400" : estado === 'disponible',
                                           "bg-orange-500 cursor-pointer hover:bg-orange-400": estado === 'reservado',
                                           "bg-red-500 cursor-not-allowed cursor": estado === 'completo',
                                        }
                                    )
                                }
                          
                            >
                                {hora}hs
                            </button>
                        ))}
                    </div>
                    <div >
                        Estado:
                        <div className='flex gap-2 items-center'>
                            <div className='h-4 w-4 bg-green-500 rounded-full'/>
                            <span>Turnos disponibles</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='h-4 w-4 bg-orange-500 rounded-full'/>
                            <span>1 solo turno disponible</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='h-4 w-4 bg-red-500 rounded-full'/>
                            <span>No hay turno disponible</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
