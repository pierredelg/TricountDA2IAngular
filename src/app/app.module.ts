import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {appRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {FooterComponent} from "./footer/footer.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ImageLogoComponent} from "./image-logo/image-logo.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {AlertComponent} from "./alert/alert.component";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {EventListComponent} from "./event-list/event-list.component";
import {MatListModule} from '@angular/material/list';
import { SingleEventComponent } from './single-event/single-event.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    appRoutingModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    NavBarComponent,
    ImageLogoComponent,
    RegisterFormComponent,
    AlertComponent,
    EventListComponent,
    SingleEventComponent
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
