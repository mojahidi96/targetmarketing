export interface SIGNIN {
  email: string;
  password: string;
}

export interface USERLIST {
  name: string;
  uid: string;
  role: string;
  status: boolean;
}

export interface USER {
  _id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: Array<string>;
}

export interface PROSPECT {
  _id?: number;
  first_name: string;
  last_name: string;
  account_name: string;
  primary_contact_person: string;
  account_contact_number: string;
  primary_contact_number: string;
  expected_revenue: string;
  industry: string;
  primary_contact_person_designation: string;
  last_touched: string;
  onboard_date: string;
  isMember: string;
  roles: Array<string>;
}
export interface CHAMBER {
  _id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: Array<string>;
  account_name: string;
  primary_contact_person: string;
  account_contact_number: string;
  primary_contact_number: number;
  industry: string;
  primary_contact_person_designation: string;
  logo: string;
}

export interface SALESREP {
  _id?: number;
  first_name: string;
  last_name: string;
  email: string;
  chamber_id: string;
  roles: Array<string>;
}

