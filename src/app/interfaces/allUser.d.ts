import { UserRol } from "./user";

export interface AllUsersResponse {
    ok:    boolean;
    users: User[];
    error?: string
}

 export interface User {
    id:        string;
    nombre:    string;
    apellido:  string;
    dni:       null | string;
    fecha_nac: Date;
    email:     string;
    telefono:  null | string;
    direccion: null | string;
    imagen:    null | string;
    rol:       UserRol;
}

