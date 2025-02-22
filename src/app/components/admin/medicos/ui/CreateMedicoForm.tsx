
'use client'

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';

import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { createMedico } from '@/actions/medicos/createMedico.action';
import { Turno } from '@/app/interfaces/medico';
import { User } from '@/app/interfaces/allUser';
import { ServicioMedico } from '@/app/interfaces/services-medical';
import { TurnosForm } from './TurnosForm';
import clsx from 'clsx';


export interface CreateMedicoDTO {
    userId: string;
    sueldo: number;
    especialidadId: string;
    turnos?: Turno[]
};

interface Props {
    users: User[];
    serviciosDisponibles: ServicioMedico[] | null
}

export const CreateMedicoForm = ({ users, serviciosDisponibles }: Props) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<CreateMedicoDTO>();

    const selectedUserId = watch("userId");
    const selectedEspecialidadId = watch("especialidadId");
    const watchTurnos = watch("turnos") ?? [];

    const setTurnos = (turnos: Turno[]) => {
        setValue("turnos", turnos);
    };

    const onSubmit = async (createMedicoDTO: CreateMedicoDTO) => {
        const { ok, message } = await createMedico(createMedicoDTO);
        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Servicio creado', { variant: 'success' });
        reset();
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className='flex gap-5 px-10 '>

                <div>

                    {/* Seleccion de usario */}
                    <div>
                        <label className="block font-medium text-gray-700">Seleccionar Usuario</label>
                        <select
                            {...register("userId", { required: "El usuario es obligatorio" })}
                            className="w-full mt-1 p-2 border rounded-md"
                            value={selectedUserId}
                        >
                            <option value="">Seleccione un usuario</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
                            ))}
                        </select>
                        {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
                    </div>

                    {/* Seleccion de servicio */}
                    <div>
                        <label className="block font-medium text-gray-700">Seleccionar Especialidad</label>
                        <select
                            {...register("especialidadId", { required: "La especialidad es obligatoria" })}
                            className="w-full mt-1 p-2 border rounded-md"
                            value={selectedEspecialidadId}
                        >
                            <option value="">Seleccione una especialidad</option>
                            {serviciosDisponibles?.map(servicio => (
                                <option key={servicio.id} value={servicio.codigo_servicio}>{servicio.nombre}</option>
                            ))}
                        </select>
                        {errors.especialidadId && <p className="text-red-500 text-sm">{errors.especialidadId.message}</p>}
                    </div>

                    {/* Sueldo */}
                    <div className="flex flex-col">
                        <label htmlFor={'sueldo'}>Sueldo</label>
                        <input
                            className={clsx(
                                "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                { 'border-red-500': errors.sueldo }
                            )}
                            type='number'
                            {...register('sueldo', { required: true, })}
                        />

                    </div>

                </div>
                {/* Turnos */}
                <div className="flex gap-8 w-1/2">


                    <TurnosForm
                        turnos={watchTurnos}
                        setTurnos={setTurnos}
                    />

                </div>
            </div>




            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Creando...' />
                        : <ButtonAnimated label='Crear Medico' />

                }

            </div>
        </form>


    )
}