export const userTypes = {
  administrator: 'administrator',
  prospect: 'prospects',
  chamber: 'chamber',
  salesRep: 'sales_representative',
  default: 'Choose User Type'
};

export const adminSubmenuNames = ['Users', 'Reports', 'Switch View'];

export const submenuName = {
  users: adminSubmenuNames[0],
  reports: adminSubmenuNames[1],
  switchView: adminSubmenuNames[2]
};

export const NULLUSER = {
  _id: 0,
  first_name: '',
  last_name: '',
  email: '',
  roles: []
};
