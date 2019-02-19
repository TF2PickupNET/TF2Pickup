import React, { useMemo } from 'react';
import { Location } from '@reach/router';
import { GlobalNav, GlobalItem } from '@atlaskit/navigation-next';
import {
  State,
  useMapState,
} from '@webapp/store';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import { isString } from '@utils/string';
import { Style } from '@atlaskit/theme';

import {
  getPrimaryItems,
  getSecondaryItems,
} from './items';

const mapState = (state: State) => {
  return { userId: getCurrentUserId(state) };
};

function styles(style: Style) {
  return {
    ...style,
    itemWrapper: {
      ...style.itemWrapper,
      marginBottom: '8px',
    },
  };
}

function GlobalNavigation() {
  const { userId } = useMapState(mapState);
  const primaryItems = useMemo(getPrimaryItems, []);
  const secondaryItems = useMemo(() => getSecondaryItems(userId), [userId]);

  return (
    <Location>
      {({ location, navigate }) => (
        <GlobalNav
          itemComponent={props => {
            // @ts-ignore
            const { path } = props;

            return (
              <GlobalItem
                {...props}
                isSelected={location.pathname === path}
                onClick={(ev) => {
                  if (isString(path)) {
                    navigate(path);
                  }

                  if (props.onClick) {
                    props.onClick(ev);
                  }
                }}
                styles={styles}
              />
            );
          }}
          primaryItems={primaryItems}
          secondaryItems={secondaryItems}
        />
      )}
    </Location>
  );
}

export default GlobalNavigation;
