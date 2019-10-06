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
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public error: Observable<string>;
  public loading: Observable<boolean>;
  public form: FormGroup;
  private alive = true;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>, private router: Router) {
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.dropdown-trigger');
      // let instances = M.Dropdown.init(elems, options);
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = this.store.select(getAuthenticationError);

    // subscribe to success
    // this.store.select(isAuthenticated)
    //   .takeWhile(() => this.alive)
    //   .filter(authenticated => authenticated)
    //   .subscribe(value => {
    //     this.store.dispatch(new Go({ path: ['/prospecting'] }));
    //   });
  }

  OnDestroy() {
    this.alive = false;
  }


  public submit() {
    // get email and password values
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    // trim values
    email.trim();
    password.trim();

    // set payload
    const payload = {
      email: email,
      password: password
    };

    this.store.dispatch(new LogIn(payload));
  }
}
