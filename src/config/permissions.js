import roles from './roles';

export default {
  user: {
    'change-role': { level: roles.headAdmin.level },

    alert: { level: roles.admin.level },
  },

  chat: {
    delete: { level: roles.admin.level },

    'use-global-mentions': { level: roles.admin.level },
  },

  pickup: {
    'see-server': { level: roles.admin.level },

    kick: { level: roles.admin.level },

    end: { level: roles.admin.level },

    'reserve-server': { level: roles.admin.level },
  },

  servers: { configure: { level: roles.admin.level } },

  announcers: { 'use-without-buying': { level: roles.honoraryUser.level } },
};
