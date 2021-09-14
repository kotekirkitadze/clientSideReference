import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize, tap } from "rxjs/operators";
import { Client } from "src/app/models/client-model";
import { LoadingService } from "src/app/services/loading.service";
import { PersonalDataService } from "src/app/services/personalData.service";

@Injectable()
export class EditInfoFacade {

  constructor(private fb: FormBuilder,
    private personalDataService: PersonalDataService,
    private router: Router,
    private loadingService: LoadingService) { }


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

  populateForm(clientForm: FormGroup, client: Client) {
    clientForm.setValue({
      clinetNumber: client.id,
      name: client.name,
      lastName: client.lastName,
      personalNumber: client.personalNumber,
      phoneNumber: client.phoneNumber,
      sex: client.sex,
      legalAddressGroup: {
        country: client.legalAddress.country,
        city: client.legalAddress.city,
        street: client.legalAddress.streetAddress
      },
      livingAddressGroup: {
        country: client.livingAddress.country,
        city: client.livingAddress.city,
        street: client.livingAddress.streetAddress
      },
    })
  }

  buildAddress() {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }


  buildForm() {
    return this.fb.group({
      clinetNumber: '',
      name: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z]+|[\u10D0-\u10F0]+)$/
          ),
          Validators.pattern(
            '([a-zA-Z]+|[\\u10D0-\\u10F0]+)'
          ),
        ],
      ],
      lastName: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z]+|[\u10D0-\u10F0]+)$/
          ),
          Validators.pattern(
            '([a-zA-Z]+|[\\u10D0-\\u10F0]+)'
          ),
        ],
      ],
      personalNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.required,
          startWithFiveValidator,
        ],
      ],
      sex: '',
      legalAddressGroup: this.buildAddress(),
      livingAddressGroup: this.buildAddress(),
    });
  }


  initializeForm(clientForm: FormGroup, id: number) {
    return this.personalDataService.getClient(id)
      .pipe(tap((data: Client) => this.populateForm(clientForm, data)))
  }

  addClient(clientForm: FormGroup, activeRouteId: string) {
    if (clientForm.invalid) {
      console.log('invalid form');
      return null;
    }

    const formValue = clientForm?.value;
    const forPosting: Client = {
      id: formValue?.clinetNumber,
      name: formValue?.name,
      lastName: formValue?.lastName,
      personalNumber: formValue?.personalNumber,
      phoneNumber: formValue?.phoneNumber,
      sex: formValue?.sex,
      legalAddress: {
        country:
          formValue?.legalAddressGroup?.country,
        city: formValue?.legalAddressGroup?.city,
        streetAddress:
          formValue?.legalAddressGroup?.street,
      },
      livingAddress: {
        country:
          formValue?.livingAddressGroup?.country,
        city: formValue?.livingAddressGroup?.city,
        streetAddress:
          formValue?.livingAddressGroup?.street,
      },
    };

    if (activeRouteId == "0") {
      this.personalDataService
        .addClient(forPosting).pipe(
          finalize(() => this.loadingService.stop()),
        )
        .subscribe((d) => {
          console.log('posted executed: ', d),
            this.router.navigate(['/account', formValue?.clinetNumber, 'edit',
              { creation: true }]);
        });

    } else {
      console.log(forPosting)
      this.personalDataService.updateClient(forPosting)
        .subscribe(
          () => this.router.navigate(['/welcome'])
        );
    }
  }

}

function startWithFiveValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  if (c.value.charAt(0) !== '5') {
    return { notStartWithFive: true };
  }
  return null;
}
