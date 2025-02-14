export interface ConsultasResponse {
    ok:             boolean;
    consulta:       Consulta;
    turnoReservado: TurnoReservado;
    error?: string;
}

export interface Consulta {
    id:             string;
    fecha_consulta: Date;
    hora_consulta:  string;
    createdAt:      Date;
    updatedAt:      Date;
    pacienteId:     string;
    medicoId:       string;
    servicioId:     string;
    paqueteId:      null;
    orderId:        string;
}

export interface TurnoReservado {
    id_reserva:  string;
    fecha_turno: Date;
    hora_turno:  string;
    createdAt:   Date;
    updatedAt:   Date;
    medicoId:    string;
    pacienteId:  string;
    turnoId:     string;
    consultaId:  string;
}
