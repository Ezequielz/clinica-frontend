
'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { TurnosForm } from './TurnosForm';

import type { MedicoById, Turno } from '@/app/interfaces/medico';
import type { ServicioMedico } from '@/app/interfaces/services-medical';
import { updateMedico } from '@/actions/medicos/updateMedico.action';
import { DeleteMedico } from './DeleteMedico';

export interface UpdateMedicoDTO {
    id: string;
    sueldo: number;
    especialidadId: string;
    turnos?: Turno[]
};

interface Props {
    medico: MedicoById;
    servicesMedical: ServicioMedico[];
}

export const EditMedicoForm = ({ medico, servicesMedical }: Props) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<UpdateMedicoDTO>({
        defaultValues: {
            id: medico.id_medico,
            sueldo: medico.sueldo,
            especialidadId: medico.especialidadId,
            turnos: medico.turnos,
        }
    });

    const watchTurnos = watch("turnos", medico.turnos) ?? [];

    const setTurnos = (turnos: Turno[]) => {
        setValue("turnos", turnos);
    };

    const onSubmit = async (updateMedicoDTO: UpdateMedicoDTO) => {
        const turnos = updateMedicoDTO.turnos ?? [];
        const days = turnos.map(t => t.dia_semana);
        const isDuplicateDays = days.some((day, i) => days.indexOf(day) !== i);

        if (isDuplicateDays) {
            return enqueueSnackbar('No puedes agregar dos turnos en el mismo día.', { variant: 'error' });
        }

        for (const turno of updateMedicoDTO.turnos ?? []) {
            if (!turno.dia_semana || !turno.hora_inicio || !turno.hora_fin) {
                enqueueSnackbar("Todos los campos del turno son obligatorios.", { variant: "error" });
                return;
            }

            // Convertir horas a números para comparación
            const horaInicio = parseInt(turno.hora_inicio.replace(":", ""), 10);
            const horaFin = parseInt(turno.hora_fin.replace(":", ""), 10);

            if (horaFin <= horaInicio) {
                enqueueSnackbar("La hora de fin debe ser mayor que la hora de inicio.", { variant: "error" });
                return;
            }
        }

        const { ok, message } = await updateMedico(updateMedicoDTO);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Médico actualizado', { variant: 'success' });

        setValue("turnos", updateMedicoDTO.turnos);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className="flex gap-8 ">

                <div className="flex flex-col  w-fit">

                    <Image
                        src={medico.user.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                        alt={`imagen de médico: ${medico.user.apellido}`}
                        className="w-72 object-cover"
                        height={500}
                        width={500}
                    />

                    <h2 className='font-bold text-2xl'>Medico: {medico.user.nombre} {medico.user.apellido} </h2>

                </div>

                <div>

                    <div className="flex flex-col">
                        <label htmlFor='sueldo'>Sueldo</label>
                        <input
                            className={clsx(
                                "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                { 'border-red-500': errors.sueldo }
                            )}
                            type='number'
                            {...register('sueldo', { required: false, min: 1 })}
                        />

                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="especialidadId">Especialidad</label>
                        <select
                            className={clsx(
                                "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                { 'border-red-500': errors.especialidadId }
                            )}
                            {...register('especialidadId', { required: true })}
                            defaultValue={medico.especialidad.codigo_servicio}
                        >
                            {servicesMedical.map(service => (
                                <option key={service.id} value={service.codigo_servicio}>
                                    {service.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.especialidadId && <p className="text-red-500 text-sm">Selecciona una especialidad.</p>}
                    </div>

                    {/* Turnos */}
                    <TurnosForm
                        turnos={watchTurnos}
                        setTurnos={setTurnos}
                    />
                </div>

            </div>





            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Actualizando...' />
                        : (

                            <div className='flex gap-2 justify-center items-end'>
                                <ButtonAnimated label='Actualizar Médico' />
                                <DeleteMedico medicoId={medico.id_medico} />
                            </div>
                        )

                }

            </div>
        </form>


    )
}