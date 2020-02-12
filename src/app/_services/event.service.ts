import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Event} from "../_models/event";

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAllEventByUser(id:number) {
    return this.http.get<Event[]>(`${environment.apiUrl}/api/users/${id}/events`);
  }
  getOneEvent(id: any){
    return this.http.get<Event>(`${environment.apiUrl}/api/events/`+ id);
  }
  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/api/events/${id}`);
  }
  addOneEvent(event:Event){
    return this.http.post(`${environment.apiUrl}/api/events/`,event);
  }
}
