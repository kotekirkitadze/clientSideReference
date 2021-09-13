import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AccountNumber } from 'src/app/models/account-model';
import { AccountNumberService } from 'src/app/services/account-number.service';
import { LoadingService } from 'src/app/services/loading.service';

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

  ngOnInit(): void {
    // console.log(typeof this.activatedRoute.snapshot.paramMap.get('id'));
    this.clientAccountFormGroup = this.fb.group({
      clientNumber: [{ value: this.activatedRoute.snapshot.paramMap.get('id'), disabled: true },
      Validators.required
      ],
      clientAccData: this.fb.array([this.buildAccountForm()])
    })
  }

  buildAccountForm(): FormGroup {
    return this.fb.group({
      accNumber: [
        '',
        Validators.required
      ],
      accountType: ['', Validators.required],
      currencyType: ['', Validators.required],
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
