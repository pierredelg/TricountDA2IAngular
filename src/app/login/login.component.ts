import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication.service";
import {AlertService} from "../_services/alert.service";
import {UserService} from "../_services/user.service";



@Component({ templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      let userId = localStorage.getItem('userId');
      this.router.navigate(['/users/'+ userId +'/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //Une fois que l'utilisateur est authentifié on récupere son id et on passe à la page home de l'utilisateur
          this.userService.storeUserId(this.f.username.value);
        },
        error => {
          error = "Utilisateur inconnu";
          this.alertService.error(error);
          this.loading = false;
          this.router.navigate(['/users/login']);
        });

  }
}
