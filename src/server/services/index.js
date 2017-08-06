import users from './users';
import logs from './logs';
import authentication from './authentication';

/**
 * Setup all of the services.
 */
export default function services() {
  this
    .configure(users)
    .configure(logs)
    .configure(authentication);
}
