import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Dialog,
  breakpoints,
} from 'materialize-react';

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

  static styles = {
    dialog: {
      height: '80vh',
      width: '85vw',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      [breakpoints.up('tablet')]: {
        maxHeight: '80vh',
        minHeight: '60vh',
        width: '50vw',
      },

      [breakpoints.up('desktop')]: {
        maxHeight: '50vh',
        minHeight: '40vh',
        width: 400,
      },
    },
  };

  /**
   * Open the dialog when the user logged in and has no name set yet.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
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
        className={this.props.classes.dialog}
      />
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(PostUserCreationDialog.styles)(PostUserCreationDialog));
