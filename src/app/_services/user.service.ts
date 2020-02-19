import { Injectable } from '@angular/core';
import {User} from "../_models/user";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,private router: Router) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    register(user: User) {

      let userdto = {
        nom:user.name,
        email:user.email,
        motDePasse:user.password,
        participant: {surnom: user.nickname}
      };

      return this.http.post(`${environment.apiUrl}/api/register`, userdto);
    }

    delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/api/users/${id}`);
    }

    storeUserId(username: string){
      //On requete l'api afin de récupérer les infos du user
       return this.http.post<any>(`${environment.apiUrl}/api/users/email`,username)
         .subscribe( (val) => {
           let idUtilisateur = val.idUtilisateur;

           //On ajoute l'id de l'utilisateur au local storage
           localStorage.setItem('userId', String(idUtilisateur));

           console.log('id utilisateur = ' + idUtilisateur);

           //On affiche la page home de l'utilisateur
           this.router.navigate(['users/'+ idUtilisateur +'/home']);
         });
    }
}
