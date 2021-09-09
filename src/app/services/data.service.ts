import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbUrl = 'http://localhost:5000/Task'

  constructor(private http: HttpClient) {

  }

  data$ = this.http.get(`${this.dbUrl}`)
}
