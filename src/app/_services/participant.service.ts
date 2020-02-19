import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../_models/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  getParticipantByEvent(idEvent:number){
    return this.http.get<Participant[]>(`${environment.apiUrl}/api/events/${idEvent}/participants`);
  }
  getParticipantByUserId(idUser:number){
    return this.http.get<Participant>(`${environment.apiUrl}/api/users/${idUser}/participant`);
  }
}
