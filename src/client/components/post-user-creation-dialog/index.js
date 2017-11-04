import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from 'materialize-react';

import DialogComponent from './dialog';

/**
 * The component which opens the post user creation dialog when needed.
 *
 * @class
 */
class PostUserCreationDialog extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      hasAcceptedTheRules: PropTypes.bool,
      settings: PropTypes.shape({ region: PropTypes.string }),
    }),
  };

  static defaultProps = { user: null };

  /**
   * Open the dialog when the user logged in and has no name set yet.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
      this.dialog.open();

      const region = nextProps.user.settings.region;
      const name = nextProps.user.name;
      const hasAcceptedTheRules = nextProps.user.hasAcceptedTheRules;

      if (name === null || region === null || !hasAcceptedTheRules) {
        this.dialog.open();
      }
    }
  }

  render() {
    return (
      <Dialog
        ref={(element) => { this.dialog = element; }}
        closeOnOutsideClick={false}
        component={DialogComponent}
      />
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(PostUserCreationDialog);
