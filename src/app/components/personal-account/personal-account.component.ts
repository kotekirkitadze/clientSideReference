import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountNumber } from 'src/app/models/account-model';
import { AccountNumberService } from 'src/app/services/account-number.service';

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
    private router: Router) { }

  clientAccountForm;

  ngOnInit(): void {
    this.clientAccountForm = this.fb.array([this.buildAccountForm()])
  }

  buildAccountForm(): FormGroup {
    return this.fb.group({
      accNumber: [
        '',
        Validators.required
      ],
      clientNumber: [
        '',
        Validators.required
      ],
      accountType: ['', Validators.required],
      currencyType: ['', Validators.required],
      accountStatus: ['', Validators.required],
    })
  }

  addAccount() {
    if (this.clientAccountForm.invalid) {
      console.log('form is invalid')
      return null
    }

    const formValue = this.clientAccountForm?.value;

    const forPosting: AccountNumber = {
      accountNumber: formValue?.accountNumber,
      accountStatus: formValue?.accountStatus,
      accountType: formValue?.accountType,
      currency: formValue?.currency,
      clientNumber: formValue?.clientNumber
    }

    this.accountNumberService.addAccountNumber(forPosting).subscribe(
      data => {
        console.log('posted successfully', data),
          this.router.navigate(['/welcome'])
      }
    )
  }
}
