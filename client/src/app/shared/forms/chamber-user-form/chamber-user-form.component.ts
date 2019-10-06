import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CHAMBER } from 'src/app/appStore/interfaces/user';
import { userTypes } from 'src/app/appStore/app.const';
import { trimValues, refineUser } from 'src/app/appStore/utils';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { getUserDataById } from 'src/app/appStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-chamber-user-form',
  templateUrl: './chamber-user-form.component.html',
  styleUrls: ['./chamber-user-form.component.scss']
})
export class ChamberUserFormComponent implements OnInit {
  @Output() updateChamber = new EventEmitter();
  @Input() isTitle = true;
  @Input() modalMode = false;
  @Input() selectedUser;
  @Input() isUpdate = false;
  selectedUserDetails;
  public chamberUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.setFormControls();
  }

  ngOnInit() {
    this.chamberUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      account_name: [],
      primary_contact_person: [],
      account_contact_number: [],
      primary_contact_number: [],
      industry: [],
      primary_contact_person_designation: [],
      logo: []
    });
    this.setFormControls();
  }

  setFormControls() {
    if (this.chamberUserForm) {
      if (this.isUpdate) {
        this.chamberUserForm.patchValue(this.selectedUser);
      } else {
        this.chamberUserForm.reset();
      }
    }
  }
  onSubmit() {
    const payload: CHAMBER = trimValues<CHAMBER>(this.chamberUserForm.value);
    payload.roles = [userTypes.chamber];
    if (this.chamberUserForm.valid) {
      this.updateChamber.emit(payload);
    }
  }
}
