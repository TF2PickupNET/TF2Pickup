import { useMemo } from 'react';
import { GlobalItemProps } from '@atlaskit/navigation-next';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import { RouterHistory } from 'react-router-dom';

import gamemodes from '../../../../config/gamemodes';
import { Keys } from '../../../../utils/types';
import UserAvatar from './UserAvatar';
import store from '../../../store';
import { logoutUser } from '../../../store/user-id/actions';
import { redirectToSteamAuth } from '../../../utils/auth';
import { isString } from '../../../../utils/string';

interface ItemProps extends GlobalItemProps {
  path?: string,
}

function useMapItems(items: ItemProps[], history: RouterHistory): ItemProps[] {
  return useMemo(() => items.map((item) => {
    return {
      onClick: () => isString(item.path) && history.push(item.path),
      ...item,
    };
  }), [items, history]);
}


const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

function getPrimaryItems(): ItemProps[] {
  return [
    {
      id: 'home',
      icon: () => 'TF2P',
      path: '/',
    },
    ...gamemodeKeys.map((gamemode) => {
      return {
        id: gamemode,
        path: `/${gamemode}`,
        icon: () => gamemodes[gamemode].display,
      };
    }),
    {
      id: 'info',
      icon: InfoIcon,
      label: 'Info',
      path: '/info',
    },
  ];
}

function getSecondaryItems(isLoggedIn: boolean): ItemProps[] {
  if (isLoggedIn) {
    return [
      {
        id: 'settings',
        icon: SettingsIcon,
        label: 'Settings',
        path: '/settings',
      },
      {
        id: 'profile',
        icon: UserAvatar,
        label: 'Profile',
        path: '/profile',
      },
      {
        id: 'sign-out',
        icon: SignOutIcon,
        label: 'Sign Out',
        onClick() {
          store.dispatch(logoutUser());
        },
      },
    ];
  }

  return [
    {
      id: 'login',
      icon: SignInIcon,
      label: 'Sign In',
      onClick() {
        redirectToSteamAuth();
      },
    },
  ];
}

export {
  getPrimaryItems,
  getSecondaryItems,
  useMapItems,
};
