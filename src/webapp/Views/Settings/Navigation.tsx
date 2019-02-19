import React from 'react';
import { MenuSection } from '@atlaskit/navigation-next';
import PageNavigation, {
  Item,
  Header,
} from '@webapp/components/PageNavigation';
import {
  State,
  useMakeMapState,
} from '@webapp/store';
import { makeGetUserRegion } from '@webapp/store/users/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';
import {
  getVolume,
  getEmojiSet,
  getAnnouncer,
} from '@webapp/store/settings/selectors';
import regions from '@config/regions';
import announcers from '@config/announcers';
import emojiSets from '@config/emoji-sets';

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
                path="#region"
                text={(
                  <React.Fragment>
                    <b>Region:</b> {regions[region].fullName}
                  </React.Fragment>
                )}
              />
            )}

            <Item
              path="#announcer"
              text={(
                <React.Fragment>
                  <b>Announcer:</b> {announcers[announcer].display}
                </React.Fragment>
              )}
            />

            <Item
              path="#volume"
              text={(
                <React.Fragment>
                  <b>Volume:</b> {volume}%
                </React.Fragment>
              )}
            />

            <Item
              path="#emoji"
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
