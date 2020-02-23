import {Component, Input, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {CurrencyService} from "../_services/currency.service";
import {Currency} from "../_models/currency";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {Event} from "../_models/event";
import {Participant} from "../_models/participant";
import {EventService} from "../_services/event.service";
import {ParticipantService} from "../_services/participant.service";
import {error} from "util";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  userId: string;
  participants: Array<string> = [];
  addEventForm: FormGroup;
  participantInput: string;
  currentParticipant: Participant;

  constructor(private currencyService : CurrencyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private eventService : EventService,
              private participantService : ParticipantService,
  )
  {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.addEventForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.participantService.getParticipantByUserId(Number(this.userId)).subscribe(value => {
      this.currentParticipant = value;
      this.participants.push(this.currentParticipant.surnom);
    });

    }

  get f() { return this.addEventForm.controls; }

  addParticipant(participant: string) {
    if(participant != undefined && participant.length > 0) {
      if(this.participants.indexOf(participant)) {
        this.alertService.clear();
        this.participants.push(participant);
        this.participantInput = '';
      }else{
        this.alertService.error("Le nom des participants doivent être différents",false);
      }
    }
  }

  removeParticipant(participant: string) {
    if(participant != this.currentParticipant.surnom) {
      const index: number = this.participants.indexOf(participant);
      if (index !== -1) {
        this.participants.splice(index, 1);
      }
    }else{
      this.alertService.error("Vous participez automatiquement à vos événements",false);
    }
  }

  addEvent() {

    if(this.participants.length < 2){
      this.alertService.error("Il faut au minimum deux participants",false);
      return;
    }

    if (this.addEventForm.invalid) {
      return;
    }
    let event = new Event();
    event.titre = this.addEventForm.get('titre').value;
    event.description = this.addEventForm.get('description').value;
    event.participants = [];

    event.participants.push(this.currentParticipant);

    //On recupere le participant qui crée l'événement
    for (let nom of this.participants){
      if(nom != this.currentParticipant.surnom){
        let participant = new Participant();
        participant.surnom = nom;
        event.participants.push(participant);
      }
    }

    this.eventService.addOneEvent(event)
      .subscribe(
        data => {
          this.alertService.success('Evenement ajouté', true);
          this.router.navigate(['/users/home/']);
        },
        error => {
          this.alertService.error(error);
        });
  }

  public errorHandling = (control: string, error: string) => {
    return this.addEventForm.controls[control].hasError(error);
  }

}
