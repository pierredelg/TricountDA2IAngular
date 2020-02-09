import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAllForUser(id:number) {
    return this.http.get<Event[]>(`${environment.apiUrl}/api/users/${id}/events`);
  }
  getOne(){
    return this.http.get<Event>(`${environment.apiUrl}/api/events/`+ 1);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/events/${id}`);
  }
}
