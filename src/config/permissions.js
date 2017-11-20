import roles from './roles';

export default {
  user: { 'change-role': { level: roles.headAdmin.level } },

  chat: {
    delete: { level: roles.admin.level },

    'use-global-mentions': { level: roles.admin.level },
  },

  pickup: {
    'see-server': { level: roles.admin.level },

    kick: {
      level: roles.admin.level,
      selfEditing: true,
    },
  },
};
