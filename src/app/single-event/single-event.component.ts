import { Component, OnInit } from '@angular/core';
import {EventService} from "../_services/event.service";
import {AlertService} from "../_services/alert.service";
import {Event} from "../_models/event";
import {Participant} from "../_models/participant";
import {ParticipantService} from "../_services/participant.service";


@Component({
  selector: 'app-event-by-id',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {

  evenement: Event;
  participants : Participant[];

  constructor(private eventService : EventService, private alertService:AlertService, private participantService:ParticipantService) {
    let idEvent = parseInt(sessionStorage.getItem("idEvent"));
    this.eventService.getOneEvent(idEvent).subscribe(
      data => {
        this.evenement = data;
        this.participantService.getParticipantByEvent(this.evenement.idEvenement).subscribe(
          value => {
            this.participants = value;
          }
        );
      },
      error => {
        this.alertService.error(error);
      });
  }

  ngOnInit() {
  }

}
