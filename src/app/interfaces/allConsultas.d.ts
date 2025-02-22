export interface AllConsultasResponse {
    ok:        boolean;
    consultas: Consulta[];
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
    paqueteId:      PaqueteID | null;
    orderId:        string;
}

enum PaqueteID {
    Pack001 = "PACK001",
    Pack002 = "PACK002",
    Pack003 = "PACK003",
}
