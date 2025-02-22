export interface AllMedicosResponse {
    ok:      boolean;
    medicos: Medico[];
    error?: string;
}

export interface Medico {
    id_medico:    string;
    especialidad: Especialidad;
    turnos:       Turno[];
}

export interface Especialidad {
    codigo_servicio: string;
    nombre:          string;
}

export interface Turno {
    dia_semana:  DiaSemana;
    hora_inicio: HoraInicio;
    hora_fin:    HoraFin;
}

export enum DiaSemana {
    Jueves = "jueves",
    Lunes = "lunes",
    Martes = "martes",
    Miercoles = "miercoles",
    Viernes = "viernes",
}

export enum HoraFin {
    The1200 = "12:00",
    The1300 = "13:00",
    The1400 = "14:00",
    The1500 = "15:00",
    The1600 = "16:00",
    The1800 = "18:00",
}

export enum HoraInicio {
    The0800 = "08:00",
    The0900 = "09:00",
    The1000 = "10:00",
    The1200 = "12:00",
    The1400 = "14:00",
    The800 = "8:00",
    The900 = "9:00",
}
