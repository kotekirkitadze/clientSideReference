import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { PersonalDataService } from "src/app/services/personalData.service";
import { ClientResolved } from "../../models/client-model";


@Injectable({
  providedIn: "root"
})
export class ClientResolver implements Resolve<ClientResolved>{
  constructor(private personalDataService: PersonalDataService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<ClientResolved> {

    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Client id was not a number: ${id}`
      console.error(message);
      return of(({ client: null, error: message }))
    }
    return this.personalDataService.getClient(+id)
      .pipe(
        map(client => ({ client: client })),
        tap(data => console.log('in resolver fucntion', data)),
        catchError(err => {
          const errorMessage = `Retrieval error ${err}`;
          console.error(errorMessage);
          return of({ client: null, error: errorMessage })
        })
      )
  }
}
