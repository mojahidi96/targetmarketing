import { createSelector } from 'reselect';


import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';



import * as Auth from './auth.reducer';
import * as USERCRUD from './user.reducer';
import { environment } from '../../../environments/environment';

export interface AppState {
  router: fromRouter.RouterReducerState;
  authState: Auth.State;
  userCrud: USERCRUD.State;
}

export const reducers = {
  router: fromRouter.routerReducer,
  authState: Auth.reducer,
  userCrud: USERCRUD.reducer
};

// reason to combineReducers is have all the reducers combined to one single app reducer

// storefreeze will help us prevent our state from being mutated
const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers);
const productionReducer: ActionReducer<AppState> = compose(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getAppCrudState = (state: AppState) => state.userCrud;

export const getAppAuthState = (state: AppState) => state.authState;

export const getAuthenticatedUser = createSelector(getAppAuthState, Auth.getAuthenticatedUser);

export const getAuthenticationError = createSelector(getAppAuthState, Auth.getAuthenticationError);

export const isAuthenticated = createSelector(getAppAuthState, Auth.isAuthenticated);

export const getCrudUser = createSelector(getAppCrudState, USERCRUD.getCrudUser);

export const getCRUDisSuccess = createSelector(getAppCrudState, USERCRUD.isUserCrudOperationSuccess);

export const getCRUDisFail = createSelector(getAppCrudState, USERCRUD.isUserCrudOperationFail);

export const getAllUserList = createSelector(getAppCrudState, USERCRUD.getUserList);

export const getUserDataById = createSelector(getAppCrudState, USERCRUD.getUserDataById);
