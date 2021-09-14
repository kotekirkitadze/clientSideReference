import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { LoadingService } from "src/app/services/loading.service";
import { PersonalDataService } from "src/app/services/personalData.service";

@Injectable()
export class EditInfoFacade {

  constructor(private fb: FormBuilder,
    private personalDataService: PersonalDataService,
    private router: Router,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }


  deleteClient(activatedRouteID: number) {
    return this.personalDataService
      .deleteClient(activatedRouteID)
      .pipe(
        finalize(() => {
          this.loadingService.stop(),
            console.log(`Client with id ${activatedRouteID} has been deleted`);
          this.router.navigate(['/clients'])
        })
      );
  }
}
