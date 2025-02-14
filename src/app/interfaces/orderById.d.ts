export interface OrderByIDResponse {
    ok: boolean;
    order: OrderById;
    error?: string;
}

export interface OrderById {
    id: string;
    pagado: boolean;
    pagadoAt: null;
    monto_total: number;
    pacienteId: string;
    transactionId: null;
    createdAt: Date;
    updatedAt: Date;
    consultas: Consulta[];
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
    paqueteId?: string;
    orderId: string;
    medico: Medico;
    servicio: Servicio;
    paquete: Paquete;
}

interface Paquete {
    nombre: string;
    precio_paquete: number;
    codigo_paquete: string;
}

export interface Medico {
    user: User;
}

export interface User {
    nombre: string;
    apellido: string;
}

export interface Servicio {
    nombre: string;
    codigo_servicio: string;
    precio: number;
}
