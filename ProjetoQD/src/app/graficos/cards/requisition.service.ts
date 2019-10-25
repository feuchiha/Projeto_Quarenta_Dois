import { HttpHeaders } from "@angular/common/http";
import { Card } from "./card";

export class RequisitonService {

    constructor() { }

    static montaGrafico(card: Card) {
        const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        console.log(card.endpoint[0])
            console.log(card.filtro)
        //card.endpoint.forEach(endpoint => {
            card.http.post(`http://localhost:3002/index/${card.endpoint[0]}`,
                JSON.stringify(card.filtro), {
                headers: headers
            }).subscribe(card.montaGrafico.bind(card))
        //});
    }
}