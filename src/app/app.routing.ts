import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {SingleEventComponent} from "./single-event/single-event.component";
import {EventFormComponent} from "./event-form/event-form.component";
import {EntriesListComponent} from "./entries-list/entries-list.component";
import {BalanceComponent} from "./balance/balance.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {SingleEntryComponent} from "./single-entry/single-entry.component";


const routes: Routes = [
    { path: 'users/login', component: LoginComponent },
    { path: 'users/register', component: RegisterFormComponent },
    { path: 'users/home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users/entries/new', component: EntryFormComponent},
    { path: 'users/events/new', component: EventFormComponent},
    { path: 'users/events/:idEvent', component: SingleEventComponent },
    { path: 'users/events/:idEvent/entries', component: EntriesListComponent},
    { path: 'users/events/:idEvent/balance', component: BalanceComponent},
    { path: 'users/events/:idEvent/entries/:idEntry', component: SingleEntryComponent},

    { path: '**', redirectTo: 'users/home' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
