import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { USER, CHAMBER, SALESREP, PROSPECT } from 'src/app/appStore/interfaces/user';
import { Store } from '@ngrx/store';
import { trimValues, refineUser, validateAllFormFields, messageList } from 'src/app/appStore/utils';
import { userDetails } from 'src/assets/mock-users';
import { userTypes } from 'src/app/appStore/app.const';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { GetUserById } from '../../../appStore/actions/user-crud.actions';
import { AppState, getUserDataById, getCRUDisSuccess } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['../chamber-user-form/chamber-user-form.component.scss']
})
export class AdminUserFormComponent implements OnInit, OnDestroy {
  @Output() submitAdmin = new EventEmitter();
  @Output() closeForm = new EventEmitter();
  @Input() isTitle = true;
  @Input() modalMode = false;
  @Input() selectedUser;
  @Input() isUpdate = false;
  public adminUserForm: FormGroup;
  selectedUserDetails;
  crudSuccess;
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
    this.crudSuccess = this.store.select(getCRUDisSuccess).subscribe(response => {
      if (response === messageList.createUserSuccess) {
        this.adminUserForm.reset();
      }
    });

  }
  setFormControls() {
    if (this.adminUserForm) {
      this.adminUserForm.reset();
      if (this.isUpdate) {
        this.adminUserForm.patchValue(this.selectedUser);
      }
    }
  }
  onSubmit() {
    const payload: USER = trimValues<USER>(this.adminUserForm.value);
    payload.roles = [userTypes.administrator];
    if (this.adminUserForm.valid && this.adminUserForm.dirty) {
      this.submitAdmin.emit(payload);
    } else {
      validateAllFormFields(this.adminUserForm);
    }
  }

  displayFieldCss(field: string) {
    if (!field) { return true; }
    return {
      'invalid': !this.adminUserForm.get(field).valid && this.adminUserForm.get(field).touched,
    };
  }

  closeAdminForm() {
    this.closeForm.emit();
  }

  ngOnDestroy() {
    this.crudSuccess.unsubscribe();
  }

}
