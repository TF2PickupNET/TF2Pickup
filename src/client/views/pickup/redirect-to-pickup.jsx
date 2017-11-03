import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import gamemodes from '@tf2-pickup/configs/gamemodes';

/**
 * Redirect the user to the correct url.
 *
 * @class
 */
class RedirectToPickup extends PureComponent {
  static propTypes = {
    redirect: PropTypes.func.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  /**
   * Redirect the user when the component has mounted.
   */
  componentDidMount() {
    const url = this.props.location.pathname;
    const aliasName = url.slice(1);

    const aliases = Object
      .values(gamemodes)
      .reduce(
        (current, gamemode) => []
          .concat(current)
          .concat(gamemode.aliases.map((alias) => {
            return {
              gamemode: gamemode.name,
              alias,
            };
          })),
        [],
      );

    const redirectToGamemode = aliases.find(alias => alias.alias === aliasName);

    this.props.redirect(`/${redirectToGamemode.gamemode}`);
  }

  render() {
    return null;
  }
}

/**
 * Connect the Redirect with redux.
 *
 * @param {Function} dispatch - The dispatch function from redux.
 * @returns {Object} - Returns the props for the BasicLayout component.
 */
function mapDispatchToProps(dispatch) {
  return {
    redirect(url) {
      return dispatch(push(url));
    },
  };
}

export default connect(null, mapDispatchToProps)(RedirectToPickup);
