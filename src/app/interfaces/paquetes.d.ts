export interface PaquetesResponse {
    ok:       boolean;
    paquetes: Paquete[];
}

export interface Paquete {
    codigo_paquete:      string;
    nombre:              string;
    imagen:              null;
    precio_paquete:      number;
    servicios_incluidos: ServiciosIncluido[];
}

interface ServiciosIncluido {
    servicio: Servicio;
}

interface Servicio {
    nombre:      string;
    precio:      number;
    descripcion: string;
    medicos?:     Medico[];
}

interface Medico {
    turnos: Turno[];
    user:   User;
}

interface Turno {
    dia_semana:  DiaSemana;
    hora_inicio: string;
    hora_fin:    string;
}

enum DiaSemana {
    Jueves = "jueves",
    Lunes = "lunes",
    Martes = "martes",
    Miercoles = "miercoles",
    Viernes = "viernes",
}



interface User {
    nombre:   string;
    apellido: string;
}


