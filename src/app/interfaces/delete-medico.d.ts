export interface DeleteMedicoResponse {
    ok:     boolean;
    medico: Medico;
    error?: string;
}

export interface Medico {
    id_medico:      string;
    userId:         string;
    sueldo:         number;
    especialidadId: string;
    createdAt:      Date;
    updatedAt:      Date;
}
