export interface DeletePaqueteResponse {
    ok: boolean;
    paquete: Paquete;
    error?: string;
    msg?: string;
}

 interface Paquete {
    id: string;
    codigo_paquete: string;
    nombre: string;
    imagen: null;
    precio_paquete: number;
    createdAt: Date;
    updatedAt: Date;
}
