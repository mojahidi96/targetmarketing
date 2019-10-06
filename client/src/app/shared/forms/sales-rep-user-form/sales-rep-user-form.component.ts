import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SALESREP } from 'src/app/appStore/interfaces/user';
import { userTypes } from 'src/app/appStore/app.const';
import { trimValues, validateAllFormFields, messageList } from 'src/app/appStore/utils';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { getUserDataById } from 'src/app/appStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState, getCRUDisSuccess } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-sales-rep-user-form',
  templateUrl: './sales-rep-user-form.component.html',
  styleUrls: ['../chamber-user-form/chamber-user-form.component.scss']
})
export class SalesRepUserFormComponent implements OnInit {
  @Output() submitSalesRep = new EventEmitter();
  @Output() closeForm = new EventEmitter();
  @Input() isTitle = true;
  @Input() modalMode = false;
  @Input() selectedUser;
  @Input() isUpdate = false;
  salesRedUserForm: FormGroup;
  selectedUserDetails;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.setFormControls();
  }

  ngOnInit() {
    this.salesRedUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      chamber_id: []
    });
    this.setFormControls();
    this.store.select(getCRUDisSuccess).subscribe(response => {
      if (response === messageList.createUserSuccess) {
        this.salesRedUserForm.reset();
      }
    });

  }
  setFormControls() {
    if (this.salesRedUserForm) {
      this.salesRedUserForm.reset();
      if (this.isUpdate) {
        this.salesRedUserForm.patchValue(this.selectedUser);
      }
    }
  }
  onSubmit() {
    const payload: SALESREP = trimValues<SALESREP>(this.salesRedUserForm.value);
    payload.roles = [userTypes.salesRep];
    if (this.salesRedUserForm.valid && this.salesRedUserForm.dirty) {
      this.submitSalesRep.emit(payload);
    } else {
      validateAllFormFields(this.salesRedUserForm);
    }
  }

  displayFieldCss(field: string) {
    return {
      'invalid': !this.salesRedUserForm.get(field).valid && this.salesRedUserForm.get(field).touched,
    };
  }

  closeSalesRepForm() {
    this.closeForm.emit();
  }
}
