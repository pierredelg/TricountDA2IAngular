import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";
import {UserService} from "../_services/user.service";



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
  loading = false;
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }
}
