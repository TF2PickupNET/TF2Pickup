import React, { useMemo } from 'react';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import InfoIcon from '@atlaskit/icon/glyph/info';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import store, {
  useMapState,
  State,
} from '@webapp/store';
import { logoutUser } from '@webapp/store/user-id/actions';
import { redirectToSteamAuth } from '@webapp/utils/auth';
import TF2Pickup from '@webapp/icons/TF2Pickup';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';

import UserAvatar from './UserAvatar';
import GamemodeIcon from './GamemodeIcon';
import { ItemProps } from './GlobalItem';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

const usePrimaryItems = () => {
  return useMemo((): ItemProps[] => {
    return [
      {
        id: 'home',
        icon: () => (
          <TF2Pickup
            size={32}
            color="white"
          />
        ),
        path: '/',
        isSelected: true,
      },
      ...gamemodeKeys.map((gamemode) => {
        return {
          id: gamemode,
          path: `/${gamemode}`,
          icon: () => (
            <GamemodeIcon gamemode={gamemode} />
          ),
        };
      }),
      {
        id: 'info',
        icon: (props) => (
          <InfoIcon
            {...props}
            size="large"
            primaryColor="transparent"
            secondaryColor="white"
          />
        ),
        label: 'Info',
        tooltip: 'Info',
        path: '/info',
      },
    ];
  }, []);
};

const useSecondaryItems = () => {
  const { userId } = useMapState((state: State) => {
    return { userId: getCurrentUserId(state) };
  });

  return useMemo((): ItemProps[] => {
    if (userId === null) {
      return [
        {
          id: 'login',
          icon: SignInIcon,
          label: 'Sign In',
          tooltip: 'Sign In',
          onClick: redirectToSteamAuth,
        },
      ];
    }

    return [
      {
        id: 'settings',
        icon: SettingsIcon,
        label: 'Settings',
        tooltip: 'Settings',
        path: '/settings',
      },
      {
        id: 'profile',
        icon: UserAvatar,
        label: 'Profile',
        tooltip: 'Your Profile',
        path: `/profile/${userId}`,
      },
      {
        id: 'sign-out',
        icon: SignOutIcon,
        label: 'Sign Out',
        tooltip: 'Sign Out',
        onClick: () => store.dispatch(logoutUser()),
      },
    ];
  }, [userId]);
};

export {
  usePrimaryItems,
  useSecondaryItems,
};
