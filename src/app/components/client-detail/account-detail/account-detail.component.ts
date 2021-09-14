import { Component, Input, OnInit } from '@angular/core';
import { ClientAccData } from 'src/app/models/account-model';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  @Input() client: ClientAccData = null;
  @Input() id: string = null;
  constructor() { }

  ngOnInit(): void {
  }

}
