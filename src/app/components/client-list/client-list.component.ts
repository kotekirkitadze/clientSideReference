import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalDataService } from 'src/app/services/personalData.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent
  implements OnInit {
  clients$: Observable<any[]>;
  constructor(private personalDataService: PersonalDataService,
    private loadingService: LoadingService) { }

  private reflectionSubject = new BehaviorSubject<number>(1);
  reflectionAction$ = this.reflectionSubject.asObservable();

  ngOnInit(): void {
    this.clients$ = this.reflection();

    this.personalDataService.clientsWithAccountNum$.subscribe(
      d => console.log("mapped data: ", d)
    )
  }

  reflection() {
    return combineLatest([
      this.reflectionAction$,
      this.personalDataService.getAllClientsInfo()
    ]).pipe(
      map(([d, data]) => data)
    )
  }
  deleteClient(id: number) {
    this.personalDataService
      .deleteClient(id)
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => {
        console.log(`Client with id ${id} has been deleted`);
        this.reflectionSubject.next(1)
        this.clients$ = this.reflection()
      }
      );
  }
}
