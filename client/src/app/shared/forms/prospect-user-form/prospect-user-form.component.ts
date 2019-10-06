import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROSPECT } from 'src/app/appStore/interfaces/user';
import { userTypes } from 'src/app/appStore/app.const';
import { prospectUserDetails } from '../../../../assets/mock-users';
import { trimValues, refineUser } from 'src/app/appStore/utils';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { getUserDataById } from 'src/app/appStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-prospect-user-form',
  templateUrl: './prospect-user-form.component.html',
  styleUrls: ['../chamber-user-form/chamber-user-form.component.scss']
})
export class ProspectUserFormComponent implements OnInit {
  @Output() updateProspect = new EventEmitter();

  @Input() isTitle = true;
  @Input() modalMode = false;
  @Input() selectedUser;
  @Input() isUpdate = false;
  prospectUserForm: FormGroup;
  selectedUserDetails;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.setFormControls();
  }
  ngOnInit() {
    this.prospectUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      account_name: ['', Validators.required],
      primary_contact_person: ['', Validators.required],
      account_contact_number: ['', Validators.required],
      primary_contact_number: ['', Validators.required],
      industry: ['', Validators.required],
      primary_contact_person_designation: ['', Validators.required],
      expected_revenue: ['', Validators.required],
      isMember: [],
    });
    this.setFormControls();
  }

  setFormControls() {
    if (this.prospectUserForm) {
      if (this.isUpdate) {
        this.prospectUserForm.patchValue(this.selectedUser);
      } else {
        this.prospectUserForm.reset();
      }
    }
  }

  onSubmit() {
    const payload: PROSPECT = trimValues<PROSPECT>(this.prospectUserForm.value);
    payload.last_touched = Date.now().toString();
    payload.onboard_date = Date.now().toString();
    payload.isMember = this.prospectUserForm.get('isMember').value ? 'Y' : 'N';
    payload.roles = [userTypes.prospect];
    // if (this.prospectUserForm.valid) {
    this.updateProspect.emit(payload);
    //   }
  }
}
