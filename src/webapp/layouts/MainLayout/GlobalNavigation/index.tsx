import React, { useMemo } from 'react';
import { GlobalNav } from '@atlaskit/navigation-next';
import {
  State,
  useMapState,
} from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';

import {
  getPrimaryItems,
  getSecondaryItems,
  useMapItems,
} from './items';

const mapState = (state: State) => {
  return { isLoggedIn: getCurrentUserId(state) !== null };
};

function GlobalNavigation() {
  const { isLoggedIn } = useMapState(mapState);
  const primaryItems = useMemo(getPrimaryItems, []);
  const secondaryItems = useMemo(() => getSecondaryItems(isLoggedIn), [isLoggedIn]);

  return (
    <GlobalNav
      primaryItems={useMapItems(primaryItems)}
      secondaryItems={useMapItems(secondaryItems)}
    />
  );
}

export default GlobalNavigation;
