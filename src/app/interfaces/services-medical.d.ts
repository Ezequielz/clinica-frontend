export interface ServicesMedicalResponse {
    ok: boolean;
    servicios: ServicioMedico[];
}

export interface ServicioMedico {
    id: string;
    codigo_servicio: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
    medicos: Medico[];
}

export interface Medico {
    id_medico: string;
    user: User;
    turnos: Turno[];
}
export interface User {
    nombre: string;
    apellido: string;
}

export interface Turno {
    id_turno: string;
    dia_semana: DiaSemana;
    hora_inicio: string;
    hora_fin: string;
    medicoId: string;
}

export enum DiaSemana {
    Jueves = "jueves",
    Lunes = "lunes",
    Martes = "martes",
    Miercoles = "miercoles",
    Viernes = "viernes",
}
