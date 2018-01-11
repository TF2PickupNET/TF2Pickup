import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Stepper,
  Button,
  Dialog,
  getNotDeclaredProps,
} from 'materialize-react';
import { connect } from 'react-redux';

import { closeDialog } from '../../../../redux/dialog/actions';

import RulesSection from './rules-section';
import RegionSection from './region-section';
import UsernameSection from './username-section';
import JoinDiscordSection from './join-discord-section';
import openWindowInNewTab from '../../../../utils/open-window-in-new-tab';
import { discordUrls } from '../../../../../config/client';

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
      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      '@media (max-height: 900px)': { height: '80vh' },

      '@media (min-height: 901px)': { height: '60vh' },

      '@media (max-width: 800px)': { width: '80vw' },

      '@media (min-width: 801px) and (max-width: 1200px)': { width: '60vw' },

      '@media (min-width: 1201px)': { width: '40vw' },
    },

    title: { textAlign: 'center' },

    sectionContainer: {
      composes: 'scrollbar',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      overflowY: 'scroll',
    },

    finishSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  state = { skipDiscord: false };

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
      case 3: return 'Join our discord server';
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
    } else if (!this.state.skipDiscord) {
      return 3;
    }

    return 4;
  }

  handleClose = () => this.props.close();

  /**
   * Set a timeout after which the dialog will be closed automatically.
   */
  handleFinishShow = () => {
    this.timeout = setTimeout(this.props.close, 3 * 1000);
  };

  onDiscordJoin = () => {
    openWindowInNewTab(discordUrls.invite);

    this.onDiscordSkip();
  };

  onDiscordSkip = () => {
    this.setState({ skipDiscord: true });
  };

  render() {
    const section = this.getCurrentSection();

    return (
      <Dialog
        className={this.props.classes.dialog}
        {...getNotDeclaredProps(this.props, PostUserCreationDialog)}
      >
        <Dialog.Header className={section === 3 ? this.props.classes.finishSection : ''}>
          {PostUserCreationDialog.getTitle(section)}
        </Dialog.Header>

        <Stepper
          headerAtBottom
          header={Stepper.Headers.Dot}
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
            <UsernameSection region={this.props.user.settings.region} />
          </Stepper.Section>


          <Stepper.Section className={this.props.classes.sectionContainer}>
            <JoinDiscordSection
              handleDiscordJoin={this.onDiscordJoin}
              handleSkipPress={this.onDiscordSkip}
            />
          </Stepper.Section>

          <Stepper.Section
            className={this.props.classes.finishSection}
            onShow={this.handleFinishShow}
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
