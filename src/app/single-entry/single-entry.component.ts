import { Component, OnInit } from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {ParticipantService} from "../_services/participant.service";
import {EntryService} from "../_services/entry.service";
import {Entry} from "../_models/entry";
import {Participant} from "../_models/participant";

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['./single-entry.component.css']
})
export class SingleEntryComponent implements OnInit {

  eventId:number;
  entryId:number;
  entry:Entry;
  participants: Participant[];
  equilibre:string;
  constructor(private alertService:AlertService,
              private participantService:ParticipantService,
              private entryService:EntryService) {
    this.eventId = parseInt(sessionStorage.getItem("idEvent"));
    this.entryId = parseInt(sessionStorage.getItem('entryId'));
    this.entryService.getOneEntry(this.eventId,this.entryId).subscribe(value =>
    {
      this.entry = value;
      this.participantService.getAllParticipantByEntry(this.entry.idEcriture).subscribe(value1 => {
        this.participants = value1;
        this.equilibre = (this.entry.montant / this.participants.length).toFixed(2);
      });
    });
  }

  ngOnInit() {
  }

}
