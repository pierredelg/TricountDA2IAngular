import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../_models/user";
import {environment} from "../../environments/environment";



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${environment.apiUrl}/api/authenticate`, { username, password })
      .pipe(map(userToken => {
        // On ajoute le token de l'utilisateur
        localStorage.setItem('currentUser', JSON.stringify(userToken));
        this.currentUserSubject.next(userToken);
        return userToken;
      }));
  }

  logout() {
    // On retire le token de l'utilisateur
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    this.currentUserSubject.next(null);
  }
}
