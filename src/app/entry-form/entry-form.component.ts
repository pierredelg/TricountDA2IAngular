import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {Currency} from "../_models/currency";
import {first} from "rxjs/operators";
import {CurrencyService} from "../_services/currency.service";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  entryForm: FormGroup;
  userId: string;
  currencies: Currency[];
  date:Date;


  constructor(private currencyService : CurrencyService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService) {
    this.userId = localStorage.getItem('userId');

  }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      libelle: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      devise:  ['', [Validators.required]],
      date:   ['', [Validators.required]],
    });
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

  }
}
