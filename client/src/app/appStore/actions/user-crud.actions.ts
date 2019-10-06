import { Action } from '@ngrx/store';

// import type function
import { type } from '../utils';
import { USER, CHAMBER, PROSPECT, SALESREP } from '../interfaces/user';

export const UserCRUDActionTypes = {
  CREATEUSER: type('[usercrud] create-user'),
  CREATEUSER_FAILURE: type('[usercrud] create-user error'),
  CREATEUSER_SUCCESS: type('[usercrud] create-user success'),
  EDITUSER: type('[usercrud] edit-user'),
  EDITUSER_FAILURE: type('[usercrud edit-user error'),
  EDITUSER_SUCCESS: type('[usercrud] edit-user success'),
  DELETEUSER: type('[usercrud] delete-user'),
  DELETEUSER_FAILURE: type('[usercrud] delete-user error'),
  DELETEUSER_SUCCESS: type('[usercrud] delete-user success'),
  GETALLUSER: type('[usercrud] get-all-user'),
  GETALLUSER_FAILURE: type('[usercrud] get-all-user error'),
  GETALLUSER_SUCCESS: type('[usercrud] get-all-user success'),
  GETUSERBYID: type('[usercrud] get-user-byId'),
  GETUSERBYID_FAILURE: type('[usercrud] get-user-byId error'),
  GETUSERBYID_SUCCESS: type('[usercrud] get-user-byId success'),
  UPDATEPASSWORD: type('[usercrud] update-user-password'),
  UPDATEPASSWORD_FAILURE: type('[usercrud] update-user-password error'),
  UPDATEPASSWORD_SUCCESS: type('[usercrud] update-user-password success'),
};

export class CreateUser implements Action {
  readonly type: string = UserCRUDActionTypes.CREATEUSER;
  constructor(public payload: USER | CHAMBER | PROSPECT | SALESREP) { }
}

export class CreateUserSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.CREATEUSER_SUCCESS;
  constructor(public payload: any) { }
}

export class CreateUserFailure implements Action {
  readonly type: string = UserCRUDActionTypes.CREATEUSER_FAILURE;
  constructor(public payload: any) { }
}

export class EditUser implements Action {
  readonly type: string = UserCRUDActionTypes.EDITUSER;
  constructor(public payload: USER | CHAMBER | PROSPECT | SALESREP | any) { }
}

export class EditUserSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.EDITUSER_SUCCESS;
  constructor(public payload: any) { }
}

export class EditUserFailure implements Action {
  readonly type: string = UserCRUDActionTypes.EDITUSER_FAILURE;
  constructor(public payload: any) { }
}

export class DeleteUser implements Action {
  readonly type: string = UserCRUDActionTypes.DELETEUSER;
  constructor(public payload: any) { }
}

export class DeleteUserSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.DELETEUSER_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteUserFailure implements Action {
  readonly type: string = UserCRUDActionTypes.DELETEUSER_FAILURE;
  constructor(public payload: any) { }
}


export class GetAllUser implements Action {
  readonly type: string = UserCRUDActionTypes.GETALLUSER;
  constructor(public payload: any) { }
}

export class GetAllUserSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.GETALLUSER_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAllUserFailure implements Action {
  readonly type: string = UserCRUDActionTypes.GETALLUSER_FAILURE;
  constructor(public payload: any) { }
}

export class GetUserById implements Action {
  readonly type: string = UserCRUDActionTypes.GETUSERBYID;
  constructor(public payload: any) {
  }
}

export class GetUserByIdSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.GETUSERBYID_SUCCESS;
  constructor(public payload: any) {
  }
}

export class GetUserByIdFailure implements Action {
  readonly type: string = UserCRUDActionTypes.GETUSERBYID_FAILURE;
  constructor(public payload: any) { }
}

export class UpdatePassword implements Action {
  readonly type: string = UserCRUDActionTypes.UPDATEPASSWORD;
  constructor(public payload: any) { }
}
export class UpdatePasswordSuccess implements Action {
  readonly type: string = UserCRUDActionTypes.UPDATEPASSWORD_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdatePasswordFailure implements Action {
  readonly type: string = UserCRUDActionTypes.UPDATEPASSWORD_FAILURE;
  constructor(public payload: any) { }
}

export type AllCRUD = CreateUser |
  CreateUserSuccess |
  CreateUserFailure |
  EditUser |
  EditUserSuccess |
  EditUserFailure |
  DeleteUser |
  DeleteUserSuccess |
  DeleteUserFailure |
  GetAllUser |
  GetAllUserFailure |
  GetAllUserSuccess |
  GetUserById |
  GetUserByIdFailure |
  GetUserByIdSuccess |
  UpdatePassword |
  UpdatePasswordSuccess | UpdatePasswordFailure;
