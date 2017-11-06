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
      light: colors.red400,
      dark: colors.red400,
    },
  },

  developer: {
    name: 'developer',
    display: 'Developer',
    level: 500,
    color: {
      light: colors.indigo600,
      dark: colors.indigo400,
    },
  },

  honoraryUser: {
    name: 'honoraryUser',
    display: 'Honorary User',
    level: 250,
    color: {
      light: colors.green700,
      dark: colors.green700,
    },
  },

  donator: {
    name: 'donator',
    display: 'Donator',
    level: 100,
    color: {
      light: colors.orange500,
      dark: colors.orange500,
    },
  },
};
