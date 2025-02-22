import { useMemo } from 'react';
import Select from 'react-select';
import { useReservaTurnos } from '@/hooks/useReservaTurnos';
import { Medico } from '@/app/interfaces/service-medical';

interface Props {
    medicos: Medico[];

}

export const MedicoSelect = ({medicos }:Props) => {

    
      const {
   
        selectedMedico,
    
        // Methods
        setSelectedMedico,
    
      } = useReservaTurnos();


      const options = useMemo(
        () =>
          medicos.map((medico) => ({
            value: medico.user.nombre,
            label: `${medico.user.nombre} ${medico.user.apellido}`,
          })),
        [medicos]
      );
    return (
        <>
            <h3 className="text-md font-bold">Selecciona un médico </h3>
            <Select
                key={selectedMedico?.id_medico || 'default'}
                options={options}
                onChange={(selected) => {
                    const medico =
                        medicos.find((m) => m.user.nombre === selected?.value) || null;
                    setSelectedMedico(medico);
                }}
            />
        </>
    )
}
