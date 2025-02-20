/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react';
import { readTurnosReservados } from '@/actions/turnos/readTurnosReservados';
import { formatDate } from '@/helpers/FormatDate';
import { useReservaTurnoStore } from '@/store/reserva-turno/reserva-turno.store';

export const useReservaTurnos = () => {

  const {
    horarios,
    availableDays,
    semana,
    selectedMedico,
    selectedDate,
    selectedHorario,
    isLoading,
    // Methods
    setAvailableDays,
    setHorarios,
    setSelectedMedico,
    setSelectedDate,
    setSelectedHorario,
    setIsLoading,

  } = useReservaTurnoStore(state => state);


  useEffect(() => {
    setIsLoading(false)
  }, [])
  

  // Dias para el medico seleccionado
  useEffect(() => {
    if (selectedMedico) {
      const diasDisponibles = Array.from(
        new Set(selectedMedico.turnos.map(turno => turno.dia_semana))
      );

      const diasNumericos = diasDisponibles.map(dia => {

        return semana.indexOf(dia);
      });

      setAvailableDays(diasNumericos);
    }


  }, [selectedMedico]);

  // Horarios para el día seleccionado del médico seleccionado
  useEffect(() => {
    const fetchTurnosDisponibles = async () => {
      if (!selectedMedico || !selectedDate) return;

      const diaSeleccionado = semana[selectedDate.getDay()];
      const turnoDia = selectedMedico.turnos.find(
        (turno) => turno.dia_semana.toLowerCase() === diaSeleccionado
      );

      if (!turnoDia) {
        setHorarios([]);
        return;
      }

      const horariosBase = generarHorarios(turnoDia.hora_inicio, turnoDia.hora_fin);


      // Buscar los turnos reservados en la fecha seleccionada y filtrar los horariios
      try {
        const { ok, message, turnosReservados } = await readTurnosReservados({
          medicoId: selectedMedico.id_medico,
          fecha: formatDate.DateToString(selectedDate),
        });

        if (!ok && message === 'invalid_token') {
          window.location.replace('/auth/login');
        }
        // console.log({ turnosReservados })
        if (!ok || !turnosReservados) throw new Error(message ?? 'Error al buscar turnos reservados');
        // Mapear horarios con su estado según los turnos reservados
        const horariosActualizados = horariosBase.map((horario) => {
          const reservasEnHora = turnosReservados.filter(
            (turno) => turno.hora_turno === horario.hora
          ).length;

          return {
            ...horario,
            estado:
              reservasEnHora === 0 ? "disponible" :
                reservasEnHora === 1 ? "reservado" :
                  "completo",
          };
        });

        setHorarios(horariosActualizados);
      } catch (error) {
        console.error("Error al obtener turnos reservados", error);
        setHorarios(horariosBase);
      }
    };

    fetchTurnosDisponibles();
  }, [selectedMedico, selectedDate]);


  const generarHorarios = (horaInicio: string, horaFin: string): { hora: string; estado: 'disponible' }[] => {
    const horarios: { hora: string; estado: 'disponible' }[] = [];
    let [hora] = horaInicio.split(':').map(Number);

    while (`${hora}`.padStart(2, '0') + ':00' < horaFin) {
      horarios.push({ hora: `${hora}`.padStart(2, '0') + ':00', estado: 'disponible' });
      hora++;
    };

    return horarios;
  };


  const removeMedico = () => {

    setAvailableDays([]);
    setHorarios([]);
    setSelectedDate(null);
    setSelectedMedico(null);
    setSelectedHorario(null);

  };
  const removeFecha = () => {

    setHorarios([]);
    setSelectedDate(null);
    setSelectedHorario(null);
  };
  const removeHorario = () => {

    setSelectedHorario(null);
  };

  return {
    selectedMedico,
    selectedDate,
    availableDays,
    horarios,
    selectedHorario,
    semana,
    isLoading,

    // Methoods
    setSelectedMedico,
    setSelectedDate,
    setHorarios,
    setSelectedHorario,
    setIsLoading,
    removeMedico,
    removeFecha,
    removeHorario,


  };

}