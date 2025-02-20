export interface DeleteServicioMedicoResponse {
    ok:                       boolean;
    medicalSpecialitydeleted: MedicalSpecialitydeleted;
    error?: string;
}

interface MedicalSpecialitydeleted {
    id:              string;
    codigo_servicio: string;
    nombre:          string;
    descripcion:     string;
    precio:          number;
    imagen:          null;
    createdAt:       Date;
    updatedAt:       Date;
}
