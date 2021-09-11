import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client-model";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = 'http://localhost:5000/clients'

  constructor(private http: HttpClient) {

  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client)
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`);
  }

  clients$ = this.http.get<Client[]>(this.apiUrl)
}
