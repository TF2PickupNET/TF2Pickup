// @flow

import React from 'react';
import { List } from 'antd';
import {
  type MapStateToProps,
  connect,
} from 'react-redux';
import { createSelector } from 'reselect';
import injectSheet from 'react-jss';

import { type State } from '../../../store';
import { makeGetProfileById } from '../../../store/user-profiles/selectors';
import { type UserProfile } from '../../../../types/user-profile';

type Link = {
  url: string,
  display: string,
  name: string,
};
type Props = { links: $ReadOnlyArray<Link | null> };

const styles = {
  sidebar: { width: 160 },

  avatar: {
    height: 160,
    width: 160,
  },
};

class Links extends React.PureComponent<Props> {
  renderItem(item) {
    if (item === null) {
      return null;
    }

    return (
      <List.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.url}
        >
          {item.display}
        </a>
      </List.Item>
    );
  }

  render() {
    return (
      <List
        bordered
        header="Links"
        style={{
          backgroundColor: '#ffffff',
          width: 160,
        }}
        dataSource={this.props.links}
        renderItem={this.renderItem}
      />
    );
  }
}

function getLinkForService(name: $Keys<UserProfile>, profile: UserProfile): Link | null {
  switch (name) {
    case 'steam': return {
      url: `https://steamcommunity.com/profiles/${profile.steam.id}`,
      name: 'steam',
      display: 'Steam',
    };
    case 'etf2l': return {
      url: `https://etf2l.org/forum/user/${profile.etf2l.id}`,
      name: 'etf2l',
      display: 'ETF2L',
    };
    case 'ozfortress': return {
      url: `https://warzone.ozfortress.com/users/${profile.ozfortress.id}`,
      name: 'ozfortress',
      display: 'ozfortress',
    };
    case 'twitch': return {
      url: `https://www.twitch.tv/${profile.twitch.name}`,
      name: 'twitch',
      display: 'Twitch',
    };
    default: return null;
  }
}

const makeMapStateToProps = (): MapStateToProps<State, Props & { userId: string }> => {
  const getLinks = createSelector(
    makeGetProfileById(),
    (profile) => {
      if (profile === null) {
        return [];
      }

      return Object
        .keys(profile)
        .filter(service => profile[service] && profile[service].id)
        .map(service => getLinkForService(service, profile));
    },
  );

  return (state, props) => {
    return { links: getLinks(state, props.userId) };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(Links)
);

