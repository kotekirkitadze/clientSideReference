import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { valMessageForName } from '../validationMessages';
import { debounceTime, finalize, tap } from 'rxjs/operators';
import { PersonalDataService } from 'src/app/services/personalData.service';

import { Client } from '../../../models/client-model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { EditInfoFacade } from './edit-info.facade';

@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css'],
})
export class EditInfoFormComponent
  implements OnInit {
  clientForm: FormGroup;
  nameErrorMessage: string;

  constructor(
    private fb: FormBuilder,
    private personalDataService: PersonalDataService,
    private router: Router,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private facade: EditInfoFacade

  ) { }

  activeRouteId;

  ngOnInit(): void {

    this.activatedRoute.paramMap
      .subscribe(params => {
        this.activeRouteId = params.get('id'),
          console.log("hey");
        if (+this.activeRouteId == 0) {
          this.buildForm();
        } else {
          this.initializeForm(+this.activeRouteId).subscribe(() => {
            this.loadingService.stop()
          })
        }
      })




    const nameControl =
      this.clientForm.get('name');
    nameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.setMessageForName(nameControl)
      );
  }

  initializeForm(id: number) {
    this.buildForm();
    return this.personalDataService.getClient(id)
      .pipe(tap((data: Client) => this.populateForm(data)))
  }

  deleteClient() {
    this.personalDataService
      .deleteClient(this.activeRouteId)
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => {
        console.log(`Client with id ${this.activeRouteId} has been deleted`);
        this.router.navigate(['/clients'])
      }
      );
  }
  populateForm(client: Client) {
    this.clientForm.setValue({
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

  buildForm() {
    return this.clientForm = this.fb.group({
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

  addClient() {
    if (this.clientForm.invalid) {
      console.log('invalid form');
      return null;
    }

    const formValue = this.clientForm?.value;
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

    if (this.activeRouteId == "0") {
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

  setMessageForName(c: AbstractControl) {
    this.nameErrorMessage = '';
    if ((c.touched || c.dirty) && !c.valid) {
      this.nameErrorMessage = Object.keys(
        c.errors
      )
        .map((key) => valMessageForName[key])
        .join(' ');
    }
  }
  showFormModel() {
    console.log(this.clientForm.get('name'));
  }

  buildAddress() {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
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
