import React from 'react';
import { GlobalItemProps } from '@atlaskit/navigation-next';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import InfoIcon from '@atlaskit/icon/glyph/info';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import store from '@webapp/store';
import { logoutUser } from '@webapp/store/user-id/actions';
import { redirectToSteamAuth } from '@webapp/utils/auth';

import UserAvatar from './UserAvatar';
import GamemodeIcon from '@webapp/layouts/MainLayout/GlobalNavigation/GamemodeIcon';
import TF2Pickup from '@webapp/icons/TF2Pickup';

interface ItemProps extends GlobalItemProps {
  path?: string,
}

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

function getPrimaryItems(): ItemProps[] {
  return [
    {
      id: 'home',
      icon: () => (
        <TF2Pickup
          size={32}
          color="white"
        />
      ),
      size: 'large',
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
}

function getSecondaryItems(userId: string | null): ItemProps[] {
  if (userId === null) {
    return [
      {
        id: 'login',
        icon: SignInIcon,
        label: 'Sign In',
        tooltip: 'Sign In',
        onClick() {
          redirectToSteamAuth();
        },
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
      onClick() {
        store.dispatch(logoutUser());
      },
    },
  ];
}

export {
  getPrimaryItems,
  getSecondaryItems,
};
