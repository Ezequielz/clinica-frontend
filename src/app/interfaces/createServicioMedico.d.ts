export interface CreateServicioMedicoResponse {
    ok:                       boolean;
    medicalSpecialityCreated: MedicalSpecialityCreated;
    error?: string;
}
interface MedicalSpecialityCreated {
    id:              string;
    codigo_servicio: string;
    nombre:          string;
    descripcion:     string;
    precio:          number;
    imagen:          null;
    createdAt:       Date;
    updatedAt:       Date;
}
