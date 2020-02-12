import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {EventService} from "../_services/event.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";

class A {
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any> = [];
  userId: string;

  constructor(private eventService: EventService,
              private alertService: AlertService,
              private router : Router) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.loadAllEventForUser();
  }

  private deleteEvent(id: any) {
    this.eventService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllEventForUser();
          this.alertService.success('Evenement supprimé', true);
          let userId = localStorage.getItem('userId');
          this.router.navigate(['/users/' + userId + '/home']);
        },
        error => {
          this.alertService.error(error);
          let userId = localStorage.getItem('userId');
          this.router.navigate(['/users/' + userId + '/home']);
        });
  }

  private loadAllEventForUser() {
    let id : number = Number(localStorage.getItem('userId'));
    this.eventService.getAllEventByUser(id)
      .pipe(first())
      .subscribe(events => {
        this.events = events;
      });
  }

  getOneEvent(id: any) {
    this.eventService.getOneEvent(id).subscribe(
      data => {
        let idEvenement = data.idEvenement;
        let userId = localStorage.getItem('userId');
        this.router.navigate(['/users/' + userId + '/events/'+ idEvenement]);
      },
      error => {
        this.alertService.error(error);
        let userId = localStorage.getItem('userId');
        this.router.navigate(['/users/' + userId + '/home']);
      });
  }
}
