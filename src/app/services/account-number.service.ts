import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
}
