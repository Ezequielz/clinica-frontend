'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Title } from '../../ui/Title';
import { type ServicioMedico } from '@/app/interfaces/services-medical';
import Link from 'next/link';

interface Props {
  servicioMedico: ServicioMedico;
}

export const ServicioMedicoByCode = ({ servicioMedico }: Props) => {

  const viewTransitionName = servicioMedico!.nombre.trim().replaceAll(' ', '-');
  const params = useParams();
  const codigoServicio = params['codigo_servicio'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='w-full px-6 md:px-20 flex flex-col md:flex-row gap-6 md:gap-10 '
    >
      {/* Imagen del servicio */}
      <motion.div
        // initial={{ opacity: 0, scale: 0.9 }}
        // animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.6, delay: 0.2 }}
        className='relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-lg shadow-lg h-fit'
      >
        <Image
          src={servicioMedico!.imagen ?? ''}
          alt={servicioMedico!.nombre ?? ""}
          fill
          unoptimized
          className="object-cover w-full h-full"
          style={{ viewTransitionName }}
        />
      </motion.div>

      {/* Detalles del servicio */}
      <div

        className='w-full md:w-1/2 space-y-4'
      >
        <Title title={servicioMedico!.nombre} />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >

          <p className='text-gray-600'>{servicioMedico!.descripcion}</p>
          <p className='text-xl font-semibold text-purple-600'>${servicioMedico!.precio}</p>

          {/* Lista de médicos */}
          <div className='mt-4'>
            <h3 className='text-lg font-bold text-gray-800'>Médicos Disponibles:</h3>
            <ul className='mt-2 space-y-2'>
              {servicioMedico!.medicos.map((medico, index) => (
                <li key={index} className='p-3 bg-gray-100 rounded-lg'>
                  <p className='font-semibold text-gray-700'> {medico.user.nombre} {medico.user.apellido} </p>

                  <p className='text-sm text-gray-500'>
                    Turnos:{' '}
                    {medico.turnos.map((t) => `${t.dia_semana} (${t.hora_inicio}hs - ${t.hora_fin}hs)`).join(', ')}
                  </p>
                </li>
              ))}
            </ul>


            <Link
              href={`/reserva/servicio/${codigoServicio}`}
              className='bg-purple-800 block mt-2 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-fit '
            >

              Reservar turno
            </Link>
          </div>

        </motion.div>


      </div>


    </motion.section>
  )
}
