import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css']
})
export class EditInfoFormComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clinetNumber: '123',
      name: '',
      lastName: '',
      personalNumber: '123',
      phoneNumber: '599',
      sex: '',
      legalAddress: this.buildAddress(),
      livingAddress: this.buildAddress()
    })
  }


  buildAddress() {
    return this.fb.group({
      country: 'Georgia',
      city: 'Tbilisi',
      street: 'Third'
    })
  }

}
