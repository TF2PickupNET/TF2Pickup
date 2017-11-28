import hooks from 'feathers-hooks-common';

export default { before: { patch: hooks.disallow() } };
