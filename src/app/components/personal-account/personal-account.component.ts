import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { filter, finalize, map, tap } from 'rxjs/operators';
import { AccountNumber, ClientAccData } from 'src/app/models/account-model';
import { AccountNumberService } from 'src/app/services/account-number.service';
import { LoadingService } from 'src/app/services/loading.service';

interface gg {

  accountNumber: number;
  accountType: any;
  currency: any;
  accountStatus: any;

}

@Component({
  selector: 'app-personal-account',
  templateUrl:
    './personal-account.component.html',
  styleUrls: ['./personal-account.component.css'],
})
export class PersonalAccountComponent
  implements OnInit {
  constructor(private fb: FormBuilder,
    private accountNumberService: AccountNumberService,
    private router: Router,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute) { }

  clientAccountFormGroup: FormGroup;
  activeRoute = this.activatedRoute.snapshot.paramMap.get('id');
  activeOptionParam = this.activatedRoute.snapshot.paramMap.get('accountNum');
  detectCreation = this.activatedRoute.snapshot.paramMap.get('creation');
  ngOnInit(): void {
    this.buildForm()
    if (this.detectCreation) {
      // this.buildForm()
    } else {
      this.getData().subscribe(console.log)

    }
    this.getData().subscribe(console.log)
  }

  getData() {
    return this.accountNumberService.getAccountDataById(+this.activeRoute)
      .pipe(
        map(d => d.clientAccData.filter(c => c.accountNumber == this.activeOptionParam)),
        tap(data => this.populateForm(data))
      );
  }

  populateForm(data) {
    this.clientAccountFormGroup.setControl("clientAccData", this.setExistingValue(data))
  }

  setExistingValue(val: ClientAccData[]): FormArray {
    const formArray = new FormArray([]);
    val.forEach(d => {
      formArray.push(this.fb.group({
        accountNumber: d.accountNumber,
        accountType: d.accountType,
        currency: d.currency,
        accountStatus: d.accountStatus
      }))
    })
    return formArray
  }

  buildForm(form?: any) {
    this.clientAccountFormGroup = this.fb.group({
      clientNumber: [{ value: this.activeRoute, disabled: true },
      Validators.required
      ],
      clientAccData: this.fb.array([this.buildAccountForm()])
    })
  }

  buildAccountForm(): FormGroup {
    return this.fb.group({
      accountNumber: [
        '',
        Validators.required
      ],
      accountType: ['', Validators.required],
      currency: ['', Validators.required],
      accountStatus: ['', Validators.required],
    })
  }

  AddForm() {
    this.getForm.push(this.buildAccountForm())
  }

  removeAcc(i: number) {
    this.getForm.removeAt(i)
  }
  get getForm(): FormArray | null {
    return <FormArray>this.clientAccountFormGroup.get('clientAccData')
  }

  addAccount() {
    if (this.clientAccountFormGroup.invalid) {
      console.log('form is invalid')
      return null
    }


    const formValue = this.clientAccountFormGroup?.getRawValue();
    const nestedForm = this.clientAccountFormGroup?.get('clientAccData').value

    const forPosting = {
      id: formValue?.clientNumber,
      clientAccData: nestedForm
    }

    this.accountNumberService.addAccountNumber(forPosting)
      .pipe(
        finalize(() => this.loadingService.stop())
      ).subscribe(
        data => {
          console.log('posted successfully', data),
            console.log("val", formValue),
            console.log("type of", typeof formValue),
            this.router.navigate(['/welcome'])
        }
      )
  }
}
