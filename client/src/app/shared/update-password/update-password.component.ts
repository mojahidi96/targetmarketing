import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trimValues, validateAllFormFields } from 'src/app/appStore/utils';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appStore/reducers/app.reducer';
import { EditUser, DeleteUser, UpdatePassword } from 'src/app/appStore/actions/user-crud.actions';
import { getAuthenticatedUser } from 'src/app/appStore/reducers/app.reducer';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../forms/chamber-user-form/chamber-user-form.component.scss']
})

export class UpdatePasswordComponent implements OnInit, OnDestroy {
  submitted = false;
  public updatePasswordForm: FormGroup;
  getUserId;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    const reqBody = trimValues(this.updatePasswordForm.value);
    if (this.updatePasswordForm.valid && (reqBody['password'] === reqBody['confPassword'])) {
      const updatePass = {
        'id': 0, 'password': { pass: [{ value: reqBody['password'] }] }
      };

      this.getUserId = this.store.select(getAuthenticatedUser).subscribe(res => {
        if (res['userinfo']) {
          updatePass.id = res['userinfo'].uid;
        }
      });

      if (updatePass.id > 0) {
        this.store.dispatch(new UpdatePassword(updatePass));
      }
    }
  }

  cancel() {
    this.updatePasswordForm.reset();
    this.submitted = false;
  }


  ngOnDestroy() {
    if (this.getUserId) { this.getUserId.unsubscribe(); }
  }
}
