import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import {EntryService} from "../_services/entry.service";

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent implements OnInit {
  entries: Array<any> = [];
  userId: string;

  constructor(private entryService: EntryService,
              private alertService: AlertService,
              private router : Router) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.loadAllEntriesForUser();
  }

  private deleteEntry(id: any) {
    this.entryService.delete(id)
      .pipe(first())
      .subscribe(
        data => {
          this.loadAllEntriesForUser();
          this.alertService.success('Dépense supprimé', true);
          let userId = localStorage.getItem('userId');
          this.router.navigate(['/users/' + userId + '/home']);
        },
        error => {
          this.alertService.error(error);
          let userId = localStorage.getItem('userId');
          this.router.navigate(['/users/' + userId + '/home']);
        });
  }

  private loadAllEntriesForUser() {
    let id : number = Number(localStorage.getItem('userId'));
    this.entryService.getAllEntryByEvent(id)
      .pipe(first())
      .subscribe(entries => {
        this.entries = entries;
      });
  }

  getOneEntry(id: any) {
    this.entryService.getOneEntry(id).subscribe(
      data => {
        let evenement = data.evenement;
        let idEvenement = evenement.idEvenement;
        let idEcriture = data.idEcriture;
        let userId = localStorage.getItem('userId');
        this.router.navigate(['/users/' + userId + '/events/'+ idEvenement + '/entries/'+ idEcriture]);

      },
      error => {
        this.alertService.error(error);
        let userId = localStorage.getItem('userId');
        this.router.navigate(['/users/' + userId + '/home']);
      });
  }

}
