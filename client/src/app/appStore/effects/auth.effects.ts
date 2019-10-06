import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {

  AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut, LogOutSuccess, LogOutFailure

} from '../actions/auth.actions';
import { AuthService } from 'src/app/appServices/auth.service';
import { of } from 'rxjs/internal/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {

  @Effect()
  public LogIn: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .debounceTime(500)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess({ csrf_token: user.csrf_token, current_user: user.current_user, logout_token: user.logout_token });
        })
        .catch((error) => {
          return of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      // const token = jwt_decode(user.payload.token);
      this.authService.getSessionToken().subscribe(response => {
        console.log(response);
      }, (error) => {
        sessionStorage.setItem('stoken', error.error.text);
      });
      sessionStorage.setItem('user', JSON.stringify(user.payload.current_user));
      sessionStorage.setItem('csrf', user.payload.csrf_token);
      sessionStorage.setItem('logoutToken', user.payload.logout_token);
      if (!user.payload.current_user.roles) {
        this.router.navigateByUrl('/prospecting');
      } else {
        user.payload.current_user.roles.forEach(role => {
          if (role === 'administrator' || role === 'chamber') {
            this.router.navigateByUrl('/dashboard');
          } else if (role === 'sales_representative') {
            this.router.navigateByUrl('/prospecting');
          }
        });
      }
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((error) => {
      this.toastr.error(error.payload.error.error.message, 'Authentication Error', {
        timeOut: 3000,
      });
    })
  );

  @Effect()
  public LogOut: Observable<Action> = this.actions
    .ofType(AuthActionTypes.LOGOUT)
    .debounceTime(500)
    .map((action: LogOut) => action.payload)
    .switchMap(payload => {
      return this.authService.logout(payload.xtoken)
        .map((response) => {
          return new LogOutSuccess(response);
        })
        .catch((error) => {
          return of(new LogOutFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public LogOutSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS),
    tap((response) => {
      // const token = jwt_decode(user.payload.token);
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  LogOutFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_FAILURE),
    tap((error) => {
      // this.toastr.error(error.payload.error.error.message, 'Error', {
      //   timeOut: 3000,
      // });
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
}
