import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';
import { AppState, getAuthenticationError, isAuthenticated } from 'src/app/appStore/reducers/app.reducer';
import { Go } from 'src/app/appStore/actions/router.actions';
import { Router } from '@angular/router';
import { LogIn } from 'src/app/appStore/actions/auth.actions';
import { trimValues, validateAllFormFields } from 'src/app/appStore/utils';
import { SIGNIN } from 'src/app/appStore/interfaces/user';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public error: Observable<string>;
  public loading: Observable<boolean>;
  public signInForm: FormGroup;
  private alive = true;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>, private router: Router) {
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.dropdown-trigger');
      // let instances = M.Dropdown.init(elems, options);
    });
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });

    this.error = this.store.select(getAuthenticationError);

  }

  OnDestroy() {
    this.alive = false;
  }

  public submit() {
    const payload = trimValues<SIGNIN>(this.signInForm.value);
    if (this.signInForm.valid) {
      this.store.dispatch(new LogIn(payload));
    } else {
      validateAllFormFields(this.signInForm);
    }
  }

  displayFieldCss(field: string) {
    return {
      'invalid': !this.signInForm.get(field).valid && this.signInForm.get(field).touched,
    };
  }
}
