import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../_services/authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //On récupere les requetes du client et on vérifie que l'utilisateur est connecté
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      //on ajoute le token récupéré à l'authentification dans le header
      console.log("requete = " + request.responseType);
      console.log("On ajoute le token : " + `Bearer ${currentUser.token}`);
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${currentUser.token}`,
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    return next.handle(request);
  }
}
