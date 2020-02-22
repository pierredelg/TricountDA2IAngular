import { Component, OnInit } from '@angular/core';
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {EventService} from "../_services/event.service";
import {Balancedto} from "../_models/balancedto";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  idEvent: number;
  balanceDto : Balancedto;

  constructor(private alertService: AlertService,
              private router : Router,
              private eventService: EventService) {

  }

  ngOnInit() {
    this.idEvent = parseInt(sessionStorage.getItem("idEvent"));
    this.eventService.getBalanceForOneEvent(this.idEvent).subscribe(value => {
        this.balanceDto  = value;
    });
  }

}
