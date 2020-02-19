import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {AdvancedValidators} from "ng-validator";



@Component({ templateUrl: 'register-form.component.html' })
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // On redirige vers l'accueil si l'utilisateur est authentifié
    if (this.authenticationService.currentUserValue) {
      let userId = localStorage.getItem('userId');
      this.router.navigate(['/users/'+ userId +'/home']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, AdvancedValidators.equalsToField('password')]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Enregistrement effectué', true);
          this.router.navigate(['users/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
