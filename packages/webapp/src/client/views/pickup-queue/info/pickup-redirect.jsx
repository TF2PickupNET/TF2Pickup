import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Collapse,
} from 'materialize-react';
import injectSheet from 'react-jss';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pipe } from '@tf2-pickup/utils';

import app from '../../../app';

/**
 * The redirect to the match page.
 *
 * @class
 */
class PickupRedirect extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
    redirect: PropTypes.func.isRequired,
  };

  static styles = {
    card: {
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  };

  state = { isRedirecting: false };

  /**
   * Listen for the redirect event.
   */
  componentWillMount() {
    app
      .service('pickup')
      .on('redirect', this.handleRedirect);
  }

  /**
   * Clear the timeout when the component unmounts.
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Change the state and create a timeout for redirecting after.
   */
  handleRedirect = (data) => {
    this.setState({ isRedirecting: true });

    this.timeout = setTimeout(() => {
      this.props.redirect(`/pickup/${data.id}`);
    }, 15 * 1000);
  };

  /**
   * When the user cancels the redirect, we want to clear the timeout
   * and remove the information about the redirect.
   */
  handleCancelPress = () => {
    clearTimeout(this.timeout);

    this.setState({ isRedirecting: false });
  };

  render() {
    return (
      <Collapse isOpen={this.state.isRedirecting}>
        <Card className={this.props.classes.card}>
          Your pickup is starting. You will be redirected shortly.

          <Button onPress={this.handleCancelPress}>
            Cancel
          </Button>
        </Card>
      </Collapse>
    );
  }
}

export default pipe(
  connect(null, (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  }),
  injectSheet(PickupRedirect.styles),
)(PickupRedirect);
