// @flow

type Role = {|
  name: string,
  display: string,
  level: number,
  color: string,
|};

const headAdmin: Role = {
  name: 'headAdmin',
  display: 'Head Admin',
  level: 9999,
  color: '#a8071a',
};
const admin: Role = {
  name: 'admin',
  display: 'Admin',
  level: 1000,
  color: '#ff4d4f',
};
const honoraryUser: Role = {
  name: 'honoraryUser',
  display: 'Honorary User',
  level: 250,
  color: '#95de64',
};
const donator: Role = {
  name: 'donator',
  display: 'Donator',
  level: 100,
  color: '#ffc53d',
};

export type { Role };

export default {
  headAdmin,
  admin,
  honoraryUser,
  donator,
};
