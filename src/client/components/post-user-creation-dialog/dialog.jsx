import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Stepper,
  Button,
  breakpoints,
} from 'materialize-react';
import { connect } from 'react-redux';

import RulesSection from './rules-section';
import RegionSection from './region-section';
import UsernameSection from './username-section';

const HeaderButton = () => null;

/**
 * The actual dialog which will be rendered.
 *
 * @class
 */
class Dialog extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      dialog: PropTypes.string.isRequired,
      sectionContainer: PropTypes.string.isRequired,
      finishSection: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      hasAcceptedTheRules: PropTypes.bool,
      name: PropTypes.string,
      settings: PropTypes.shape({ region: PropTypes.string }),
    }),
  };

  static defaultProps = { user: null };

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

  /**
   * Get the current section.
   *
   * @returns {Number} - The index of the current section.
   */
  getCurrentSection() {
    if (!this.props.user.hasAcceptedTheRules) {
      return 0;
    } else if (this.props.user.settings.region === null) {
      return 1;
    } else if (this.props.user.name === null) {
      return 2;
    }

    return 3;
  }

  handleClose = () => this.props.close();

  render() {
    return (
      <Stepper
        headerAtBottom
        className={this.props.classes.dialog}
        header={Stepper.Headers.Progress}
        headerProps={{
          backButton: <HeaderButton />,
          nextButton: <HeaderButton />,
        }}
        section={this.getCurrentSection()}
      >
        <Stepper.Section className={this.props.classes.sectionContainer}>
          <RulesSection />
        </Stepper.Section>

        <Stepper.Section className={this.props.classes.sectionContainer}>
          <RegionSection />
        </Stepper.Section>

        <Stepper.Section className={this.props.classes.sectionContainer}>
          <UsernameSection />
        </Stepper.Section>

        <Stepper.Section className={this.props.classes.finishSection}>
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
