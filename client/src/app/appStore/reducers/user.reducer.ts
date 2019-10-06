import { USER, CHAMBER, PROSPECT, SALESREP, USERLIST } from '../interfaces/user';
import { AllCRUD, UserCRUDActionTypes } from '../actions/user-crud.actions';


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
        success: 'User Created Successfully',
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.CREATEUSER_FAILURE: {
      return {
        ...state,
        error: 'unable to perform action at this time'
      };
    }
    case UserCRUDActionTypes.EDITUSER_SUCCESS: {
      return {
        ...state,
        success: 'User Information updated Successfully',
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.EDITUSER_FAILURE: {
      return {
        ...state,
        error: 'Could not update the user information',
      };
    }
    case UserCRUDActionTypes.DELETEUSER_SUCCESS: {
      return {
        ...state,
        success: 'User Deleted Successfully',
        user: action.payload,
      };
    }
    case UserCRUDActionTypes.DELETEUSER_FAILURE: {
      return {
        ...state,
        error: 'Could not delete the user',
      };
    }
    case UserCRUDActionTypes.GETALLUSER_SUCCESS: {
      return {
        ...state,
        success: 'Userlist fetched Successfully',
        userList: action.payload,
      };
    }
    case UserCRUDActionTypes.GETALLUSER_FAILURE: {
      return {
        ...state,
        error: 'Could not retrieve userlist',
      };
    }
    case UserCRUDActionTypes.GETUSERBYID_SUCCESS: {
      return {
        ...state,
        success: 'User data fetched Successfully',
        selectedUser: action.payload
      };
    }
    case UserCRUDActionTypes.GETUSERBYID_FAILURE: {
      return {
        ...state,
        error: 'Could not retrieve user data',
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
