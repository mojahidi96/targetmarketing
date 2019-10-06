import { USER, CHAMBER, SALESREP, PROSPECT } from 'src/app/appStore/interfaces/user';

export const userList = [
  {
    'name': 'admin',
    'uid': '1',
    'status': false,
    'role': 'Administrator'
  },
  {
    'name': 'Prospect',
    'uid': '2',
    'status': true,
    'role': 'Chamber'
  },
  {
    'name': 'Prospect2',
    'uid': '3',
    'status': true,
    'role': 'Prospects'
  },
  {
    'name': 'Jeo',
    'uid': '5',
    'status': true,
    'role': 'Sales Representative'
  }
  ,
  {
    'name': 'Paritoshik',
    'uid': '6',
    'status': true,
    'role': 'Chamber'
  },
  {
    'name': 'paul',
    'uid': '7',
    'role': 'Chamber',
    'status': true,
  }
];


export const userDetails: USER[] =
  [{
    '_id': 1,
    'first_name': 'Mike',
    'last_name': 'Freeman',
    'email': 'xyz@xyz.com',
    'roles': [
      'administrator',
      'authenticated'
    ],
  }];

export const prospectUserDetails = {
  'Administrator': {
    '_id': 1,
    'first_name': 'Mike',
    'last_name': 'Freeman',
    'email': 'xyz@xyz.com',
    'roles': [
      'Administrator',
      'authenticated'
    ]
  },
  'Prospect': {
    '_id': 2,
    'first_name': 'Mike',
    'last_name': 'Freeman',
    'account_name': 'tm',
    'primary_contact_person': 'xyzpcp',
    'account_contact_number': '0010010011',
    'primary_contact_number': '1111111111',
    'expected_revenue': '2M',
    'industry': 'IT',
    'primary_contact_person_designation': 'Owner',
    'last_touched': '24/07/2018',
    'onboard_date': '24/06/2018',
    'isMember': 'Y',
    'roles': [
      'Prospect'
    ]
  },
  'Chamber': {
    '_id': 3,
    'first_name': 'Mike',
    'last_name': 'Freeman',
    'email': 'xyz@xyz.com',
    'roles': [
      'Chamber',
      'authenticated'
    ],
    'account_name': 'target_marketing',
    'primary_contact_person': 'Agent X',
    'account_contact_number': '0070070070',
    'primary_contact_number': 1010101010,
    'industry': 'IT',
    'primary_contact_person_designation': 'Operations Head',
    'logo': 'string'
  },
  'Sales Rep': {
    '_id': 4,
    'first_name': 'Mike',
    'last_name': 'Freeman',
    'email': 'xyz@xyz.com',
    'chamber_id': 'target_marketing',
    'roles': [
      'Sales Rep',
      'authenticated'
    ]
  }
};
