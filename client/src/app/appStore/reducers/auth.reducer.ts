

import { USER } from '../interfaces/user';

import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  authenticated: boolean;
  error: string | null;
  user: USER | null;
}

const initialState: State = {
  authenticated: false,
  user: null,
  error: null
};

export function reducer(state: any = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: {
          token: action.payload.csrf_token,
          userinfo: action.payload.current_user,
          logoutToken: action.payload.logout_token
        }, error: null

      };
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        authenticated: false,
        error: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: null

      };
    case AuthActionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        authenticated: false,
        user: null,
        error: null
      };
    }
    default:
      const data = JSON.parse(sessionStorage.getItem('appState'));
      console.log(data);
      if (data !== null && data.authenticated) {
        return data;
      } else {
        return state;
      }

  }
}

export const isAuthenticated = (state: State) => state.authenticated;

export const getAuthenticatedUser = (state: State) => state.user;

export const getAuthenticationError = (state: State) => state.error;

