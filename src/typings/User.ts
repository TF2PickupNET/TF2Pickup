import regions from '../config/regions';
import roles from '../config/roles';

interface User {
  id: string,
  name: string | null,
  online: boolean,
  region: keyof typeof regions | null,
  lastOnline: number,
  hasAcceptedTheRules: boolean,
  createdOn: number,
  lastPickup: number | null,
  roles: Array<keyof typeof roles>,
  hasCompletedSignUp: boolean,
}

export default User;
