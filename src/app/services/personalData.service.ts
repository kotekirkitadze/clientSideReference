import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, Observable, of } from "rxjs";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { Client } from "../models/client-model";
import { AccountNumberService } from "./account-number.service";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = 'http://localhost:5000/clients'

  constructor(private http: HttpClient,
    private accountNumberService: AccountNumberService) {

  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client)
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`)
      .pipe(switchMap(d => this.accountNumberService.deleteAccount(id)));
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`)
      .pipe(
        switchMap(client => {
          return this.accountNumberService.getAccountData().pipe(
            map(accountData => {
              return {
                ...client,
                accData: accountData.filter(acc => acc.id == client.id).map(d => d.clientAccData)[0]
              }
            })
          )
        })
      )
  }

  clients$ = this.http.get<Client[]>(this.apiUrl)


  getAllClientsInfo() {
    return combineLatest([
      this.clients$,
      this.accountNumberService.accountData$
    ]).pipe(
      map(([clients, accounts]) => {
        return clients.map(client => {
          return {
            ...client,
            accData: accounts.filter(acc => acc.id == client.id).map(d => d.clientAccData)[0]
          }
        })
      })
    )
  }

  clientsWithAccountNum$ = combineLatest([
    this.clients$,
    this.accountNumberService.accountData$
  ]).pipe(
    map(([clients, accounts]) => {
      return clients.map(client => {
        return {
          ...client,
          accData: accounts.filter(acc => acc.id == client.id).map(d => d.clientAccData)
        }
      })
    })
  )

}





