'use client';

import { IoAdd, IoTrashOutline } from 'react-icons/io5';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import type { Turno } from '@/app/interfaces/medico';

interface TurnosFormProps {
    turnos?: Turno[];
    setTurnos: (turnos: Turno[]) => void;
}

export const TurnosForm = ({ turnos = [], setTurnos }: TurnosFormProps) => {

    const workingDays = ["lunes", "martes", "miércoles", "jueves", "viernes"];
    const notAvailableDays = turnos.map(turno => turno.dia_semana).filter(dia => dia !== '');
    const availableDays = notAvailableDays ? workingDays.filter(day => !notAvailableDays.includes(day)) : workingDays;

    const handleAddTurno = () => {
        setTurnos([...turnos, { dia_semana: '', hora_inicio: '', hora_fin: '', isEditing: true }]);
    };

    const handleRemoveTurno = (index: number) => {
        setTurnos(turnos.filter((_, i) => i !== index));
    };

    const handleTurnoChange = (index: number, field: keyof Turno, value: string) => {
        const updatedTurnos = turnos.map((t, i) =>
            i === index ? { ...t, [field]: value } : t
        );
        if (updatedTurnos[index].dia_semana && updatedTurnos[index].hora_inicio && updatedTurnos[index].hora_fin) {
            updatedTurnos[index].isEditing = false;
        }

        setTurnos(updatedTurnos);
    };


    return (
        <section className='w-full'>
            <header className='flex justify-between items-center'>
                <h3 className='text-xl font-semibold'>Turnos</h3>
                <ButtonDefault label='Agregar Turno' onClick={handleAddTurno} icon={<IoAdd size={25} />} />
            </header>
            {turnos.map((turno, index) => (
                <div key={index} className='flex gap-3 mb-3 items-center justify-between w-full'>
                    {turno.isEditing ? (
                        <>
                            <select
                                className='px-4 py-2 border bg-white rounded text-slate-800'
                                value={turno.dia_semana}
                                onChange={(e) => handleTurnoChange(index, 'dia_semana', e.target.value)}
                            >
                                <option value=''>Selecciona un día</option>
                                {availableDays.map((dia) => (
                                    <option key={dia} value={dia}>{dia}</option>
                                ))}
                            </select>

                            <select
                                value={turno.hora_inicio}
                                onChange={(e) => handleTurnoChange(index, 'hora_inicio', e.target.value)}
                            >
                                {Array.from({ length: 24 }, (_, i) => {
                                    const hora = i.toString().padStart(2, '0') + ':00';
                                    return <option key={hora} value={hora}>{hora}</option>;
                                })}
                            </select>

                            <select
                                value={turno.hora_fin}
                                onChange={(e) => handleTurnoChange(index, 'hora_fin', e.target.value)}
                            >
                                {Array.from({ length: 24 }, (_, i) => {
                                    const hora = i.toString().padStart(2, '0') + ':00';
                                    return <option key={hora} value={hora}>{hora}</option>;
                                })}
                            </select>
                        </>
                    ) : (
                        <div className='flex gap-3 px-4 py-2 rounded justify-between'>
                            <span>{turno.dia_semana}</span>
                            <span>{turno.hora_inicio} - {turno.hora_fin}</span>
                        </div>
                    )}
                    <ButtonDefault
                        onClick={() => handleRemoveTurno(index)}
                        icon={<IoTrashOutline size={20} />}
                        className='bg-red-500 hover:scale-105 hover:bg-red-600 text-white p-2 rounded-full'
                    />
                </div>
            ))}
        </section>
    );
};
