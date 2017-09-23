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

  disableBackButton = () => true;

  /**
   * Whether or not to disable the next button in the stepper header.
   *
   * @param {Number} index - The current section index.
   * @param {Object} section - The props of the current section.
   * @returns {Boolean} - Returns the disabled prop for the next button.
   */
  disableNextButton = (index, section) => {
    if (section.name === 'accept-rules') {
      return !this.props.user.hasAcceptedTheRules;
    } else if (section.name === 'username') {
      return !this.props.user.name;
    }

    return false;
  };

  handleClose = () => this.props.close();

  /**
   * Set the region when the section changes.
   *
   * @param {Number} newSection - The index of the new index.
   */
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
