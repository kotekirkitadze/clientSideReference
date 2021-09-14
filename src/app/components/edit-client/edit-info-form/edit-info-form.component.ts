import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { valMessageForName } from '../validationMessages';
import { debounceTime } from 'rxjs/operators';

import { Client } from '../../../models/client-model';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { EditInfoFacade } from './edit-info.facade';

@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css'],
  providers: [EditInfoFacade]
})
export class EditInfoFormComponent
  implements OnInit {
  clientForm: FormGroup;
  nameErrorMessage: string;

  constructor(
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private facade: EditInfoFacade
  ) { }

  activeRouteId;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.starting(params);
      })

    const nameControl =
      this.clientForm.get('name');
    nameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.setMessageForName(nameControl)
      );
  }

  starting(params) {
    this.activeRouteId = params.get('id'),
      console.log("hey");
    if (+this.activeRouteId !== 0) {
      this.initializeForm(+this.activeRouteId).subscribe(() => {
        this.loadingService.stop()
      })
      return null
    }
    this.buildForm();
  }

  initializeForm(id: number) {
    this.buildForm();
    return this.facade.initializeForm(this.clientForm, id);
  }

  deleteClient() {
    this.facade.deleteClient(this.activeRouteId).subscribe();
  }

  populateForm(client: Client) {
    this.facade.populateForm(this.clientForm, client);
  }

  buildForm() {
    return this.clientForm = this.facade.buildForm();
  }

  addClient() {
    this.facade.addClient(this.clientForm, this.activeRouteId)
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
}
