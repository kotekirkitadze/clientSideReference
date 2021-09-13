import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, tap } from "rxjs/operators";
import { AccountNumber } from "../models/account-model";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class AccountNumberService {
  private apiUrl = 'http://localhost:5000/accounts'

  constructor(private http: HttpClient,
    private loadingService: LoadingService) { }

  addAccountNumber(accountNumber: AccountNumber) {
    return this.http.post<AccountNumber>(this.apiUrl, accountNumber)
      .pipe(
        tap(() => this.loadingService.start()),
        delay(500)
      )
  }

  deleteAccount(id: number) {
    return this.http.delete<AccountNumber>(`${this.apiUrl}/${id}`)
  }

  deleteSelectedAccount(upDateValue) {
    return this.http.put<AccountNumber>(`${this.apiUrl}/${upDateValue.id}`, upDateValue)
  }

  getAccountData() {
    return this.http.get<AccountNumber[]>(this.apiUrl);
  }

  getAccountDataById(id: number) {
    return this.http.get<AccountNumber>(`${this.apiUrl}/${id}`)
    // .pipe(map(d => d.clientAccData))
  }

  accountData$ = this.http.get<AccountNumber[]>(this.apiUrl);
}
