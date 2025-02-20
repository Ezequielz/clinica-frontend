export interface PaqueteByIdResponse {
    ok: boolean;
    paquete: PaqueteById;
    error?: string;
}

export interface PaqueteById {
    id: string;
    codigo_paquete: string;
    nombre: string;
    imagen?: string;
    precio_paquete: number;
    servicios_incluidos: ServiciosIncluido[];
}

interface ServiciosIncluido {
    servicioId: string;
    servicio: ServicioMedico;
}

interface ServicioMedico {
    id: string;
    codigo_servicio: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
    medicos: Medico[];
}

interface Medico {
    id_medico: string;
    turnos: Turno[];
    user: User;
}

interface Turno {
    id_turno: string;
    dia_semana: DiaSemana;
    hora_inicio: string;
    hora_fin: string;
    medicoId: string;
}


interface User {
    nombre: string;
    apellido: string;
}
