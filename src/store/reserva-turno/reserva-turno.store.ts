
import { create } from 'zustand';
import { Medico } from '@/app/interfaces/services-medical';

interface Horario {
    hora: string;
    estado: string;
};



interface State {

    availableDays: number[];
    horarios: Horario[];
    semana: string[]
    selectedHorario?: string | null;
    selectedDate?: Date | null;
    selectedMedico?: Medico | null;
  


    // Methods
    setAvailableDays: (dias: number[]) => void;
    setHorarios: (horarios: Horario[]) => void;
    setSelectedMedico: (medico: Medico | null) => void;
    setSelectedDate: (date: Date | null) => void;
    setSelectedHorario: (horario: string | null) => void;

};

export const useReservaTurnoStore = create<State>()((set) => ({
    availableDays: [],
    horarios: [],
    semana: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    selectedMedico: undefined,
    selectedDate: undefined,
    selectedHorario: undefined,

    // Methods
    setSelectedMedico: (medico) => set({ selectedMedico: medico }),
    setSelectedDate: (date) => set({ selectedDate: date }),
    setSelectedHorario: (horario) => set({ selectedHorario: horario }),
    setHorarios: (horarios) => set({ horarios: horarios }),
    setAvailableDays: (dias) => set({ availableDays: dias }),


}));