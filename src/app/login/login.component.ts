import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first, map} from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication.service";
import {AlertService} from "../_services/alert.service";
import {User} from "../_models/user";
import {JsonPipe} from "@angular/common";
import {environment} from "../../environments/environment";
import {UserService} from "../_services/user.service";



@Component({ templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      console.log("Retour à l'url /home")
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // get return url from route parameters or default to '/home'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  //Raccourci pour acceder aux champs du formulaire
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //Une fois que l'utilisateur est authentifier on récupere son id et on passe à la page home de l'utilisateur
          this.userService.storeUserId(this.f.username.value);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
}
