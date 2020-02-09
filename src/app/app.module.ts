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
import { EventFormComponent } from './event-form/event-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { EntriesListComponent } from './entries-list/entries-list.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    appRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
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
,
    EventFormComponent ,
    EntriesListComponent ,
    BalanceComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
