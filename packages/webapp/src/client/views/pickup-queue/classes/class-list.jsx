import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  Card,
  List,
  Typography,
  Icon,
  Ripple,
} from 'materialize-react';
import { gamemodes } from '@tf2-pickup/config';
import {
  capitalize,
  pipe,
  find,
  findIndex, add,
} from '@tf2-pickup/utils';

// eslint-disable-next-line import/no-namespace
import * as Icons from '../../../icons';
import app from '../../../app';

import Player from './player';

/**
 * The component which renders all of the players that joined the class.
 *
 * @class
 */
class ClassList extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      listHeader: PropTypes.string.isRequired,
      hidden: PropTypes.string.isRequired,
      classIcon: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      leaveIcon: PropTypes.string.isRequired,
    }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    theme: PropTypes.shape({ iconColor: PropTypes.string }).isRequired,
    className: PropTypes.string.isRequired,
    gamemode: PropTypes.string.isRequired,
    userId: PropTypes.string,
    isInClass: PropTypes.shape({}),
  };

  static defaultProps = {
    userId: null,
    isInClass: null,
  };

  /**
   * The styles for the component.
   * We use a function here so the theme get's passed as well.
   *
   * @returns {Object} - Returns the styles.
   */
  static styles() {
    return {
      card: { margin: 0 },

      listHeader: {
        display: 'flex',
        justifyContent: 'space-between',
      },

      hidden: { display: 'none' },

      classIcon: { margin: '8px 0' },

      icon: {
        margin: '0 8px',

        '&:before': { transition: 'transform 100ms' },
      },

      leaveIcon: { '&:before': { transform: 'rotate(45deg)' } },
    };
  }

  /**
   * Emit the join event.
   */
  handleJoinClass = () => {
    app.io.emit('pickup-queue.join', {
      className: this.props.className,
      gamemode: this.props.gamemode,
    });
  };

  /**
   * Emit the remove event.
   */
  handleLeaveClass = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  /**
   * Render the title for the class.
   *
   * @returns {JSX} - Returns the JSX.
   */
  renderTitle() {
    const ClassIcon = Icons[capitalize(this.props.className)];
    const gamemodeInfo = gamemodes[this.props.gamemode];

    return (
      <List.Item
        leftItem={(
          <List.Item.Avatar>
            <ClassIcon
              size={40}
              color={this.props.theme.iconColor}
              className={this.props.classes.classIcon}
            />
          </List.Item.Avatar>
        )}
      >
        <span className={this.props.classes.listHeader}>
          <Typography typography="headline">
            {capitalize(this.props.className)}
          </Typography>

          <Typography typography="title">
            {this.props.players.length} / {gamemodeInfo.slots[this.props.className]}
          </Typography>
        </span>
      </List.Item>
    );
  }

  /**
   * Render the list item for adding / removing from the class.
   *
   * @returns {JSX} - Returns the JSX.
   */
  renderJoinRemoveItem() {
    return (
      <List.Item
        className={this.props.userId ? '' : this.props.classes.hidden}
        leftItem={(
          <Icon
            icon="plus"
            className={classnames(
              this.props.classes.icon,
              { [this.props.classes.leaveIcon]: this.props.isInClass },
            )}
          />
        )}
        onClick={this.props.isInClass ? this.handleLeaveClass : this.handleJoinClass}
      >
        {this.props.isInClass ? 'Remove' : 'Join Class'}

        <Ripple />
      </List.Item>
    );
  }

  /**
   * Render the current players for the class.
   *
   * @returns {JSX[]} - Returns the JSX.
   */
  renderPlayers() {
    return this.props.players.map(player => (
      <Player
        key={player.id}
        player={player}
        gamemode={this.props.gamemode}
      />
    ));
  }

  render() {
    const isHidden = this.props.userId ? '' : this.props.classes.hidden;
    const order = pipe(
      Object.keys,
      findIndex(className => this.props.className === className),
      add(1),
    )(gamemodes[this.props.gamemode].slots);

    return (
      <div style={{ order }}>
        <Card className={this.props.classes.card}>
          <List inset>
            {this.renderTitle()}

            <List.Divider className={isHidden} />

            {this.renderJoinRemoveItem()}

            {this.renderPlayers()}
          </List>
        </Card>
      </div>
    );
  }
}

export default pipe(
  connect((state, props) => {
    const players = state.pickupQueue[props.gamemode].classes[props.className];
    const userId = state.user ? state.user.id : null;

    return {
      players,
      userId,
      isInClass: find(player => player.id === userId)(players),
    };
  }),
  injectSheet(ClassList.styles),
)(ClassList);
