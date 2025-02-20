export interface UpdatePaqueteResponse {
    ok: boolean;
    paquete: Paquete;
    error?: string;
    msg?: string;
}

export interface Paquete {
    id: string;
    codigo_paquete: string;
    nombre: string;
    imagen: null;
    precio_paquete: number;
    createdAt: Date;
    updatedAt: Date;
}
