import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'materialize-react';

import {
  mapObject,
  pipe,
  find,
  pluck,
  includes,
} from '../../../utils/functions';
import { computeLevel } from '../../../utils/has-permission';
import roles from '../../../config/roles';
import openWindowInNewTab from '../../utils/open-window-in-new-tab';

/**
 * The user item.
 *
 * @class
 */
class UserItem extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    classes: PropTypes.shape({
      item: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      donator: PropTypes.string.isRequired,
      friendIcon: PropTypes.string.isRequired,
    }).isRequired,
    isFriend: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = { className: '' };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    return {
      item: {
        height: 24,
        lineHeight: '24px',
        color: theme.textColor,
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      },

      icon: {
        marginRight: 2,

        '&:before': {
          fontSize: '20px !important',
          lineHeight: '24px',
        },
      },

      friendIcon: { color: 'inherit' },

      ...mapObject((role) => {
        return { color: role.color[theme.type] };
      })(roles),
    };
  }

  /**
   * Open a new tab with the profile of the user.
   */
  handleClick = () => {
    openWindowInNewTab(`/profile/${this.props.user.id}`);
  };

  render() {
    const level = computeLevel(this.props.user.roles);
    const roleInfo = pipe(
      Object.values,
      find(role => role.level === level),
    )(roles);
    const isDonator = this.props.user.roles.includes('donator');

    return (
      <span
        role="presentation"
        className={classnames(
          this.props.classes.item,
          this.props.classes[roleInfo.name],
          this.props.className,
        )}
        onClick={this.handleClick}
      >
        {isDonator && (
          <Icon
            icon="star"
            className={`${this.props.classes.icon} ${this.props.classes.donator}`}
          />
        )}

        {this.props.isFriend && (
          <Icon
            icon="account"
            className={`${this.props.classes.icon} ${this.props.classes.friendIcon}`}
          />
        )}

        {this.props.user.name}
      </span>
    );
  }
}
export default connect(
  (state, props) => {
    return {
      isFriend: pipe(
        pluck('user.friends', []),
        includes(props.user.id),
      )(state),
    };
  },
  null,
)(injectSheet(UserItem.styles)(UserItem));

