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

import app from '../../../app';
import { pipe } from '../../../../utils/functions';

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

  componentWillMount() {
    app
      .service('pickup')
      .on('redirect', this.handleRedirect);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleRedirect = (data) => {
    this.setState({ isRedirecting: true });

    this.timeout = setTimeout(() => {
      this.props.redirect(`/pickup/${data.id}`);

      this.setState({ isRedirecting: false });
    }, 15 * 1000);
  };

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
  injectSheet(PickupRedirect.styles),
  connect(null, (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  }),
)(PickupRedirect);
