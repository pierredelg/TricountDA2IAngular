import { Component, OnInit } from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {EventService} from "../_services/event.service";
import {Balancedto} from "../_models/balancedto";
import {Currency} from "../_models/currency";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  idEvent: number;
  balanceDto : Balancedto;
  montantTotal : number;
  mapRemboursement : Map<string[],number> = new Map<[], number>();
  mapMontantDuPot : Map<string,number> = new Map<string, number>();
  devise : Currency;
  noBalance: boolean;

  constructor(private alertService: AlertService,
              private router : Router,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.idEvent = parseInt(sessionStorage.getItem("idEvent"));

    if(this.idEvent != null) {
      this.eventService.getBalanceForOneEvent(this.idEvent).subscribe(value => {
        this.noBalance = false;
        this.balanceDto = value;
        this.devise = value.devise;
        this.montantTotal = value.montantTotalPot;
        for (const [nom, valeur] of Object.entries(value.mapMontantApayerAuPot)) {
          this.mapMontantDuPot.set(nom, valeur);
        }
        for (let [noms, valeur] of Object.entries(value.mapRempboursement)) {
          noms = noms.replace('{', '');
          noms = noms.replace('}', '');
          let nom1 = noms.split('=')[0];
          let nom2 = noms.split('=')[1];
          this.mapRemboursement.set([nom1, nom2], valeur);
        }
      },error => {
          this.noBalance = true;
      });
    }
  }
}
