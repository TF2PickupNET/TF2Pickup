import React, { PureComponent } from 'react';
import { Card } from 'materialize-react';
import Aux from 'react-aux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import randomItem from 'random-item';

import Date from '../../components/date';
import {
  pipe,
  pluck,
} from '../../../utils/functions';
import sixes from '../../../assets/images/background/6v6.jpg';
import hl from '../../../assets/images/background/9v9.jpg';
import bball from '../../../assets/images/background/bball.jpg';
import ultiduo from '../../../assets/images/background/ultiduo.jpg';

const bgImage = randomItem([sixes, hl, bball, ultiduo]);

/**
 * Check whether or not the user is allowed to play on TF2Pickup.
 *
 * @class
 */
class Bans extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
    }).isRequired,
    userId: PropTypes.string,
    isETF2LBanned: PropTypes.bool,
    isVACBanned: PropTypes.bool,
  };

  static defaultProps = {
    userId: null,
    isETF2LBanned: false,
    isVACBanned: false,
  };

  static styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: 1,
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    card: { maxWidth: 480 },
  };

  /**
   * Get the ban info for the user.
   *
   * @returns {Array} - Returns an array with the reason and the date until the user is banned.
   */
  getBanInfo() {
    if (!this.props.userId) {
      return [];
    }

    if (this.props.isETF2LBanned) {
      return ['You are currently banned on ETF2L', 'Sat Jan 20 2018 15:40:29 GMT+0100 (CET)'];
    } else if (this.props.isVACBanned) {
      return ['You currently have an active VAC ban'];
    }

    return [];
  }

  render() {
    const [reason, bannedUntil = null] = this.getBanInfo();

    if (reason) {
      return (
        <div className={this.props.classes.container}>
          <Card className={this.props.classes.card}>
            <Card.Header>
              You are not allowed to play on TF2Pickup
            </Card.Header>

            <Card.Content>
              Reason: {reason}

              <br />
              <br />

              {bannedUntil ? (
                <Aux>
                  You are banned until <Date
                    withoutHours
                    date={bannedUntil}
                  />
                </Aux>
              ) : null}
            </Card.Content>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default pipe(
  connect((state) => {
    return {
      userId: pluck('user.id')(state),
      isETF2LBanned: pluck('user.services.etf2l.isBanned', false)(state),
      isVACBanned: pluck('user.services.steam.vacBanned', false)(state),
    };
  }),
  injectSheet(Bans.styles),
)(Bans);
