import roles from './roles';

export default {
  user: {
    'change-role': { level: roles.headAdmin.level },

    alert: { level: roles.admin.level },
  },

  chat: {
    delete: { level: roles.admin.level },

    'use-global-mention': { level: roles.admin.level },
  },

  pickup: {
    kick: { level: roles.admin.level },

    end: { level: roles.admin.level },

    'reserve-server': { level: roles.admin.level },
  },

  server: {
    configure: { level: roles.admin.level },

    'see-rcon': { level: roles.admin.level },
  },

  announcers: { 'use-without-buying': { level: roles.honoraryUser.level } },
};
