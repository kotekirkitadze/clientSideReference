import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { finalize, map, tap } from "rxjs/operators";
import { ClientAccData } from "src/app/models/account-model";
import { AccountNumberService } from "src/app/services/account-number.service";
import { LoadingService } from "src/app/services/loading.service";

@Injectable()
export class PersonalAccountFacade {
  constructor(private fb: FormBuilder,
    private accountNumberService: AccountNumberService,
    private router: Router,
    private loadingService: LoadingService) {
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

  buildForm(activeRoute: string) {
    return this.fb.group({
      clientNumber: [{ value: activeRoute, disabled: true },
      Validators.required
      ],
      clientAccData: this.fb.array([this.buildAccountForm()])
    })
  }


  postNew(forNewPost) {
    return this.accountNumberService.addAccountNumber(forNewPost)
      .pipe(
        finalize(() => {
          this.loadingService.stop();

        })
      )
  }

  updateValue(forUpdate) {
    return this.accountNumberService.updateSelectedAccount(forUpdate)
  }

  addAccount(clientAccountFormGroup: FormGroup, detectCreation: string) {
    if (clientAccountFormGroup.invalid) {
      console.log('form is invalid')
      return null
    }
    const formValue = clientAccountFormGroup?.getRawValue();
    const nestedForm = clientAccountFormGroup?.get('clientAccData').value

    const forPosting = {
      id: formValue?.clientNumber,
      clientAccData: nestedForm
    }

    if (detectCreation == "true") {
      console.log("heyhey kote")
      this.postNew(forPosting).subscribe((data => {
        console.log('posted successfully', data);
        clientAccountFormGroup.reset(clientAccountFormGroup.value);
        this.router.navigate(['/welcome'])
      }))
    } else {
      console.log("hello kote")
      this.updateValue(forPosting).subscribe(data => {
        console.log('updated successfully');
        clientAccountFormGroup.reset(clientAccountFormGroup.value);
        this.router.navigate(['/welcome'])
      })
    }
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

  getData(activeRoute: string, activeOptionParam: string,
    clientAccountFormGroup: FormGroup) {
    return this.accountNumberService.getAccountDataById(+activeRoute)
      .pipe(
        map(d => d.clientAccData.filter(c => c.accountNumber == activeOptionParam)),
        tap(data => this.populateForm(clientAccountFormGroup, data))
      );
  }

  populateForm(clientAccountFormGroup: FormGroup, data) {
    clientAccountFormGroup.setControl("clientAccData", this.setExistingValue(data))
  }
}
