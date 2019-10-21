import { HttpHeaders } from "@angular/common/http";
import { Card } from "./card";

export class RequisitonService {

    constructor() { }

    static montaGrafico(card: Card) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');

        card.http.post(`http://localhost:3002/index/${card.endpoint}`,
            JSON.stringify(card.filtro), {
            headers: headers
        }).subscribe(card.montaGrafico.bind(card));
    }
}