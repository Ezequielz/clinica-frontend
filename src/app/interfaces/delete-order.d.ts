export interface DeleteOrderResponse {
    ok:    boolean;
    order: Order;
    error?: string;
}

interface Order {
    id:            string;
    pagado:        boolean;
    pagadoAt:      null;
    monto_total:   number;
    pacienteId:    string;
    transactionId: null;
    createdAt:     Date;
    updatedAt:     Date;
}
