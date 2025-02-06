export interface InfoResponse {
    ok:   boolean;
    info: Info;
}

export interface Info {
    serviciosMedicos: number;
    pacientes:        number;
    medicos:          number;
    paquetes:         number;
}
