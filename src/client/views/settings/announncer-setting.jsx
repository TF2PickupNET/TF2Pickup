import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  RadioButtonGroup,
  RadioButton,
  Button,
  Divider,
  Label,
} from 'materialize-react';

import app from '../../app';
import announcers from '../../announcers';
import { filter } from '../../../utils/functions';
import hasPermission from '../../../utils/has-permission';

const announcersAsArray = Object.values(announcers);

/**
 * The component for changing the region setting.
 *
 * @class
 */
class AnnounncerSetting extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ headerPart: PropTypes.string.isRequired }).isRequired,
    announcer: PropTypes.string.isRequired,
    announcers: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static styles = {
    headerPart: {
      flexBasis: '40%',
      flexShrink: 0,
    },
  };

  state = {
    expanded: false,
    announcer: this.props.announcer,
  };

  /**
   * When the users region changes, update the currently selected region.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.announcer !== this.props.announcer) {
      this.setState({ announcer: nextProps.announcer });
    }
  }

  /**
   * When the expansion panel is toggled, reset the region state to the current user value.
   */
  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        announcer: this.props.announcer,
      };
    });
  };

  /**
   * Change the current region state when the user clicks a radio button.
   */
  handleAnnouncerChange = (announcer) => {
    this.setState({ announcer });
  };

  /**
   * Emit the change-region event when the save button is clicked.
   */
  handleSave = () => {
    app.io.emit(
      'user.change-announcer',
      { announcer: this.state.announcer },
      () => this.handleChange(),
    );
  };

  renderAnnouncers() {
    return this.props.announcers.map(announcer => (
      <Label key={announcer.name}>
        <RadioButton name={announcer.name} />

        {announcer.display}
      </Label>
    ));
  }

  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleChange}
      >
        <ExpansionPanel.Summary>
          <span className={this.props.classes.headerPart}>
            Announcer:
          </span>

          <span className={this.props.classes.headerPart}>
            {announcers[this.props.announcer].display}
          </span>
        </ExpansionPanel.Summary>

        <ExpansionPanel.Details>
          <RadioButtonGroup
            selected={this.state.announcer}
            onChange={this.handleAnnouncerChange}
          >
            {this.renderAnnouncers()}
          </RadioButtonGroup>
        </ExpansionPanel.Details>

        <Divider />

        <ExpansionPanel.Actions>
          <Button onPress={this.handleChange}>
            Cancel
          </Button>

          <Button
            disabled={this.state.announcer === this.props.announcer}
            onPress={this.handleSave}
          >
            Save
          </Button>
        </ExpansionPanel.Actions>
      </ExpansionPanel>
    );
  }
}

export default connect(
  (state) => {
    const { boughtAnnouncers } = state.user;

    return {
      announcer: state.user.settings.announcer,
      announcers: hasPermission('announcers.use-without-buying', state.user)
        ? announcersAsArray
        : filter(
          announcer => !announcer.needsPurchase || boughtAnnouncers.includes(announcer.name),
        )(announcersAsArray),
    };
  },
)(injectSheet(AnnounncerSetting.styles)(AnnounncerSetting));
