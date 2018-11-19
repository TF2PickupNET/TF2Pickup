// @flow

import {
  SET_HAS_UPDATE,
  type SetHasUpdateAction,
} from './types';

function setHasUpdate(hasUpdate: boolean): SetHasUpdateAction {
  return {
    type: SET_HAS_UPDATE,
    payload: { hasUpdate },
  };
}

export { setHasUpdate };
