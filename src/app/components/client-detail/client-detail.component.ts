import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PersonalDataService } from 'src/app/services/personalData.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  constructor(private personalDataService: PersonalDataService,
    private activatedRoute: ActivatedRoute) { }


  clientWithAccountData$ = this.personalDataService.getClient(
    +this.activatedRoute.snapshot.paramMap.get('id')
  ).pipe(
    tap(console.log)
  )

  ngOnInit(): void {

  }

}
