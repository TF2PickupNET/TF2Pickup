import roles from './roles';

export default {
  'user.change-role': { level: roles.headAdmin.level },

  'chat.use-global-mentions': { level: roles.admin.level },

  'chat.delete': { level: roles.admin.level },
};
