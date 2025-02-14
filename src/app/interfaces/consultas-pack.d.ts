export interface ConsultasPaqueteResponse {
    ok:        boolean;
    consultas: Consulta[];
    order:     Order;
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
    paqueteId:      string;
    orderId:        string;
}

export interface Order {
    id:            string;
    pagado:        boolean;
    pagadoAt:      null;
    monto_total:   number;
    pacienteId:    string;
    transactionId: null;
    createdAt:     Date;
    updatedAt:     Date;
}
