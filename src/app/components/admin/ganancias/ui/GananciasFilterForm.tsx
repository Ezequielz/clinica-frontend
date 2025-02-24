'use client';

import { useForm } from 'react-hook-form';
import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';

export interface GananciasDTO {
    month?: string;
    year?: number;
    typo?: 'servicio' | 'pack';
}

const months = [
    { value: '0', label: 'Enero' },
    { value: '1', label: 'Febrero' },
    { value: '2', label: 'Marzo' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Mayo' },
    { value: '5', label: 'Junio' },
    { value: '6', label: 'Julio' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Septiembre' },
    { value: '9', label: 'Octubre' },
    { value: '10', label: 'Noviembre' },
    { value: '11', label: 'Diciembre' },
];

interface Props {
    onSubmit: (data: GananciasDTO) => void;
}

export const GananciasFilterForm = ({ onSubmit }: Props) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth().toString();
    const currentYear = currentDate.getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => (2000 + i).toString());

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<GananciasDTO>({
        defaultValues: {
            year: currentYear,
            month: currentMonth,
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full flex gap-2 items-center" autoComplete="off">
            <select {...register("month")} className="border rounded p-2">
                <option value="">Seleccionar mes</option>
                {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                ))}
            </select>

            <select {...register("year")} className="border rounded p-2">
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <select {...register("typo")} className="border rounded p-2">
                <option value="">Todos los tipos</option>
                <option value="servicio">Servicio</option>
                <option value="pack">Pack</option>
            </select>

            {
                isSubmitting
                    ? <ButtonLoading label="Buscando..." />
                    : <ButtonAnimated label="Buscar" />
            }
        </form>
    );
};
