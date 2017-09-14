import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  Dialog,
  Stepper,
  Button,
  RadioButton,
  RadioButtonGroup,
  Typography,
  breakpoints,
} from 'materialize-react';

import regions from '@tf2-pickup/configs/regions';

class PostLoginDialog extends PureComponent {
  static Dialog = (props) => ({ close }) => (
    <Stepper
      headerAtBottom
      className={props.classes.dialog}
      header={<Stepper.Headers.Progress />}
    >
      <Stepper.Section name="region">
        <Typography typography="title">
          Select a region
        </Typography>

        <RadioButtonGroup name="region">
          {Object
            .values(regions)
            .map(region => (
              <RadioButton
                key={region.name}
                name={region.name}
              >
                {region.fullName}
              </RadioButton>
            ))
          }
        </RadioButtonGroup>
      </Stepper.Section>

      <Stepper.Section name="username">
        <Typography typography="title">
          Select a username
        </Typography>
      </Stepper.Section>

      <Stepper.Section name="accept-rules">
        <Typography typography="title">
          Accept the rules
        </Typography>

        <div>
          some rules here
        </div>

        <div>
          <Button>
            Accept
          </Button>
        </div>
      </Stepper.Section>

      <Stepper.Section name="finish">
        <Button onRelease={close}>
          Finish
        </Button>
      </Stepper.Section>
    </Stepper>
  );

  static styles = {
    dialog: {
      height: '80vh',
      width: '85vh',
      paddingTop: 25,

      [breakpoints.up('tablet')]: {
        height: '60vh',
        width: '50vh',
      },

      [breakpoints.up('desktop')]: {
        height: '40vh',
        width: 400,
      },
    },
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
      if (nextProps.user.name === null) {
        this.dialog.open();
      }
    }
  }

  render() {
    return (
      <Dialog
        ref={(element) => { this.dialog = element; }}
        closeOnOutsideClick={false}
        className={this.props.classes.dialog}
        component={PostLoginDialog.Dialog(this.props)}
      />
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(PostLoginDialog.styles)(PostLoginDialog));
