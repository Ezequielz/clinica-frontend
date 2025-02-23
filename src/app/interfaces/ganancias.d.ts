export interface GananciasResponse {
    ok: boolean;
    ganancias: Ganancias;
    error?: string;
}

export interface Ganancias {
    today: number;
    monthSelected: string;
    month: { [key: string]: number };
    totalGanancias: number;
}
