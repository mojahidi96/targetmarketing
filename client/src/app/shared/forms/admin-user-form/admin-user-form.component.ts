import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { USER, CHAMBER, SALESREP, PROSPECT } from 'src/app/appStore/interfaces/user';
import { Store } from '@ngrx/store';
import { trimValues, refineUser } from 'src/app/appStore/utils';
import { userDetails } from 'src/assets/mock-users';
import { userTypes } from 'src/app/appStore/app.const';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { GetUserById } from '../../../appStore/actions/user-crud.actions';
import { AppState, getUserDataById } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['../chamber-user-form/chamber-user-form.component.scss']
})
export class AdminUserFormComponent implements OnInit {
  @Output() updateAdmin = new EventEmitter();
  @Input() isTitle = true;
  @Input() modalMode = false;
  @Input() selectedUser;
  @Input() isUpdate = false;
  public adminUserForm: FormGroup;
  selectedUserDetails;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.setFormControls();
  }
  ngOnInit() {
    this.adminUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.setFormControls();
  }
  setFormControls() {
    if (this.adminUserForm) {
      if (this.isUpdate) {
        this.adminUserForm.patchValue(this.selectedUser);
      } else {
        this.adminUserForm.reset();
      }
    }
  }
  onSubmit() {
    const payload: USER = trimValues<USER>(this.adminUserForm.value);
    payload.roles = [userTypes.administrator];
    if (this.adminUserForm.valid) {
      this.updateAdmin.emit(payload);
    }
  }
}
