import React, {
  PureComponent,
  PropTypes,
} from 'react';
import has from 'lodash.has';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import getAlias from '/src/utils/get-alias';

export default class Pickup extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const gamemode = getAlias(this.gamemode);

    if (has(gamemodes, gamemode)) {
      this.props.redirect(`/${gamemode}`);
    }
  }

  gamemode = this.props.match.url.slice(1);

  render() {
    return (
      <div />
    );
  }
}
