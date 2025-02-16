export interface UserBySessionResponse {
    ok:   boolean;
    user: User;
    error: string;
}

 interface User {
    id:        string;
    nombre:    string;
    apellido:  string;
    dni:       string;
    fecha_nac: Date;
    email:     string;
    telefono:  string;
    direccion: string;
    imagen?:    string;
    rol:       string;
    createdAt: Date;
    updatedAt: Date;
    medico:    null;
    paciente:  Paciente;
}

 interface Paciente {
    id_paciente: string;
    obra_social: boolean;
    createdAt:   Date;
    updatedAt:   Date;
    userId:      string;
}
