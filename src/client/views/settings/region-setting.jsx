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
import regions from '@tf2-pickup/configs/regions';

import app from '../../app';

const radioButtons = Object
  .values(regions)
  .map(region => (
    <Label key={region.name}>
      <RadioButton name={region.name} />

      {region.fullName}
    </Label>
  ));

/**
 * The component for changing the region setting.
 *
 * @class
 */
class RegionSetting extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ headerPart: PropTypes.string.isRequired }).isRequired,
    region: PropTypes.string.isRequired,
  };

  static styles = {
    headerPart: {
      flexBasis: '40%',
      flexShrink: 0,
    },
  };

  state = {
    expanded: false,
    region: this.props.region,
  };

  /**
   * When the users region changes, update the currently selected region.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.region !== this.props.region) {
      this.setState({ region: nextProps.region });
    }
  }

  /**
   * When the expansion panel is toggled, reset the region state to the current user value.
   */
  handleChange = () => {
    this.setState((state) => {
      return {
        expanded: !state.expanded,
        region: this.props.region,
      };
    });
  };

  /**
   * Change the current region state when the user clicks a radio button.
   */
  handleRegionChange = (region) => {
    this.setState({ region });
  };

  /**
   * Emit the change-region event when the save button is clicked.
   */
  handleSave = () => {
    app.io.emit(
      'user.change-region',
      { region: this.state.region },
      () => this.handleChange(),
    );
  };

  render() {
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleChange}
      >
        <ExpansionPanel.Summary>
          <span className={this.props.classes.headerPart}>
            Region:
          </span>

          <span className={this.props.classes.headerPart}>
            {regions[this.props.region].fullName}
          </span>
        </ExpansionPanel.Summary>

        <ExpansionPanel.Details>
          <RadioButtonGroup
            selected={this.state.region}
            onChange={this.handleRegionChange}
          >
            {radioButtons}
          </RadioButtonGroup>
        </ExpansionPanel.Details>

        <Divider />

        <ExpansionPanel.Actions>
          <Button onPress={this.handleChange}>
            Cancel
          </Button>

          <Button
            disabled={this.state.region === this.props.region}
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
    return { region: state.user.settings.region };
  },
)(injectSheet(RegionSetting.styles)(RegionSetting));
