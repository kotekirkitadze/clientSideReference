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
  clients$: Observable<any[]>;
  constructor(private personalDataService: PersonalDataService) { }

  ngOnInit(): void {
    this.clients$ = this.personalDataService.getAllClientsInfo();

    this.personalDataService.clientsWithAccountNum$.subscribe(
      d => console.log("mapped data: ", d)
    )

  }

  deleteClient(id: number) {
    this.personalDataService
      .deleteClient(id)
      .subscribe(() => {
        console.log(`Client with id ${id} has been deleted`);
        this.clients$ = this.personalDataService.getAllClientsInfo()
      }
      );
  }
}
