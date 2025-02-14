export interface LoginResponse {
    ok:   boolean;
    user: User;
    msg?: string;
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
    imagen:    null;
    rol:       string;
    createdAt: Date;
    updatedAt: Date;
    paciente:  Paciente;
    token:     string;
}

interface Paciente {
    id_paciente: string;
}
