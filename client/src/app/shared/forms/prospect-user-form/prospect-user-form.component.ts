import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PROSPECT } from 'src/app/appStore/interfaces/user';
import { userTypes } from 'src/app/appStore/app.const';
import { prospectUserDetails } from '../../../../assets/mock-users';
import { trimValues, refineUser, validateAllFormFields, messageList } from 'src/app/appStore/utils';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { getUserDataById } from 'src/app/appStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState, getCRUDisSuccess } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-prospect-user-form',
  templateUrl: './prospect-user-form.component.html',
  styleUrls: ['../chamber-user-form/chamber-user-form.component.scss']
})
export class ProspectUserFormComponent implements OnInit {
  @Output() submitProspect = new EventEmitter();
  @Output() closeForm = new EventEmitter();
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
      primary_contact_person: [],
      account_contact_number: ['', Validators.required],
      primary_contact_number: [],
      industry: ['', Validators.required],
      primary_contact_person_designation: [],
      expected_revenue: ['', Validators.required],
      isMember: [],
    });
    this.setFormControls();
    this.store.select(getCRUDisSuccess).subscribe(response => {
      if (response === messageList.createUserSuccess) {
        this.prospectUserForm.reset();
      }
    });

  }

  setFormControls() {
    if (this.prospectUserForm) {
      this.prospectUserForm.reset();
      if (this.isUpdate) {
        this.prospectUserForm.patchValue(this.selectedUser);
      }
    }
  }

  onSubmit() {
    const payload: PROSPECT = trimValues<PROSPECT>(this.prospectUserForm.value);
    payload.last_touched = Date.now().toString();
    payload.onboard_date = Date.now().toString();
    payload.isMember = this.prospectUserForm.get('isMember').value ? 'Y' : 'N';
    payload.roles = [userTypes.prospect];
    if (this.prospectUserForm.valid && this.prospectUserForm.dirty) {
      this.submitProspect.emit(payload);
    } else {
      validateAllFormFields(this.prospectUserForm);
    }
  }

  displayFieldCss(field: string) {
    return {
      'invalid': !this.prospectUserForm.get(field).valid && this.prospectUserForm.get(field).touched,
    };
  }

  closeProspectForm() {
    this.closeForm.emit();
  }
}
