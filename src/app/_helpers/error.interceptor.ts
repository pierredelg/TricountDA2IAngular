import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Requete recue : ");
        console.log("url = " + request.url);
        if(request.body) {
          console.log("body = " + request.body.toString());
        }
        return next.handle(request).pipe(catchError(err => {

          //On réceptionne les reponses du serveur
          //Si la réponse est 401 on déconnecte l'utilisateur
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload();
            }
            if (err.status === 400) {

                console.log("erreur dans le body = " + err.error);

            }

            const error = err.error || err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
