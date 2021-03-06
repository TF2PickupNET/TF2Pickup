import React, { useContext } from 'react';
import {
  Item,
  MenuSection,
} from '@atlaskit/navigation-next';
import PageNavigation from '@webapp/components/PageNavigation';
import regions from '@config/regions';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import {
  State, useMakeMapState,
} from '@webapp/store';
import { UserIdContext } from '@webapp/Views/Profile';

import Header from './Header';
import Links from './Links';
import Roles from '@webapp/Views/Profile/Navigation/Roles';

const makeMapState = () => {
  const getUserRegion = makeGetUserRegion();

  return (state: State, userId: string | null) => {
    return { region: getUserRegion(state, userId) };
  };
};

export default function Navigation() {
  const userId = useContext(UserIdContext);
  const { region } = useMakeMapState(makeMapState, userId);

  return (
    <PageNavigation>
      <Header />

      <MenuSection>
        {({ className }) => (
          <div className={className}>
            {region !== null && (
              <Item
                text={(
                  <React.Fragment>
                    <b>Region:</b> {regions[region].fullName}
                  </React.Fragment>
                )}
              />
            )}

            <Roles />

            <Links />
          </div>
        )}
      </MenuSection>
    </PageNavigation>
  );
}
