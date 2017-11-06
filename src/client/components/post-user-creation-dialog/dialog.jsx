import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import {
  Stepper,
  Button,
  Dialog,
} from 'materialize-react';
import { connect } from 'react-redux';

import RulesSection from './rules-section';
import RegionSection from './region-section';
import UsernameSection from './username-section';
import ThemeSection from './theme-section';

const HeaderButton = () => null;

/**
 * The actual dialog which will be rendered.
 *
 * @class
 */
class DialogContent extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      sectionContainer: PropTypes.string.isRequired,
      finishSection: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      hasAcceptedTheRules: PropTypes.bool,
      name: PropTypes.string,
      settings: PropTypes.shape({
        region: PropTypes.string,
        theme: PropTypes.string,
      }),
    }),
  };

  static defaultProps = { user: null };

  static styles = {
    title: { textAlign: 'center' },

    sectionContainer: {
      width: '100%',
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
    } else if (this.props.user.settings.theme === null) {
      return 3;
    }

    return 4;
  }

  /**
   * Get the title for the current section.
   *
   * @param {Number} section - The index of the section.
   * @returns {String} - Returns the title.
   */
  getTitle(section) {
    const titles = {
      0: 'Rules',
      1: 'Select a region',
      2: 'Select a username',
      3: 'Select a theme',
      4: 'You are ready to go',
    };

    return (
      <Dialog.Header className={this.props.classes.title}>
        {titles[section]}
      </Dialog.Header>
    );
  }

  handleClose = () => this.props.close();

  render() {
    const section = this.getCurrentSection();

    return (
      <Aux>
        {this.getTitle(section)}

        <Stepper
          headerAtBottom
          header={Stepper.Headers.Progress}
          headerProps={{
            backButton: <HeaderButton />,
            nextButton: <HeaderButton />,
          }}
          section={section}
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

          <Stepper.Section className={this.props.classes.sectionContainer}>
            <ThemeSection />
          </Stepper.Section>

          <Stepper.Section className={this.props.classes.finishSection}>
            <Button onRelease={this.handleClose}>
              Finish
            </Button>
          </Stepper.Section>
        </Stepper>
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(DialogContent.styles)(DialogContent));
