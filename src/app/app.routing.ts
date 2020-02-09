import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {SingleEventComponent} from "./single-event/single-event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {EventFormComponent} from "./event-form/event-form.component";
import {EntriesListComponent} from "./entries-list/entries-list.component";
import {BalanceComponent} from "./balance/balance.component";



const routes: Routes = [
    { path: 'users/login', component: LoginComponent },
    { path: 'users/register', component: RegisterFormComponent },
    { path: 'users/:id/home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users/:id/events/new', component: EventFormComponent},
    { path: 'users/:id/events/:id', component: SingleEventComponent },
    { path: 'users/:id/events/:id/entries', component: EntriesListComponent},
    { path: 'users/:id/events/:id/balance', component: BalanceComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
