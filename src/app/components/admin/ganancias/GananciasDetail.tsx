'use client';

import { useState, useEffect } from 'react';
import { readGanancias } from '@/actions/orders/readGanancias.action';
import { Ganancias } from '@/app/interfaces/ganancias';
import { GananciasFilterForm } from './ui/GananciasFilterForm';
import { MonthlyChart } from './MonthlyChart';
import { SkeletonMonthlyChart } from './ui/SkeletonMonthlyChart';

export interface GananciasDTO {
    month?: string;
    year?: number;
    typo?: 'servicio' | 'pack';
}

export const GananciasDetail = () => {
    const [filters, setFilters] = useState<GananciasDTO>({ month: undefined, year: undefined, typo: undefined });
    const [ganancias, setGanancias] = useState<Ganancias | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGanancias = async () => {
            setLoading(true);
            const { ok, ganancias } = await readGanancias(filters);
            if (ok) setGanancias(ganancias!);
            setLoading(false);
        };

        fetchGanancias();
    }, [filters]);

    const handleFiltersUpdate = (gananciasDTO: GananciasDTO) => {
        setFilters(gananciasDTO);
    };
    if (!loading && !ganancias) {
        return (
            <div>
                Error al obtener ganancias.
            </div>
        )
    }
    return (
        <section className="px-10 w-full">


            <header className='p-5'>
                <h4 className='text-xl font-semibold'>Ganancias
                    <span className="mx-1">
                        {filters.typo ? `de ${filters.typo}s` : 'totales'}
                    </span>
                    de hoy: ${ganancias ? ganancias.today : '-'} </h4>
                <h3 className='text-2xl font-semibold'>Ganancias
                    <span className="mx-1">
                        {filters.typo ? `de ${filters.typo}s` : 'totales'}
                    </span>
                    del mes:

                    ${ganancias ? ganancias.totalGanancias : ''}
                </h3>

            </header>

            <GananciasFilterForm onSubmit={handleFiltersUpdate} />

            {
                loading
                    ? (<SkeletonMonthlyChart />)
                    : (<MonthlyChart month={ganancias!.month} />)
            }

        </section>
    );
};
