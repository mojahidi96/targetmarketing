import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CHAMBER } from 'src/app/appStore/interfaces/user';
import { userTypes } from 'src/app/appStore/app.const';
import { trimValues, refineUser, validateAllFormFields, messageList } from 'src/app/appStore/utils';
import { adminFormBuilder } from 'src/app/shared/forms/form-builder-imports';
import { getUserDataById } from 'src/app/appStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { AppState, getCRUDisSuccess } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-chamber-user-form',
  templateUrl: './chamber-user-form.component.html',
  styleUrls: ['./chamber-user-form.component.scss']
})
export class ChamberUserFormComponent implements OnInit {
  @Output() submitChamber = new EventEmitter();
  @Output() closeForm = new EventEmitter();
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
      primary_contact_person: [],
      primary_contact_number: [],
      primary_contact_person_designation: [],
      account_name: ['', Validators.required],
      account_contact_number: ['', Validators.required],
      industry: ['', Validators.required],
      logo: []
    });
    this.setFormControls();
    this.store.select(getCRUDisSuccess).subscribe(response => {
      if (response === messageList.createUserSuccess) {
        this.chamberUserForm.reset();
      }
    });

  }

  setFormControls() {
    if (this.chamberUserForm) {
      this.chamberUserForm.reset();
      if (this.isUpdate) {
        this.chamberUserForm.patchValue(this.selectedUser);
      }
    }
  }
  onSubmit() {
    const payload: CHAMBER = trimValues<CHAMBER>(this.chamberUserForm.value);
    payload.roles = [userTypes.chamber];
    if (this.chamberUserForm.valid && this.chamberUserForm.dirty) {
      this.submitChamber.emit(payload);
    } else {
      validateAllFormFields(this.chamberUserForm);
    }
  }

  displayFieldCss(field: string) {
    return {
      'invalid': !this.chamberUserForm.get(field).valid && this.chamberUserForm.get(field).touched,
    };
  }

  closeChamberForm() {
    this.closeForm.emit();
  }
}
