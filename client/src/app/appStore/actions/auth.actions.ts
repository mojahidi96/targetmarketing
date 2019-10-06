import { Action } from '@ngrx/store';

// import type function
import { type } from '../utils';
import { SIGNIN } from 'src/app/appStore/interfaces/user';

export const AuthActionTypes = {
  LOGIN: type('[users] Authenticate'),
  LOGIN_FAILURE: type('[users] Authentication error'),
  LOGIN_SUCCESS: type('[users] Authentication success'),
  LOGOUT: type('[users] Logout'),
  LOGOUT_SUCCESS: type('[users] logout_success'),
  LOGOUT_FAILURE: type('[users] logout_error')
};

export class LogIn implements Action {
  readonly type: string = AuthActionTypes.LOGIN;

  constructor(public payload: SIGNIN) { }
}


export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type: string = AuthActionTypes.LOGOUT;

  constructor(public payload: any) { }
}


export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
  constructor(public payload: any) { }
}

export class LogOutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;
  constructor(public payload: any) { }
}


export type All = LogIn | LogInSuccess | LogInFailure | LogOut | LogOutSuccess | LogOutFailure;
