import regions from '../config/regions';
import roles from '../config/roles';

interface User {
  readonly id: string,
  readonly name: string | null,
  readonly online: boolean,
  readonly region: keyof typeof regions | null,
  readonly lastOnline: number,
  readonly hasAcceptedTheRules: boolean,
  readonly createdOn: number,
  readonly lastPickup: number | null,
  readonly roles: Array<keyof typeof roles>,
  readonly hasCompletedSignUp: boolean,
}

export default User;
