import { USER, CHAMBER, SALESREP, PROSPECT } from 'src/app/appStore/interfaces/user';

export const userList = [
  {
    'name': 'admin',
    'uid': '1',
    'role': 'Administrator'
  },
  {
    'name': 'Prospect',
    'uid': '2',
    'role': 'Chamber'
  },
  {
    'name': 'Prospect2',
    'uid': '3',
    'role': 'Prospect'
  },
  {
    'name': 'Jeo',
    'uid': '5',
    'role': 'Sales Rep'
  }
  ,
  {
    'name': 'Paritoshik',
    'uid': '6',
    'role': 'Chamber'
  },
  {
    'name': 'paul',
    'uid': '7',
    'role': 'Chamber'
  },
  {
    'name': 'paulson',
    'uid': '8',
    'role': 'Chamber'
  },
  {
    'name': 'paulon',
    'uid': '9',
    'role': 'Chamber'
  },
  {
    'name': 'paulefon',
    'uid': '10',
    'role': 'Chamber'
  },
  {
    'name': 'paulefon1',
    'uid': '11',
    'role': 'Chamber'
  },
  {
    'name': 'paulefyyon',
    'uid': '12',
    'role': 'Chamber'
  },
  {
    'name': 'paulefon121',
    'uid': '13',
    'role': 'Chamber'
  },
  {
    'name': 'paul123',
    'uid': '14',
    'role': 'Chamber'
  },
  {
    'name': 'ere',
    'uid': '15',
    'role': 'Chamber'
  },
  {
    'name': 'r34r34r34',
    'uid': '16',
    'role': 'Chamber'
  },
  {
    'name': 'fwerfw',
    'uid': '17',
    'role': 'Chamber'
  },
  {
    'name': 'paul183',
    'uid': '18',
    'role': 'Administrator, Chamber, Sales Representative'
  },
  {
    'name': 'tyjtyj',
    'uid': '19',
    'role': 'Chamber'
  },
  {
    'name': 'dew',
    'uid': '20',
    'role': 'Chamber'
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
    ]
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
