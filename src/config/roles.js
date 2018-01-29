import { colors } from 'materialize-react';

export default {
  headAdmin: {
    name: 'headAdmin',
    display: 'Head Admin',
    level: 9999,
    color: {
      light: colors.red900,
      dark: colors.red900,
    },
  },

  admin: {
    name: 'admin',
    display: 'Admin',
    level: 1000,
    color: {
      light: colors.red600,
      dark: colors.red600,
    },
  },

  honoraryUser: {
    name: 'honoraryUser',
    display: 'Honorary User',
    level: 250,
    color: {
      light: colors.green900,
      dark: colors.green600,
    },
  },

  donator: {
    name: 'donator',
    display: 'Donator',
    level: 100,
    color: {
      light: colors.orange700,
      dark: colors.orange600,
    },
  },

  user: {
    name: 'user',
    display: 'User',
    level: 0,
    color: {
      light: null,
      dark: null,
    },
  },
};
