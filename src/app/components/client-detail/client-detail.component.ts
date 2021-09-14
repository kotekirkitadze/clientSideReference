import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit, AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService) {
    this.activatedRoute.data.subscribe(
      data => this.clientWithAccountData$ = of(data['resolvedClientData']).pipe(
        finalize(() => this.loadingService.stop()),
        map(d => d.client),
        tap(data => {
          console.log("kkkk", data),
            this.forUpdateAccountData = data.accData
        })
      )
    )
  }

  activeRoute = +this.activatedRoute.snapshot.paramMap.get('id');
  forUpdateAccountData: any;

  clientWithAccountData$;

  ngOnInit(): void { }

  ngAfterViewInit() { }

}
