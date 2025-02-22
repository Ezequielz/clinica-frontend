export interface MedicoByIdResponse {
    ok: boolean;
    medico: MedicoById;
    error?: string;
}

export interface MedicoById {
    id_medico: string;
    userId: string;
    sueldo: number;
    especialidadId: string;
    especialidad: Especialidad;
    turnos: Turno[];
    user: User;
}

export interface Especialidad {
    nombre: string;
    codigo_servicio: string;
}

export interface Turno {
    id_turno?: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    isEditing?: boolean;
}

export interface User {
    nombre: string;
    apellido: string;
    imagen?: string;
}
