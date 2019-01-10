import React, { useMemo } from 'react';
import { RouterHistory } from 'react-router-dom';
import {
  GlobalNav,
  GlobalItemProps,
} from '@atlaskit/navigation-next';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import SignOutIcon from '@atlaskit/icon/glyph/sign-out';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';

import gamemodes from '../../../../config/gamemodes';
import { useHistory } from '../../../utils/use-router';
import { Keys } from '../../../../utils/types';

import UserAvatar from './UserAvatar';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;

interface ItemProps extends GlobalItemProps {
  path: string,
}

const globalNavPrimaryItems: ItemProps[] = [
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

const globalNavSecondaryItems: ItemProps[] = [
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
    path: '/sign-out',
  },
];

function useMapItems(items: ItemProps[], history: RouterHistory): ItemProps[] {
  return useMemo(() => items.map((item) => {
    return {
      ...item,
      onClick: () => history.push(item.path),
    };
  }), [items, history]);
}

function GlobalNavigation() {
  const history = useHistory();

  return (
    <GlobalNav
      primaryItems={useMapItems(globalNavPrimaryItems, history)}
      secondaryItems={useMapItems(globalNavSecondaryItems, history)}
    />
  );
}

export default GlobalNavigation;
