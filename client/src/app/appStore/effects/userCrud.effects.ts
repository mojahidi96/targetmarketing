import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from '../../appServices/user.service';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import {
  UserCRUDActionTypes, CreateUser, CreateUserSuccess, CreateUserFailure,
  EditUserSuccess, EditUserFailure, EditUser, DeleteUser,
  DeleteUserSuccess, DeleteUserFailure, GetAllUser, GetAllUserFailure,
  GetAllUserSuccess, GetUserById, GetUserByIdSuccess, GetUserByIdFailure, UpdatePassword, UpdatePasswordSuccess, UpdatePasswordFailure
} from '../actions/user-crud.actions';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { defineUser, checkPayload } from 'src/app/appStore/utils';
@Injectable()
export class UserCrudEffects {

  @Effect()
  public CreateUser: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.CREATEUSER)
    .debounceTime(500)
    .map((action: CreateUser) => action.payload)
    .switchMap(payload => {
      let reqpayload = defineUser(payload, payload.roles[0]);
      reqpayload = checkPayload(reqpayload, payload.roles[0]);
      console.log(reqpayload);
      return this.userService.createuser(reqpayload)
        .map((response) => {
          return new CreateUserSuccess(response);
        })
        .catch((error) => {
          return of(new CreateUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public CreateUserSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.CREATEUSER_SUCCESS),
    tap((response) => {
      // toast notification with response
      this.toastr.success('User Successfully Created', 'Operation Success', {
        timeOut: 3000,
      });
    }));

  @Effect({ dispatch: false })
  public CreateUserFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.CREATEUSER_FAILURE),
    tap((error) => {
      // toast notification with response
      this.toastr.error('Unable to Create User', 'Operation Error', {
        timeOut: 3000,
      });
    }));
  @Effect()
  public EditUser: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.EDITUSER)
    .debounceTime(500)
    .map((action: EditUser) => action.payload)
    .switchMap(payload => {
      let reqpayload = {};
      // if (payload.isUpdatePass) {
      //   reqpayload = {
      //     'user': payload.password,
      //     'id': payload.id,
      //   };
      // } else {
      reqpayload = {
        'user': defineUser(payload['user'], payload['user'].roles[0]),
        'id': payload['id'],
      };
      // }

      return this.userService.editUser(reqpayload)
        .map((response) => {
          return new EditUserSuccess(response);
        })
        .catch((error) => {
          return of(new EditUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public EditUserSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.EDITUSER_SUCCESS),
    tap((response) => {
      // toast notification with response
      this.toastr.success('User information Successfully updated', 'Operation Success', {
        timeOut: 3000,
      });
    }));

  @Effect({ dispatch: false })
  public EditUserFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.EDITUSER_FAILURE),
    tap((error) => {
      this.toastr.error('Unable to Update User information', 'Operation Error', {
        timeOut: 3000,
      });
    }));
  @Effect()
  public DeleteUser: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.DELETEUSER)
    .debounceTime(500)
    .map((action: DeleteUser) => action.payload)
    .switchMap(payload => {
      return this.userService.deleteUser(payload)
        .map((response) => {
          return new DeleteUserSuccess(response);
        })
        .catch((error) => {
          return of(new DeleteUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public DeleteUserSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.DELETEUSER_SUCCESS),
    tap((response) => {
      // toast notification with response
      this.toastr.success('User Successfully deleted', 'Operation Success', {
        timeOut: 3000,
      });
    }));

  @Effect({ dispatch: false })
  public DeleteUserFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.DELETEUSER_FAILURE),
    tap((error) => {
      // toast notification with response
      this.toastr.error('Unable to delete User', 'Operation Error', {
        timeOut: 3000,
      });
    }));

  @Effect()
  public GetAllUser: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.GETALLUSER)
    .debounceTime(500)
    .map((action: GetAllUser) => action.payload)
    .switchMap(payload => {
      return this.userService.getUsers()
        .map((response) => {
          return new GetAllUserSuccess(response);
        })
        .catch((error) => {
          return of(new GetAllUserFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public GetAllUserSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.GETALLUSER_SUCCESS),
    tap((response) => {
      // toast notification with response
      // this.toastr.success('User list Successfully fetched', 'Operation Success', {
      //   timeOut: 3000,
      // });
    }));

  @Effect({ dispatch: false })
  public GetAllUserFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.GETALLUSER_FAILURE),
    tap((error) => {
      // toast notification with response
      this.toastr.error('Unable to get Users list', 'Operation Error', {
        timeOut: 3000,
      });
    }));

  @Effect()
  public GetUserById: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.GETUSERBYID)
    .debounceTime(500)
    .map((action: GetUserById) => action.payload)
    .switchMap(payload => {
      return this.userService.getUserByID(payload)
        .map((response) => {
          return new GetUserByIdSuccess(response);
        })
        .catch((error) => {
          return of(new GetUserByIdFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  public GetUserByIdSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.GETUSERBYID_SUCCESS),
    tap((response) => {
      // toast notification with response
      // this.toastr.success('User data Successfully fetched', 'Operation Success', {
      //   timeOut: 3000,
      // });
    }));

  @Effect({ dispatch: false })
  public GetUserByIdFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.GETUSERBYID_FAILURE),
    tap((error) => {
      // toast notification with response
      this.toastr.error('Unable to get User', 'Operation Error', {
        timeOut: 3000,
      });
    }));

  @Effect()
  public UpdatePassword: Observable<Action> = this.actions
    .ofType(UserCRUDActionTypes.UPDATEPASSWORD)
    .debounceTime(500)
    .map((action: UpdatePassword) => action.payload)
    .switchMap(payload => {
      const reqpayload = {
        'user': payload.password,
        'id': payload.id,
      };

      return this.userService.editUser(reqpayload)
        .map((response) => {
          return new UpdatePasswordSuccess(response);
        })
        .catch((error) => {
          return of(new UpdatePasswordFailure({ error: error }));
        });
    });


  @Effect({ dispatch: false })
  public UpdatePasswordSuccess: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.UPDATEPASSWORD_SUCCESS),
    tap((response) => {
      // toast notification with response
      this.toastr.success('Password updated successfully', 'Operation Success', {
        timeOut: 3000,
      });
    }));

  @Effect({ dispatch: false })
  public UpdatePasswordFailure: Observable<Action> = this.actions.pipe(
    ofType(UserCRUDActionTypes.UPDATEPASSWORD_FAILURE),
    tap((error) => {
      // toast notification with response
      this.toastr.error('Unable to get User', 'Operation Error', {
        timeOut: 3000,
      });
    }));
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }
}
