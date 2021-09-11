import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients$: Observable<Client[]>
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.clients$ = this.dataService.clients$
  }

  deleteClient(id: number) {
    this.dataService.deleteClient(id)
      .subscribe(() => console.log(`Client with id ${id} has been deleted`))
  }

}
