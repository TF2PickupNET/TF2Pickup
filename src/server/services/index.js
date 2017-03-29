import users from './users';
import logs from './logs';

export default function services() {
  this
    .configure(users)
    .configure(logs);
}
