/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';

import { ReservationSummary } from './summary/ReservationSummary';
import { ReservationForm } from './form/ReservationForm';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';


import { ConfirmServiceButton } from './summary/ConfirmServiceButton';
import { Servicio } from '@/app/interfaces/service-medical';

interface Props {
  servicioMedico: Servicio;
};

export const ReservaTurnosServicio = ({ servicioMedico }: Props) => {

  const [isMounted, setIsMounted] = useState(false);

  const {
    setSelectedMedico,
    setSelectedDate,
    setSelectedHorario
  } = useReservaTurnos();


  useEffect(() => {

    setSelectedMedico(null)
    setSelectedDate(null)
    setSelectedHorario(null)
  }, []);

  useEffect(() => {
    setIsMounted(true);

  }, []);

  if (!isMounted) return null;

  return (
    <div className='px-5 md:px-20 min-h-screen w-full flex flex-col justify-start items-center'>

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <ReservationForm servicioMedico={servicioMedico} />

        <ReservationSummary />
      </div>
      
        <ConfirmServiceButton servicioMedico={servicioMedico} />


    </div>
  );
};
