import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AccountNumber } from 'src/app/models/account-model';
import { AccountNumberService } from 'src/app/services/account-number.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalDataService } from 'src/app/services/personalData.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  constructor(private personalDataService: PersonalDataService,
    private activatedRoute: ActivatedRoute,
    private accountNumberService: AccountNumberService,
    private loadingService: LoadingService,
    private route: Router) { }

  activeRoute = +this.activatedRoute.snapshot.paramMap.get('id');
  forUpdateAccountData: any;

  fetch() {
    return this.personalDataService.getClient(
      this.activeRoute
    ).pipe(
      finalize(() => this.loadingService.stop()),
      tap(data => {
        console.log(data.accData),
          this.forUpdateAccountData = data.accData
      })
    )
  }

  clientWithAccountData$ = this.fetch()


  ngOnInit(): void {

  }

  deleteSelectedAccount(accountNumber) {
    let forUpdate: AccountNumber = {
      id: this.activeRoute,
      clientAccData: this.forUpdateAccountData.filter(d => d.accountNumber != accountNumber)
    }
    this.accountNumberService.deleteSelectedAccount(forUpdate).subscribe(
      d => {
        this.clientWithAccountData$ = this.fetch()
      }
    )
  }

}
