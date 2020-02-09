import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {EventService} from "../_services/event.service";

class A {
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<any> = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadAllEventForUser();
  }

  private deleteEvent(id: any) {
    this.eventService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllEventForUser());
  }

  private loadAllEventForUser() {
    let id : number = Number(localStorage.getItem('userId'));
    this.eventService.getAllForUser(id)
      .pipe(first())
      .subscribe(events => {
        this.events = events;
      });
  }

  getEvent(id: any) {

  }

  addEvent() {

  }
}
