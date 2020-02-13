import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {EntryService} from "../_services/entry.service";
import {Entry} from "../_models/entry";

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {
  entries: Array<Entry> = [];
  userId: string;
  idEvent : number;

  constructor(private entryService: EntryService,
              private alertService: AlertService,
              private router : Router) {
    this.userId = localStorage.getItem('userId');
    // this.idEvent = parseInt(sessionStorage.getItem("idEvent"));
    // console.log("id event from constructor = " + this.idEvent);
  }

  ngOnInit() {
    this.idEvent = parseInt(sessionStorage.getItem("idEvent"));
    console.log("idevent from init = " + this.idEvent);
    this.loadAllEntriesForUser();
  }

  private deleteEntry(idEntry: number) {
    this.entryService.delete(this.idEvent,idEntry)
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllEntriesForUser();
          this.alertService.success('Dépense supprimé', true);
          this.router.navigate(['/users/home']);
        },
        error => {
          this.alertService.error(error);
          this.router.navigate(['/users/home']);
        });
  }

  private loadAllEntriesForUser() {
    this.entryService.getAllEntryByEvent(this.idEvent)
      .pipe(first())
      .subscribe(entries => {
        this.entries = entries;
      });
  }

  getOneEntry(idEntry: number) {
    this.entryService.getOneEntry(this.idEvent,idEntry).subscribe(
      data => {
        let evenement = data.evenement;
        let idEvenement = evenement.idEvenement;
        let idEcriture = data.idEcriture;
        this.router.navigate(['/users/events/'+ idEvenement + '/entries/'+ idEcriture]);

      },
      error => {
        this.alertService.error(error);
        this.router.navigate(['/users/home']);
      });
  }

}
