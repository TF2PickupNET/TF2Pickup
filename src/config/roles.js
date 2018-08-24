// @flow

type Role = {|
  name: string,
  display: string,
  level: number,
|};

const headAdmin: Role = {
  name: 'headAdmin',
  display: 'Head Admin',
  level: 9999,
};
const admin: Role = {
  name: 'admin',
  display: 'Admin',
  level: 1000,
};
const honoraryUser: Role = {
  name: 'honoraryUser',
  display: 'Honorary User',
  level: 250,
};
const donator: Role = {
  name: 'donator',
  display: 'Donator',
  level: 100,
};
const user: Role = {
  name: 'user',
  display: 'User',
  level: 0,
};

export type { Role };

export default {
  headAdmin,
  admin,
  honoraryUser,
  donator,
  user,
};
