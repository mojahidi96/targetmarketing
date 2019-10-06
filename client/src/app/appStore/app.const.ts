export const userTypes = {
  administrator: 'Administrator',
  prospect: 'Prospect',
  chamber: 'Chamber',
  salesRep: 'Sales Rep',
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
