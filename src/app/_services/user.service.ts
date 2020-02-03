import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../_models/user";
import {environment} from "../../environments/environment";



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    register(user: User) {

      let userdto = {
        nom:user.name,
        email:user.email,
        motDePasse:user.password
      }

      return this.http.post(`${environment.apiUrl}/api/register`, userdto);
    }

    delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/api/users/${id}`);
    }
}
