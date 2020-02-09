import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {CurrencyService} from "../_services/currency.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  currencies: Array<any> = [];

  constructor(private currencyService : CurrencyService) { }

  ngOnInit() {
    this.loadAllCurrencies();
  }

  private loadAllCurrencies() {
    this.currencyService.getAll()
      .pipe(first())
      .subscribe(currencies => {
        this.currencies = currencies;
      });
  }

  addParticipant() {

  }
}
