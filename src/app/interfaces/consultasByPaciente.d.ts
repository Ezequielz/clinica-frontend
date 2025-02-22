import { UserRol } from "./user";

export interface ConsultasByUserResponse {
    ok: boolean;
    consulta: Consulta[];
    error?: string;
}

export interface Consulta {
    id: string;
    fecha_consulta: Date;
    hora_consulta: string;
    createdAt: Date;
    updatedAt: Date;
    pacienteId: string;
    medicoId: string;
    servicioId: string;
    paqueteId: PaqueteID | null;
    orderId: string;
    paquete: Paquete | null;
    paciente: Paciente;
    servicio: Servicio;
    medico: Medico;
    order: Order;
}


interface Paciente {
    obra_social: boolean;
    user: User;
}

interface User {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fecha_nac: Date;
    email: string;
    telefono: string;
    direccion: string;
    imagen: null;
    rol: UserRol;
}


interface Paquete {
    codigo_paquete: string;
    servicios_incluidos: ServiciosIncluido[];
}

interface Medico {
    user: {
        nombre: string,
        apellido: string
    }
}

interface Servicio {
    nombre: string;
}
interface Order {
    id: string;
    pagado: boolean;
}
