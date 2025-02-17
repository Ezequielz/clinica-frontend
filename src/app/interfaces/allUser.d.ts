export interface AllUsersResponse {
    ok:    boolean;
    users: User[];
    error?: string
}

 interface User {
    id:        string;
    nombre:    string;
    apellido:  string;
    dni:       null | string;
    fecha_nac: Date;
    email:     string;
    telefono:  null | string;
    direccion: null | string;
    imagen:    null | string;
    rol:       Rol;
}

 enum Rol {
    Admin = "ADMIN",
    User = "USER",
}
