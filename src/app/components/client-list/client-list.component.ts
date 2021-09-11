import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client-model';
import { PersonalDataService } from 'src/app/services/personalData.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent
  implements OnInit {
  clients$: Observable<Client[]>;
  constructor(private personalDataService: PersonalDataService) { }

  ngOnInit(): void {
    this.clients$ = this.personalDataService.clients$;
  }

  deleteClient(id: number) {
    this.personalDataService
      .deleteClient(id)
      .subscribe(() =>
        console.log(
          `Client with id ${id} has been deleted`
        )
      );
  }
}
