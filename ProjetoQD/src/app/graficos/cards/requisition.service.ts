import { HttpHeaders } from "@angular/common/http";
import { Card, GraficoPrevisao } from "./card";

export class RequisitonService {

    constructor() { }

    static montaGrafico(card: Card, ...cardPrevisao: GraficoPrevisao[]) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        var passFor;
        if (typeof cardPrevisao !== 'undefined' && cardPrevisao.length > 0) {
            passFor = cardPrevisao[0];
        } else {
            passFor = card;
        }
        card.http.post(`http://localhost:3002/index/${card.endpoint}`,
            JSON.stringify(card.filtro), {
            headers: headers
        }).subscribe(card.montaGrafico.bind(passFor, card))

    }

    static montaGraficoPrevi(graficoPrevi: GraficoPrevisao) {
        graficoPrevi.cards.forEach(card => {
            this.montaGrafico(card, graficoPrevi);
        });
    }
}