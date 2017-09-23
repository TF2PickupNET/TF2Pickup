import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import {
  Stepper,
  Button,
  Typography,
  breakpoints,
} from 'materialize-react';
import { connect } from 'react-redux';

import RulesSection from './rules-section';
import RegionSection from './region-section';
import UsernameSection from './username-section';

class Dialog extends PureComponent {
  static styles = {
    dialog: {
      height: '80vh',
      width: '85vw',
      paddingTop: 25,

      [breakpoints.up('tablet')]: {
        height: '60vh',
        width: '50vw',
      },

      [breakpoints.up('desktop')]: {
        height: '40vh',
        width: 400,
      },
    },

    sectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    },

    finishSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  disableBackButton = () => true;
  disableNextButton = (index, section) => {
    if (section.name === 'accept-rules') {
      return !this.props.user.hasAcceptedTheRules;
    } else if (section.name === 'username') {
      return !this.props.user.name;
    }

    return false;
  };

  handleClose = () => this.props.close();

  handleChange = (newSection) => {
    if (newSection === 1) {
      this.regionSection.setRegion();
    }
  };

  render() {
    return (
      <Stepper
        headerAtBottom
        className={this.props.classes.dialog}
        header={(
          <Stepper.Headers.Progress
            disableBackButton={this.disableBackButton}
            disableNextButton={this.disableNextButton}
          />
        )}
        onChange={this.handleChange}
      >
        <Stepper.Section name="region">
          <RegionSection
            className={this.props.classes.sectionContainer}
            ref={(element) => { this.regionSection = element; }}
          />
        </Stepper.Section>

        <Stepper.Section
          name="username"
          className={this.props.classes.sectionContainer}
        >
          <UsernameSection />
        </Stepper.Section>

        <Stepper.Section
          name="accept-rules"
          className={this.props.classes.sectionContainer}
        >
          <RulesSection />
        </Stepper.Section>

        <Stepper.Section
          name="finish"
          className={this.props.classes.finishSection}
        >
          <Button onRelease={this.handleClose}>
            Finish
          </Button>
        </Stepper.Section>
      </Stepper>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(Dialog.styles)(Dialog));
