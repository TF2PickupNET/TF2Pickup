import React from 'react';
import { GlobalNav } from '@atlaskit/navigation-next';

import {
  usePrimaryItems,
  useSecondaryItems,
} from './items';
import Item from '@webapp/components/GlobalNavigation/GlobalItem';

function GlobalNavigation() {
  const primaryItems = usePrimaryItems();
  const secondaryItems = useSecondaryItems();

  return (
    <GlobalNav
      itemComponent={Item}
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
    />
  );
}

export default GlobalNavigation;
