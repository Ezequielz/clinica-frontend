'use client';

import clsx from 'clsx';
import { MedicoSelect } from './MedicoSelect';
import { CalendarTurnos } from './CalendarTurnos';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { Servicio } from '@/app/interfaces/service-medical';

interface Props {
    servicioMedico: Servicio;

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
                "w-1/2 p-4 bg-white rounded-lg shadow-md",
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
                    <div className="grid grid-cols-3 gap-2 w-full mt-2">
                        {horarios.map(({ hora, estado }) => (
                            < button
                                key={hora}
                                onClick={() => setSelectedHorario(hora)}
                                disabled={estado === 'reservado'}
                                className={`p-2 text-center cursor-pointer rounded-lg 
                                            ${estado === 'disponible' ? 'bg-green-500'
                                            : estado === 'reservado' ? 'bg-orange-500'
                                            : 'bg-red-500 cursor-not-allowed'}`}
                            >
                                {hora}hs
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
