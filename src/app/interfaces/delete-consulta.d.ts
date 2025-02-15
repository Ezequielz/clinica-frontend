export interface DeleteConsultaResponse {
    ok:       boolean;
    consulta: Consulta;
    error?: string;
}

interface Consulta {
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
