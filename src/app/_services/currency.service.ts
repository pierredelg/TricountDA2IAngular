import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Currency} from "../_models/currency";

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Currency[]>(`${environment.apiUrl}/api/currencies`);
    }
}
