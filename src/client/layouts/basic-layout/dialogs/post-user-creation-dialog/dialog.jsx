import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Stepper,
  Button,
  Dialog,
  breakpoints,
  getNotDeclaredProps,
} from 'materialize-react';
import { connect } from 'react-redux';

import { closeDialog } from '../../../../redux/dialog/actions';

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
class PostUserCreationDialog extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      dialog: PropTypes.string.isRequired,
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
    dialog: {
      height: '80vh',
      width: '85vw',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      [breakpoints.up('tablet')]: {
        maxHeight: '80vh',
        minHeight: '60vh',
        width: '55vw',
      },

      [breakpoints.up('desktop')]: {
        maxHeight: '50vh',
        minHeight: '40vh',
        width: 550,
      },
    },

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
   * Get the title for the current section.
   *
   * @param {Number} section - The index of the section.
   * @returns {String} - Returns the title.
   */
  static getTitle(section) {
    switch (section) {
      case 0: return 'Rules';
      case 1: return 'Select a region';
      case 2: return 'Select a username';
      case 3: return 'Select a theme';
      case 4: return 'You are ready to go';
      default: return null;
    }
  }

  /**
   * Clear the timeout when the dialog unmounts (hides the page).
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeout = null;

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

  handleClose = () => this.props.close();

  /**
   * Set a timeout after which the dialog will be closed automatically.
   */
  handleShow = () => {
    this.timeout = setTimeout(this.props.close, 3 * 1000);
  };

  render() {
    const section = this.getCurrentSection();

    return (
      <Dialog
        className={this.props.classes.dialog}
        {...getNotDeclaredProps(this.props, PostUserCreationDialog)}
      >
        <Dialog.Header>
          {PostUserCreationDialog.getTitle(section)}
        </Dialog.Header>

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

          <Stepper.Section
            className={this.props.classes.finishSection}
            onShow={this.handleShow}
          >
            <Button onPress={this.handleClose}>
              Finish
            </Button>
          </Stepper.Section>
        </Stepper>
      </Dialog>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
  (dispatch) => {
    return { close: () => dispatch(closeDialog()) };
  },
)(injectSheet(PostUserCreationDialog.styles)(PostUserCreationDialog));
