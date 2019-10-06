import { userTypes } from './app.const';

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
        'primary_contact_number': userdata['field_primary_contact_number'] ? userdata['field_primary_contact_number'][0].value : '',
        'industry': userdata['field_industry'][0] ? userdata['field_industry'][0].value : '',
        'primary_contact_person_designation': userdata['field_primary_contact_person_des'][0] ?
          userdata['field_primary_contact_person_des'][0].value : '',
        'logo': userdata['user_picture'] ? userdata['user_picture'][0].value : ''

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
        'isMember': userdata['field_ismember'] ? userdata['field_ismember'][0].value : '',
        'expected_revenue': userdata['field_expected_revenue'] ? userdata['field_expected_revenue'][0].value : '',
        'onboard_date': userdata['created'][0] ? userdata['created'][0].value : '',
        'last_touched': userdata['changed'][0] ? userdata['changed'][0].value : '',
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
        'chamber': userdata['chamber_id'][0].value ? userdata['chamber_id'][0].value : '',
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
        'roles': [{ 'target_id': 'administrator' }],
      };
      return userinfo;
    }
    case userTypes.prospect: {
      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': 'prospect' }],
        'field_primary_contact_person': [{ 'value': userdata.primary_contact_person }],
        'field_primary_contact_person_des': [{ 'value': userdata.primary_contact_person_designation }],
        'field_account_name': [{ 'value': userdata.account_name }],
        'field_account_contact_number': [{ 'value': userdata.account_contact_number }],
        'field_expected_revenue': [{ 'value': userdata.expected_revenue }],
        'field_ismember': [{ 'value': userdata.isMember }],
        'field_industry': [{ 'value': userdata.industry }]
      };
      return userinfo;
    }
    case userTypes.chamber: {
      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': 'prospect' }],
        'field_primary_contact_person': [{ 'value': userdata.primary_contact_person }],
        'field_primary_contact_person_des': [{ 'value': userdata.primary_contact_person_designation }],
        'field_account_name': [{ 'value': userdata.account_name }],
        'field_account_contact_number': [{ 'value': userdata.account_contact_number }],
        'field_industry': [{ 'value': userdata.industry }],
        'user_picture': [{ 'value': userdata.logo }]
      };
      return userinfo;
    }
    case userTypes.salesRep: {
      const userinfo = {
        'name': [{ 'value': userdata.email }],
        'mail': [{ 'value': userdata.email }],
        'field_firstname': [{ 'value': userdata.first_name }],
        'field_lastname': [{ 'value': userdata.last_name }],
        'roles': [{ 'target_id': 'prospect' }],
        'field_chamber_id': [{ 'value': userdata.chamber_id }]
      };
      return userinfo;
    }
    default: {
      return userdata;
    }
  }
}
