import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, Observable, of } from "rxjs";
import { delay, filter, map, shareReplay, switchMap, tap } from "rxjs/operators";
import { Client } from "../models/client-model";
import { AccountNumberService } from "./account-number.service";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = 'http://localhost:5000/clients'

  constructor(private http: HttpClient,
    private accountNumberService: AccountNumberService,
    private loadingService: LoadingService) {

  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client).pipe(
      tap(() => this.loadingService.start()),
      delay(500)
    )
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.loadingService.start()),
        switchMap(d => this.accountNumberService.deleteAccount(id)),
        delay(300)
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`)
      .pipe(
        // tap(() => this.loadingService.start()),
        switchMap(client => {
          return this.accountNumberService.getAccountDataById(client.id).pipe(
            map(accountData => {
              return {
                ...client,
                accData: accountData.clientAccData
              }
            })
          )
        }),
        delay(2000),
        tap(console.log)
      )
  }

  clients$ = this.http.get<Client[]>(this.apiUrl)
  // accountData.filter(acc => acc.id == client.id).map(d => d.clientAccData)

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


  updateClient(updatedValue: Client) {
    return this.http.put<Client>(`${this.apiUrl}/${+updatedValue.id}`, updatedValue);
  }
}





