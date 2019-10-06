import { userTypes } from './app.const';
import { FormControl, FormGroup } from '@angular/forms';
import * as generator from 'randomatic';
import { USERLIST } from './interfaces/user';

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function trimValues<T>(collection: any): T {
  const localObject = {};
  for (const key in collection) {
    if (typeof (collection[key]) === 'string') {
      localObject[key] = collection[key].trim();
    }
  }
  return <T>localObject;
}

export function refineUser(userdata, userType) {
  switch (userType) {
    case userTypes.administrator: {
      // tslint:disable-next-line:prefer-const
      let userinfo = {};
      userinfo['_id'] = userdata['uid'][0].value;
      userinfo['email'] = userdata['mail'][0].value;
      userinfo['first_name'] = userdata['field_firstname'][0] ? userdata['field_firstname'][0].value : '';
      userinfo['last_name'] = userdata['field_lastname'][0] ? userdata['field_lastname'][0].value : '';
      userinfo['roles'] = userdata['roles'];
      return userinfo;
    }
    case userTypes.chamber: {
      const userinfo = {
        '_id': userdata['uid'][0].value,
        'first_name': userdata['field_firstname'][0] ? userdata['field_firstname'][0].value : '',
        'last_name': userdata['field_lastname'][0] ? userdata['field_lastname'][0].value : '',
        'email': userdata['mail'][0].value,
        'roles': userdata['roles'],
        'account_name': userdata['field_account_name'][0] ? userdata['field_account_name'][0].value : '',
        'primary_contact_person': userdata['field_primary_contact_person'][0] ? userdata['field_primary_contact_person'][0].value : '',
        'account_contact_number': userdata['field_account_contact_number'][0] ? userdata['field_account_contact_number'][0].value : '',
        'primary_contact_number': userdata['field_primary_contact_number'][0] ? userdata['field_primary_contact_number'][0].value : '',

        'industry': userdata['field_industry'][0] ? userdata['field_industry'][0].value : '',
        'primary_contact_person_designation': userdata['field_primary_contact_person_des'][0] ?
          userdata['field_primary_contact_person_des'][0].value : '',
        'logo': userdata['user_picture'][0] ? userdata['user_picture'][0].value : ''


      };
      return userinfo;
    }
    case userTypes.prospect: {
      const userinfo = {
        '_id': userdata['uid'][0].value,
        'first_name': userdata['field_firstname'][0] ? userdata['field_firstname'][0].value : '',
        'last_name': userdata['field_lastname'][0] ? userdata['field_lastname'][0].value : '',
        'account_name': userdata['field_account_name'][0] ? userdata['field_account_name'][0].value : '',
        'primary_contact_person': userdata['field_primary_contact_person'][0] ? userdata['field_primary_contact_person'][0].value : '',
        'account_contact_number': userdata['field_account_contact_number'][0] ? userdata['field_account_contact_number'][0].value : '',
        'primary_contact_number': userdata['field_primary_contact_number'][0] ? userdata['field_primary_contact_number'][0].value : '',
        'industry': userdata['field_industry'][0] ? userdata['field_industry'][0].value : '',
        'primary_contact_person_designation': userdata['field_primary_contact_person_des'][0] ?
          userdata['field_primary_contact_person_des'][0].value : '',
        'isMember': userdata['field_ismember'][0] ? userdata['field_ismember'][0].value : '',
        'expected_revenue': userdata['field_expected_revenue'][0] ? userdata['field_expected_revenue'][0].value : '',

        'onboard_date': userdata['created'][0] ? userdata['created'][0].value : '',
        'last_touched': userdata['field_last_touched'][0] ? userdata['field_last_touched'][0].value : '',
        'roles': userdata['roles'],
      };
      return userinfo;
    }
    case userTypes.salesRep: {
      const userinfo = {
        '_id': userdata['uid'][0].value,
        'first_name': userdata['field_firstname'][0] ? userdata['field_firstname'][0].value : '',
        'last_name': userdata['field_lastname'][0] ? userdata['field_lastname'][0].value : '',
        'email': userdata['mail'][0].value,
        'chamber': userdata['field_chamber_id'][0] ? userdata['field_chamber_id'][0].value : '',
        'roles': userdata['roles']
      };
      return userinfo;
    }
    default: {
      return userdata;
    }
  }

}

