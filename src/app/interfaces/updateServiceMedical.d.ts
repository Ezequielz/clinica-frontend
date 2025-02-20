export interface UpdateServiceMedicalResponse {
    ok:                       boolean;
    medicalSpecialityUpdated: MedicalSpecialityUpdated;
    error?: string;
}

interface MedicalSpecialityUpdated {
    id:              string;
    codigo_servicio: string;
    nombre:          string;
    descripcion:     string;
    precio:          number;
    imagen:          string;
    createdAt:       Date;
    updatedAt:       Date;
}
