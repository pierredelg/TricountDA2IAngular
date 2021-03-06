import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Event} from "../_models/event";
import {Balancedto} from "../_models/balancedto";

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAllEventByUser(id:number) {
    return this.http.get<Event[]>(`${environment.apiUrl}/api/users/${id}/events`);
  }
  getOneEvent(id: number){
    return this.http.get<Event>(`${environment.apiUrl}/api/events/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/events/${id}`);
  }
  addOneEvent(event:Event){
    return this.http.post(`${environment.apiUrl}/api/events/`,event);
  }
  getBalanceForOneEvent(id: number){
    return this.http.get<Balancedto>(`${environment.apiUrl}/api/events/${id}/balance`);
  }
}
