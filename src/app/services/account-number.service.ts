import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountNumber } from "../models/account-model";

@Injectable({
  providedIn: 'root'
})
export class AccountNumberService {
  private apiUrl = 'http://localhost:5000/accounts'

  constructor(private http: HttpClient) { }

  addAccountNumber(accountNumber: AccountNumber) {
    return this.http.post<AccountNumber>(this.apiUrl, accountNumber)
  }

  deleteAccount(id: number) {
    return this.http.delete<AccountNumber>(`${this.apiUrl}/${id}`)
  }

  accountData$ = this.http.get<AccountNumber[]>(this.apiUrl);
}
