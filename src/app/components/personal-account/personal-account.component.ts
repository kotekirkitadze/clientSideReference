import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, tap } from 'rxjs/operators';
import { ClientAccData } from 'src/app/models/account-model';
import { AccountNumberService } from 'src/app/services/account-number.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PersonalAccountFacade } from './personal-account.facade';


@Component({
  selector: 'app-personal-account',
  templateUrl:
    './personal-account.component.html',
  styleUrls: ['./personal-account.component.css'],
  providers: [PersonalAccountFacade]
})
export class PersonalAccountComponent
  implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private facade: PersonalAccountFacade) { }

  clientAccountFormGroup: FormGroup;
  activeRoute = this.activatedRoute.snapshot.paramMap.get('id');
  activeOptionParam = this.activatedRoute.snapshot.paramMap.get('accountNum');
  detectCreation = this.activatedRoute.snapshot.paramMap.get('creation');
  ngOnInit(): void {
    this.buildForm()
    if (this.detectCreation == "true") {
      // this.buildForm()
    } else {
      this.getData().subscribe(console.log)
    }
  }

  getData() {
    return this.facade.getData(this.activeRoute, this.activeOptionParam, this.clientAccountFormGroup);
  }
  buildForm() {
    this.clientAccountFormGroup = this.facade.buildForm(this.activeRoute)
  }

  AddForm() {
    this.getForm.push(this.facade.buildAccountForm())
  }

  removeAcc(i: number) {
    this.getForm.removeAt(i)
  }
  get getForm(): FormArray | null {
    return <FormArray>this.clientAccountFormGroup.get('clientAccData')
  }

  addAccount() {
    this.facade.addAccount(this.clientAccountFormGroup, this.detectCreation);
  }
}
