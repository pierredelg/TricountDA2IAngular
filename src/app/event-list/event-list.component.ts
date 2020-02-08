import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {EventService} from "../_services/event.service";
import {Event} from "../_models/event";

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
    this.loadAllEvent();
  }

  private deleteEvent(id: any) {
    this.eventService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllEvent());
  }

  private loadAllEvent() {
    this.eventService.getAll()
      .pipe(first())
      .subscribe(events => {
        this.events = events;
      });
  }

  getEvent(id: any) {

  }
}
