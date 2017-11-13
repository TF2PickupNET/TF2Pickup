import React, { PureComponent } from 'react';
import injectSheet, { withTheme } from 'react-jss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  List,
  Typography,
  Icon,
  Ripple,
} from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

// eslint-disable-next-line import/no-namespace
import * as Icons from '../../../icons';
import app from '../../../app';
import {
  capitalize,
  pipe,
  find,
} from '../../../../utils/functions';
import { getGamemodeFromUrl } from '../../../../utils/pickup';

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
    }).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    theme: PropTypes.shape({ iconColor: PropTypes.string }).isRequired,
    className: PropTypes.string.isRequired,
    gamemode: PropTypes.string.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

  static styles = {
    card: { margin: 0 },

    listHeader: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    hidden: { display: 'none' },

    classIcon: { margin: '8px 0' },

    icon: { margin: '0 8px' },
  };

  /**
   * Check whether the user is in the class.
   *
   * @returns {Boolean} - Returns whether or not the user is in the class.
   */
  get isInClass() {
    return find(player => player.id === this.props.userId)(this.props.players);
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
    const {
      className,
      gamemode,
    } = this.props;
    const ClassIcon = Icons[capitalize(className)];

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
            {capitalize(className)}
          </Typography>

          <Typography typography="title">
            {this.props.players.length} / {gamemodes[gamemode].slots[className]}
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
    const { userId } = this.props;
    const isInClass = this.isInClass;

    return (
      <List.Item
        className={userId ? '' : this.props.classes.hidden}
        leftItem={(
          <Icon
            icon={isInClass ? 'close' : 'plus'}
            className={this.props.classes.icon}
          />
        )}
        onClick={isInClass ? this.handleLeaveClass : this.handleJoinClass}
      >
        {isInClass ? 'Remove' : 'Join Class'}

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
      />
    ));
  }

  render() {
    const isHidden = this.props.userId ? '' : this.props.classes.hidden;

    return (
      <div>
        <Card className={this.props.classes.card}>
          <List inset>
            {this.renderTitle()}

            {this.renderPlayers()}

            <List.Divider className={isHidden} />

            {this.renderJoinRemoveItem()}
          </List>
        </Card>
      </div>
    );
  }
}

export default pipe(
  withTheme,
  injectSheet(ClassList.styles),
  connect((state) => {
    return {
      gamemode: getGamemodeFromUrl(state.router.location.pathname),
      userId: state.user ? state.user.id : null,
    };
  }),
)(ClassList);
