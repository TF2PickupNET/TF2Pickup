import { matchPath } from 'react-router-dom';

import { useLocation } from '../../utils/use-router';
import { isString } from '../../../utils/string';

function useUserId() {
  const { pathname } = useLocation();
  const match = matchPath(pathname, { path: '/profile/:userId' });

  return match && isString(match.params.userId) ? match.params.userId : null;
}

export { useUserId };
