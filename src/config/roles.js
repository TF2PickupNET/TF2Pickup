// @flow

type Role = {|
  name: string,
  display: string,
  level: number,
|};
type Roles = 'headAdmin' | 'admin' | 'honoraryUser' | 'donator' | 'user';

const roles: { [key: Roles]: Role } = {
  headAdmin: {
    name: 'headAdmin',
    display: 'Head Admin',
    level: 9999,
  },

  admin: {
    name: 'admin',
    display: 'Admin',
    level: 1000,
  },

  honoraryUser: {
    name: 'honoraryUser',
    display: 'Honorary User',
    level: 250,
  },

  donator: {
    name: 'donator',
    display: 'Donator',
    level: 100,
  },

  user: {
    name: 'user',
    display: 'User',
    level: 0,
  },
};

export type {
  Role,
  Roles,
};

export default roles;
