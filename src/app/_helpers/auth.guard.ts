import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      //On vérifie si l'utilisateur s'est deja authentifé
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            return true;
        }
        //S'il ne l'est pas on le redirige vers la page de login
        this.router.navigate(['users/login']);
        return false;
    }
}
