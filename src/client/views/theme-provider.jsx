import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lockr from 'lockr';
import { connect } from 'react-redux';
import { Theme } from 'materialize-react';

import { pluck } from '../../utils/functions';

/**
 * Render a basic layout which will try login with the token from a cookie and make sure
 * the windows view is wide enough.
 *
 * @class
 */
class ThemeProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string.isRequired,
  };

  /**
   * Update the local storage when the user state changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      lockr.set('theme', nextProps.theme);
    }
  }

  render() {
    return (
      <Theme type={this.props.theme}>
        {this.props.children}
      </Theme>
    );
  }
}

export default connect((state) => {
  return { theme: pluck('settings.theme')(state.user) || lockr.get('theme', 'light') };
})(ThemeProvider);
