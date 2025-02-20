export interface AllOrderResponse {
    ok:     boolean;
    orders: Order[];
    error?: string;
}

export interface Order {
    id:            string;
    pagado:        boolean;
    pagadoAt:      Date | null;
    monto_total:   number;
    pacienteId:    string;
    transactionId: null | string;
    createdAt:     Date;
    updatedAt:     Date;
}
