import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { valMessageForName } from '../validationMessages';
import { debounceTime } from 'rxjs/operators';
import { PersonalDataService } from 'src/app/services/personalData.service';

import { Client } from '../../../models/client-model';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
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

    const nameControl =
      this.clientForm.get('name');
    nameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.setMessageForName(nameControl)
      );
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

    this.personalDataService
      .addClient(forPosting)
      .subscribe((d) => {
        console.log('posted executed: ', d),
          this.router.navigate(['/edit/account']);
      });
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
