import { HttpClient } from "@angular/common/http";
import { RequisitonService } from "./requisition.service";

export interface Card {

    http: HttpClient;
    filtro: any;
    endpoint: string;

    montaGrafico(data: any);
}

export interface GraficoPrevisao {
    cards: Card[];
    montaGrafico(card: Card, data: any);
}


interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: Card);
}

export class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: Card) {

        RequisitonService.montaGrafico(request);

        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}