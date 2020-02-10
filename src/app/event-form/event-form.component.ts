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

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  currencies: Array<Currency> = [];
  userId: string;
  participants: Array<string> = [];
  addEventForm: FormGroup;
  participantInput: string;

  constructor(private currencyService : CurrencyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private eventService : EventService
  )
  {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.addEventForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get f() { return this.addEventForm.controls; }


  private loadAllCurrencies() {
    this.currencyService.getAll()
      .pipe(first())
      .subscribe(currencies => {
        this.currencies = currencies;
      });
  }

  addParticipant(participant: string) {
    this.alertService.clear();
    this.participants.push(participant);
    this.participantInput = '';
  }

  removeParticipant(participant: string) {
    const index: number = this.participants.indexOf(participant);
    if (index !== -1) {
      this.participants.splice(index, 1);
    }
  }

  addEvent() {

    if(this.participants.length < 2){
      this.alertService.error("Il faut au minimum deux participants",false);
      return;
    }

    if (this.addEventForm.invalid) {
      console.log("ERREUR FORMULAIRE EVENT");
      return;
    }
    let event = new Event();
    event.titre = this.addEventForm.get('titre').value;
    event.description = this.addEventForm.get('description').value;
    event.participants = [];

    for (let nom of this.participants){
      let participant = new Participant();
      participant.surnom = nom;
      event.participants.push(participant);
    }
    console.log('eveneemnt avant envoie = ' + event);
    this.eventService.addOneEvent(event)
      .subscribe(
      data => {
        this.alertService.success('Evenement ajouté', true);
        let userId = localStorage.getItem('userId');
        this.router.navigate(['/users/' + userId + '/home']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.addEventForm.controls[control].hasError(error);
  }

}
