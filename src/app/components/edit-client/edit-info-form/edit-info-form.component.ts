import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { valMessageForName } from '../validationMessages'
import { debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css']
})
export class EditInfoFormComponent implements OnInit {
  clientForm: FormGroup;
  nameErrorMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clinetNumber: '',
      name: ['', [Validators.minLength(2),
      Validators.maxLength(50),
      Validators.required,
      Validators.pattern(/^([a-zA-Z]+|[\u10D0-\u10F0]+)$/),
      Validators.pattern('([a-zA-Z]+|[\\u10D0-\\u10F0]+)')]],
      lastName: ['', [Validators.minLength(2),
      Validators.maxLength(50),
      Validators.required,
      Validators.pattern(/^([a-zA-Z]+|[\u10D0-\u10F0]+)$/),
      Validators.pattern('([a-zA-Z]+|[\\u10D0-\\u10F0]+)')]],
      personalNumber: ['', [Validators.required,
      Validators.minLength(11),
      Validators.pattern("^[0-9]*$")]],
      phoneNumber: ['', [Validators.pattern("^[0-9]*$"),
      Validators.required, startWithFiveValidator]],
      sex: '',
      legalAddressGroup: this.buildAddress(),
      livingAddressGroup: this.buildAddress()
    })

    const nameControl = this.clientForm.get('name');
    nameControl.valueChanges
      .pipe(
        debounceTime(500)
      ).subscribe(value =>
        this.setMessageForName(nameControl))

  }

  setMessageForName(c: AbstractControl) {
    this.nameErrorMessage = '';
    if ((c.touched || c.dirty) && !c.valid) {
      this.nameErrorMessage = Object.keys(c.errors).map(
        key => valMessageForName[key]
      ).join(' ')
    }
  }
  showFormModel() {
    console.log(this.clientForm.get("name"))
  }

  buildAddress() {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    })
  }
}


function startWithFiveValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value.charAt(0) !== '5') {
    return { 'notStartWithFive': true }
  }
  return null
}