export function defineUser(userdata, userType) {
  switch (userType) {
    case userTypes.administrator: {

      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_ismember': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': userTypes.administrator }],
      };
      return userinfo;
    }
    case userTypes.prospect: {
      const userinfo = {
        'name': [{ 'value': userdata.first_name }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': userTypes.chamber }],
        'field_primary_contact_person': [{ 'value': userdata.primary_contact_person }],
        'field_primary_contact_number': [{ 'value': userdata.primary_contact_number }],
        'field_primary_contact_person_des': [{ 'value': userdata.primary_contact_person_designation }],
        'field_account_name': [{ 'value': userdata.account_name }],
        'field_account_contact_number': [{ 'value': userdata.account_contact_number }],
        'field_expected_revenue': [{ 'value': userdata.expected_revenue }],
        'field_ismember': [{ 'value': userdata.isMember }],
        'field_industry': [{ 'value': userdata.industry }],
      };
      return userinfo;
    }
    case userTypes.chamber: {
      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': userTypes.chamber }],
        'field_primary_contact_person': [{ 'value': userdata.primary_contact_person }],
        'field_primary_contact_number': [{ 'value': userdata.primary_contact_number }],
        'field_primary_contact_person_des': [{ 'value': userdata.primary_contact_person_designation }],
        'field_account_name': [{ 'value': userdata.account_name }],
        'field_account_contact_number': [{ 'value': userdata.account_contact_number }],
        'field_industry': [{ 'value': userdata.industry }],
        'user_picture': [{ 'value': userdata.logo }],
      };
      return userinfo;
    }
    case userTypes.salesRep: {
      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': userTypes.salesRep }],
        'field_chamber_id': [{ 'value': userdata.chamber_id }],
      };
      return userinfo;
    }
    default: {
      return userdata;
    }
  }
}


export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) { return arr; }

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });
}

export function statusReqBody(status: boolean) {
  return { 'status': [{ 'value': status }] };
}

export const messageList = {
  createUserSuccess: 'User Created Successfully',
  createUserFailure: 'unable to perform action at this time',
  editUserSuccess: 'User Information updated Successfully',
  editUserFailure: 'Could not update the user information',
  deleteUserSuccess: 'User Deleted Successfully',
  deleteUserFailure: 'Could not delete the user',
  getAllUserSuccess: 'Userlist fetched Successfully',
  getAllUserFailure: 'Could not retrieve userlist',
  getUserDataSuccess: 'User data fetched Successfully',
  getUserDataFailure: 'Could not retrieve user data',
};



export function checkPayload(payload, role) {
  if (role !== userTypes.prospect) {
    payload.pass = [{ 'value': generator('Aa0', 10) }];
    payload.status = [{ 'value': true }];
    return payload;
  } else {
    return payload;
  }
}

export function refineUserList(userList): USERLIST[] {
  if (userList) {
    const users = [];
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].status[0].value) {
        const userinfo = {
          'uid': userList[i]['id'][0] ? userList[i]['id'][0].value : '',
          'name': userList[i]['name'][0] ? userList[i]['name'][0].value : '',
          'role': userList[i]['roles'][0] ? userList[i]['roles'][0].target_id : '',
          'status': userList[i]['status'][0] ? userList[i]['status'][0].value : '',
        };
        users.push(userinfo);
      }
    }
    return users;
  }
}

// const userinfo = {
//   'firstname': 'name',
//   'lastname': 'email'
// };
// const keysList = ['field_firstname', 'field_lastname'];

// export function createRequestBody(userinfo, keysList) {

//   const userinfo = {
//     'firstname': 'name',
//     'lastname': 'email'
//   };
//   const reqKeys = ['field_firstname', 'field_lastname'];
//   const userinfo = {}
//   for (let i = 0; i < reqKeys.length; i++) {
//     userinfo[reqKeys[i]] = [{ 'value': userdata.first_name }]




//   }


//   return userinfo;
// }
// }


