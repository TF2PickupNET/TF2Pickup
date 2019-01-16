import React from 'react';
import { MenuSection } from '@atlaskit/navigation-next';

import PageNavigation, {
  Item,
  Header,
} from '../../components/PageNavigation';
import { State } from '../../store';
import { makeGetUserRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import {
  getVolume,
  getEmojiSet,
  getAnnouncer,
} from '../../store/settings/selectors';
import { useMakeMapState } from '../../store/use-store';
import regions from '../../../config/regions';
import announcers from '../../../config/announcers';
import emojiSets from '../../../config/emoji-sets';

const makeMapState = () => {
  const getUserRegion = makeGetUserRegion();

  return (state: State) => {
    return {
      region: getUserRegion(state, getCurrentUserId(state)),
      volume: getVolume(state),
      emoji: getEmojiSet(state),
      announcer: getAnnouncer(state),
    };
  };
};

function Navigation() {
  const {
    region,
    volume,
    emoji,
    announcer,
  } = useMakeMapState(makeMapState);

  return (
    <PageNavigation>
      <Header text="Settings" />

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

            <Item
              text={(
                <React.Fragment>
                  <b>Announcer:</b> {announcers[announcer].display}
                </React.Fragment>
              )}
            />

            <Item
              text={(
                <React.Fragment>
                  <b>Volume:</b> {volume}%
                </React.Fragment>
              )}
            />

            <Item
              text={(
                <React.Fragment>
                  <b>Emoji:</b> {emojiSets[emoji].display}
                </React.Fragment>
              )}
            />
          </div>
        )}
      </MenuSection>
    </PageNavigation>
  );
}

export default Navigation;
