export interface TurnosReservadoResponse {
    ok:               boolean;
    turnosReservados: TurnosReservado[];
    error?: string;
}

export interface TurnosReservado {
    id_reserva:  string;
    fecha_turno: Date;
    hora_turno:  string;
    medicoId:    string;
    pacienteId:  string;
    turnoId:     string;
    consultaId:  string;
}
