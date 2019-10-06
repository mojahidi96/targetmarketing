import { USER, CHAMBER, PROSPECT, SALESREP, USERLIST } from '../interfaces/user';
import { AllCRUD, UserCRUDActionTypes } from '../actions/user-crud.actions';
import { messageList } from 'src/app/appStore/utils';


export interface State {
  error: string | null;
  user: USER | CHAMBER | PROSPECT | SALESREP | null;
  success: string | null;
  userList: Array<USERLIST>;
  selectedUser: any;
}

const initialState: State = {
  success: null,
  user: null,
  error: null,
  userList: [],
  selectedUser: null
};

export function reducer(state: any = initialState, action: AllCRUD): State {
  switch (action.type) {
    case UserCRUDActionTypes.CREATEUSER_SUCCESS: {
      return {
        ...state,
        success: messageList.createUserSuccess,
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.CREATEUSER_FAILURE: {
      return {
        ...state,
        error: messageList.createUserFailure,
      };
    }
    case UserCRUDActionTypes.EDITUSER_SUCCESS: {
      return {
        ...state,
        success: messageList.editUserSuccess,
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.EDITUSER_FAILURE: {
      return {
        ...state,
        error: messageList.editUserFailure,
      };
    }
    case UserCRUDActionTypes.DELETEUSER_SUCCESS: {
      return {
        ...state,
        success: messageList.deleteUserSuccess,
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.DELETEUSER_FAILURE: {
      return {
        ...state,
        error: messageList.deleteUserFailure
      };
    }
    case UserCRUDActionTypes.GETALLUSER_SUCCESS: {
      return {
        ...state,
        success: messageList.getAllUserSuccess,
        userList: action.payload,
      };
    }
    case UserCRUDActionTypes.GETALLUSER_FAILURE: {
      return {
        ...state,
        error: messageList.getAllUserFailure
      };
    }

    case UserCRUDActionTypes.GETUSERBYID: {
      return {
        ...state,
        selectedUser: null,
        success: ''
      };
    }

    case UserCRUDActionTypes.GETUSERBYID_SUCCESS: {
      return {
        ...state,
        success: messageList.getUserDataSuccess,
        selectedUser: action.payload
      };
    }
    case UserCRUDActionTypes.GETUSERBYID_FAILURE: {
      return {
        ...state,
        error: messageList.getUserDataFailure,
      };
    }

    case UserCRUDActionTypes.UPDATEPASSWORD_SUCCESS: {
      return {
        ...state,
        success: 'Password Updated',
        error: ''
      };
    }
    case UserCRUDActionTypes.UPDATEPASSWORD_FAILURE: {
      return {
        ...state,
        success: '',
        error: 'Unable to update password'
      };
    }
    default:
      return state;
  }
}

export const isUserCrudOperationSuccess = (state: State) => state.success;

export const getCrudUser = (state: State) => state.user;

export const isUserCrudOperationFail = (state: State) => state.error;

export const getUserList = (state: State) => state.userList;

export const getUserDataById = (state: State) => state.selectedUser;
