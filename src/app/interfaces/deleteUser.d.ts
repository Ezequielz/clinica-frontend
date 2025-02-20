export interface DeleteUserResponse {
    ok:   boolean;
    user: User;
    error?: string
}

interface User {
    id:     string;
    nombre: string;
}
