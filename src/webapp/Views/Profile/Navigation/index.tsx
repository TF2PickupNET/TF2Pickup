import React from 'react';
import {
  Item,
  MenuSection,
} from '@atlaskit/navigation-next';

import PageNavigation from '../../../components/PageNavigation';
import regions from '../../../../config/regions';
import { makeGetUserRegion } from '../../../store/users/selectors';
import { useMakeMapState } from '../../../store/use-store';
import { useUserId } from '../utils';
import { State } from '../../../store';

import Header from './Header';
import Roles from './Roles';
import Links from './Links';

const makeMapState = () => {
  const getUserRegion = makeGetUserRegion();

  return (state: State, userId: string | null) => {
    return { region: getUserRegion(state, userId) };
  };
};

export default function Navigation() {
  const userId = useUserId();
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
