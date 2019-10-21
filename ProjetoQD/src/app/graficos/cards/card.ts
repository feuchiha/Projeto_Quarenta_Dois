import { HttpClient } from "@angular/common/http";

export interface Card {

    http: HttpClient;
    filtro:any;
    endpoint:string;

    montaGrafico(data: any);
}