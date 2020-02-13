import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Entry} from "../_models/entry";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  getAllEntryByEvent(idEvent:number) {
    return this.http.get<Entry[]>(`${environment.apiUrl}/api/events/${idEvent}/entries`);
  }
  getOneEntry(idEvent:number, idEntry: number){
    return this.http.get<Entry>(`${environment.apiUrl}/api/events/${idEvent}/entries/${idEntry}`);
  }
  delete(idEvent:number, idEntry: number) {
    return this.http.delete(`${environment.apiUrl}/api/events/${idEvent}/entries/${idEntry}`);
  }
  addOneEntry(idEvent:number, event:Entry){
    return this.http.post(`${environment.apiUrl}/api/events/${idEvent}/entries/`,event);
  }
}
