import { HttpClient } from "@angular/common/http";

export interface Card {

    http: HttpClient;
    filtro:any;
    endpoint:string;

    montaGrafico(data: any);
}

export interface GraficoPrevisao {
    cards: Card[];
    montaGrafico(card: Card, data: any);
}