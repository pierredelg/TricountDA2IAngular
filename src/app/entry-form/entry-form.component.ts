import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {Currency} from "../_models/currency";
import {first} from "rxjs/operators";
import {CurrencyService} from "../_services/currency.service";
import {Participant} from "../_models/participant";
import {ParticipantService} from "../_services/participant.service";
import {Entry} from "../_models/entry";
import {EventService} from "../_services/event.service";
import {EntryService} from "../_services/entry.service";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  entryForm: FormGroup;
  userId: string;
  currencies: Currency[];
  date:Date = new Date();
  participants : Participant[];
  eventId: number;


  constructor(private currencyService : CurrencyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private participantService:ParticipantService,
              private eventService:EventService,
              private entryService:EntryService) {
    this.userId = localStorage.getItem('userId');

  }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      devise:  ['', [Validators.required]],
      date:  ['', [Validators.required]],
      payePar:   ['', [Validators.required]],
    });
    this.eventId = parseInt(sessionStorage.getItem("idEvent"));
    this.participantService.getAllParticipantByEvent(this.eventId).subscribe(
      value => {
        this.participants = value;
        for(let particip of this.participants){
          this.entryForm.addControl(particip.surnom, new FormControl())
        }
      }
    );
    this.loadAllCurrencies();
  }

  get f() { return this.entryForm.controls; }

  public errorHandling = (control: string, error: string) => {
    return this.entryForm.controls[control].hasError(error);
  };

  private loadAllCurrencies() {
    this.currencyService.getAll()
      .pipe(first())
      .subscribe(currencies => {
        this.currencies = currencies;
      });
  }

  addEntry() {

    this.alertService.clear();

    if(this.entryForm.invalid){
      return;
    }

    //On vérifie qu'au moins une checkBox est checkée
    let listPayePour:Participant[] = [];
    for(let p of this.participants){
      if(this.entryForm.get(p.surnom) != null && this.entryForm.get(p.surnom).value){
          listPayePour.push(p);
      }
    }
    if(listPayePour == null || listPayePour.length == 0){
      this.alertService.error("Il faut sélectionner un participant pour qui la dépense est payée.");
      return;
    }
    this.eventService.getOneEvent(this.eventId).subscribe(value => {
      let entry:Entry = new Entry();
      entry.evenement = value;
      entry.libelle = this.entryForm.get('libelle').value;
      entry.montant = this.entryForm.get('montant').value;
      entry.devise = this.entryForm.get('devise').value;
      entry.date = this.entryForm.get('date').value;
      entry.participant = this.entryForm.get('payePar').value;
      entry.typeEcriture = 'DEPENSE';
      entry.participants = listPayePour;

      this.entryService.addOneEntry(this.eventId,entry).subscribe(value1 => {
        this.alertService.success('Ecriture ajoutée', true);
        this.router.navigate(['/users/events/' + this.eventId]);
      },
        error => {
          this.alertService.error(error);
        });
    },
      error => {
        this.alertService.error(error);
      });
  }
}
